from flask import jsonify, request, current_app, url_for
from . import api
from ..models import User, Assignment, Student, Faculty


#@api.route('/users/<int:id>')
def get_user(id):
    user = User.query.get_or_404(id)
    return jsonify(user.to_json())


#@api.route('/student/<int:id>/assignments/')
def get_student_assignments(id):
    student = Student.query.get_or_404(id)
    page = request.args.get('page', 1, type=int)
    pagination = student.assignments.order_by(Assignment.timestamp.desc()).paginate(
        page, per_page=current_app.config['RWC_ASSIGNMENTS_PER_PAGE'],
        error_out=False)
    assignments = pagination.items
    prev = None
    if pagination.has_prev:
        prev = url_for('api.get_student_assignments', id=id, page=page-1)
    next = None
    if pagination.has_next:
        next = url_for('api.get_student_assignments', id=id, page=page+1)
    return jsonify({
        'assignements': [assign.to_json() for assign in assignments],
        'prev': prev,
        'next': next,
        'count': pagination.total
    })


"""
@api.route('/faculty/<int:id>/assignments/')
"""
