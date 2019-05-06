from flask import jsonify, request, g, url_for, current_app
from .. import db
from ..models import Permission, Assignment, Question
from . import api
from .decorators import permission_required


#@api.route('/question/')
def get_questions():
    page = request.args.get('page', 1, type=int)
    pagination = Question.query.order_by(Question.timestamp.desc()).paginate(
        page, per_page=current_app.config['RWC_QUESTION_PER_PAGE'],
        error_out=False)
    questions = pagination.items
    prev = None
    if pagination.has_prev:
        prev = url_for('api.get_question', page=page-1)
    next = None
    if pagination.has_next:
        next = url_for('api.get_question', page=page+1)
    return jsonify({
        'questions': [question.to_json() for question in questions],
        'prev': prev,
        'next': next,
        'count': pagination.total
    })


#@api.route('/question/<int:id>')
def get_question(id):
    question = Question.query.get_or_404(id)
    return jsonify(question.to_json())


#@api.route('/assignment/<int:id>/questions/')
def get_assignment_questions(id):
    assignment = Assignment.query.get_or_404(id)
    page = request.args.get('page', 1, type=int)
    pagination = Assignment.questions.order_by(assignment.timestamp.asc()).paginate(
        page, per_page=current_app.config['RWC_QUESTION_PER_PAGE'],
        error_out=False)
    questions = pagination.items
    prev = None
    if pagination.has_prev:
        prev = url_for('api.get_assignment_questions', id=id, page=page-1)
    next = None
    if pagination.has_next:
        next = url_for('api.get_assignment_questions', id=id, page=page+1)
    return jsonify({
        'questions': [question.to_json() for question in questions],
        'prev': prev,
        'next': next,
        'count': pagination.total
    })

"""
# TODO: this  needs a look
@api.route('/assignment/<int:id>/questions/', methods=['POST'])
@permission_required(Permission.WRITE)
def new_assignment_answer(id):
    assignment = Assignment.query.get_or_404(id)
    question = Questions.from_json(request.json)
    student = g.current_user
    question.assignment = assignment
    answer.
    db.session.add(answer)
    db.session.commit()
    return jsonify(question.to_json()), 201, 
"""
