from flask import render_template, redirect, url_for, abort, flash, request,\
    current_app, make_response, send_file
from flask_login import login_required, current_user
from flask_sqlalchemy import get_debug_queries
from . import main
from .forms import EditProfileForm, EditProfileAdminForm, AssignmentForm,\
    QuestionForm
from .. import db
from ..models import School, Permission, Role, User, Assignment, StudentAssignment, SchoolUser, Class
from ..decorators import admin_required, permission_required


@main.after_app_request
def after_request(response):
    for query in get_debug_queries():
        if query.duration >= current_app.config['RWC_SLOW_DB_QUERY_TIME']:
            current_app.logger.warning(
                'Slow query: %s\nParameters: %s\nDuration: %fs\nContext: %s\n'
                % (query.statement, query.parameters, query.duration,
                   query.context))
    return response


@main.route('/shutdown')
def server_shutdown():
    if not current_app.testing:
        abort(404)
    shutdown = request.environ.get('werkzeug.server.shutdown')
    if not shutdown:
        abort(500)
    shutdown()
    return 'Shutting down...'


@main.route('/', methods=['GET', 'POST'])
def index():
    return send_file('public/index.html')


@main.route('/user/<username>')
def user(username):
    user = User.query.filter_by(username=username).first_or_404()
    page = request.args.get('page', 1, type=int)
    pagination = user.schools.paginate(
        page, per_page=current_app.config['RWC_ASSIGNMENTS_PER_PAGE'],
        error_out=False)
    schools = pagination.items
    return render_template('user.html', user=user, schools=schools,
                           pagination=pagination)


# TODO: not unique
@main.route('/class/<name>')
def _class(name):
    _class = Class.query.filter_by(name=name).first_or_404
    page = request.args.get('page', 1, type=int)
    pagination = _class.students.paginate(
        page, per_page=current_app.config['RWC_ASSIGNMENTS_PER_PAGE'],
        error_out=False)
    students = pagination.items
    teacher = _class.teacher
    assign = _class.assignments
    return render_template('class.html', name=name, students=students, teacher=teacher, assignment=assign,
                           pagination=pagination)


@main.route('/edit-profile', methods=['GET', 'POST'])
@login_required
def edit_profile():
    form = EditProfileForm()
    if form.validate_on_submit():
        current_user.name = form.name.data
        current_user.location = form.location.data
        current_user.about_me = form.about_me.data
        db.session.add(current_user._get_current_object())
        db.session.commit()
        flash('Your profile has been updated.')
        return redirect(url_for('.user', username=current_user.username))
    form.name.data = current_user.name
    form.location.data = current_user.location
    form.about_me.data = current_user.about_me
    return render_template('edit_profile.html', form=form)


@main.route('/edit-profile/<int:id>', methods=['GET', 'POST'])
@login_required
@admin_required
def edit_profile_admin(id):
    user = User.query.get_or_404(id)
    form = EditProfileAdminForm(user=user)
    if form.validate_on_submit():
        user.email = form.email.data
        user.username = form.username.data
        user.confirmed = form.confirmed.data
        user.role = Role.query.get(form.role.data)
        user.name = form.name.data
        user.location = form.location.data
        user.about_me = form.about_me.data
        db.session.add(user)
        db.session.commit()
        flash('The profile has been updated.')
        return redirect(url_for('.user', username=user.username))
    form.email.data = user.email
    form.username.data = user.username
    form.confirmed.data = user.confirmed
    form.role.data = user.role_id
    form.name.data = user.name
    form.location.data = user.location
    form.about_me.data = user.about_me
    return render_template('edit_profile.html', form=form, user=user)

# TODO: Update this


@main.route('/assignment/<int:id>', methods=['GET', 'POST'])
def assignment(id):
    _assignment = Assignment.query.get_or_404(id)

    form = AssignmentForm()
    """
    if form.validate_on_submit():
        question = question(body=form.body.data,
                          assignment=assignment,
                          author=current_user._get_current_object())
        db.session.add(question)
        db.session.commit()
        flash('Your question has been published.')
        return redirect(url_for('.assignment', id=assignment.id, page=-1))
    """
    page = request.args.get('page', 1, type=int)
    if page == -1:
        page = (_assignment.question.count() - 1) // \
            current_app.config['RWC_QUESTIONS_PER_PAGE'] + 1
    pagination = _assignment.questions.order_by(assignment.timestamp.asc()).paginate(
        page, per_page=current_app.config['RWC_QUESTIONS_PER_PAGE'],
        error_out=False)
    q = pagination.items
    return render_template('assignment.html', assignment=[_assignment], form=form,
                           questions=q, pagination=pagination)


@main.route('/edit/<int:id>', methods=['GET', 'POST'])
@login_required
def edit(id):
    assignment = Assignment.query.get_or_404(id)
    if current_user != assignment.author and \
            not current_user.can(Permission.ADMIN):
        abort(403)
    form = AssignmentForm()
    if form.validate_on_submit():
        assignment.body = form.body.data
        db.session.add(assignment)
        db.session.commit()
        flash('The assignment has been updated.')
        return redirect(url_for('.assignment', id=assignment.id))
    form.body.data = assignment.body
    return render_template('edit_assignment.html', form=form)


@main.route('/all')
@login_required
def show_all():
    resp = make_response(redirect(url_for('.index')))
    resp.set_cookie('show_all', '', max_age=30*24*60*60)
    return resp


@main.route('/assignments')
@login_required
def show_assignments():
    resp = make_response(redirect(url_for('.index')))
    resp.set_cookie('show_assignments', '1', max_age=30*24*60*60)
    return resp
