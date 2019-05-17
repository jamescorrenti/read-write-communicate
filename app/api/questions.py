from flask import jsonify, request, g, url_for, current_app, abort
from .. import db
from flask_restful import Resource
from ..models import Permission, Assignment, Question, QuestionSchema
from .decorators import permission_required

question_schema = QuestionSchema()


class QuestionResource(Resource):
    def get(self, id):
        question = Question.query.get_or_404(id)
        return question_schema.jsonify(question)

    # returns 1 if deleted, returns 0 if failed (did ID exist?)
    def delete(self, id):
        question = Question.query.filter_by(id=id).delete()
        db.session.commit()
        return jsonify(question)

    # create an question TODO: figure out how not to use id to create an assignment
    def post(self, id):
        json_data = request.get_json()
        if not json_data:
            abort("404")
        try:
            data, errors = question_schema.load(json_data)
            if errors:
                return jsonify(errors)
            db.session.add(data)
            db.session.commit()
            return question_schema.jsonify(data)
        except Exception as e:
            return {"message": e._message(), "status": 400}, 400

    # update question
    # TODO: this will need some work...
    def put(self, id):
        question = Question.query.get_or_404(id)
        json_data = request.get_json()
        if not json_data:
            abort("404")
        try:
            data, errors = question_schema.load(json_data)
            if errors:
                return jsonify(errors)
            question = data
            question.id = id
            db.session.add(question)
            db.session.commit()
            return question_schema.jsonify(data)
        except Exception as e:
            return {"message": e._message(), "status": 400}, 400
