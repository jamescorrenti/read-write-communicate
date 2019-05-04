from flask import jsonify, request, g, url_for, current_app
from .. import db
from ..models import Assignment, Permission
from . import api
from .decorators import permission_required
from .errors import forbidden


@api.route('/assignment/')
def get_assignments():
    page = request.args.get('page', 1, type=int)
    pagination = Assignment.query.paginate(
        page, per_page=current_app.config['RWC_POSTS_PER_PAGE'],
        error_out=False)
    assingnments = pagination.items
    prev = None
    if pagination.has_prev:
        prev = url_for('api.get_assignments', page=page-1)
    next = None
    if pagination.has_next:
        next = url_for('api.get_assignments', page=page+1)
    return jsonify({
        'assignments': [assignments.to_json() for assignment in assignmentss],
        'prev': prev,
        'next': next,
        'count': pagination.total
    })


@api.route('/assignment/<int:id>')
def get_assignment(id):
    post = Assignment.query.get_or_404(id)
    return jsonify(post.to_json())


@api.route('/assignment/', methods=['POST'])
@permission_required(Permission.CREATE_ASSIGNMENT)
def new_assignment():
    assignment = Assignment.from_json(request.json)
    # TODO: add assignment to class
    # assignement.author = g.current_user
    db.session.add(assignment)
    db.session.commit()
    return jsonify(assignment.to_json()), 201, \
        {'Location': url_for('api.get_assignment', id=assignment.id)}


@api.route('/assignment/<int:id>', methods=['PUT'])
@permission_required(Permission.WRITE)
def edit_assignment(id):
    assignment = Assignment.query.get_or_404(id)
    if g.current_user != post.author and \
            not g.current_user.can(Permission.ADMIN):
        return forbidden('Insufficient permissions')
    assignment.body = request.json.get('body', assignment.body)
    db.session.add(assignment)
    db.session.commit()
    return jsonify(assignment.to_json())
