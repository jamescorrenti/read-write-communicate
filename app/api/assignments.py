from flask import jsonify, request, g, url_for, current_app, abort, Response
from flask_restful import Resource
from .. import db
from ..models import Assignment, Permission, AssignmentSchema
from .decorators import permission_required
from .errors import forbidden

assignments_schema = AssignmentSchema(many=True)
assignment_schema = AssignmentSchema()


class AssignmentsResource(Resource):
    def get(self):
        assignments = Assignment.query.all()
        return assignments_schema.jsonify(assignments)


class AssignmentResource(Resource):
    def get(self, id):
        assignment = Assignment.query.get_or_404(id)
        return assignment_schema.jsonify(assignment)

    # returns 1 if deleted, returns 0 if failed (did ID exist?)
    def delete(self, id):
        assignment = Assignment.query.filter_by(id=id).delete()
        db.session.commit()
        return jsonify(assignment)

    # create an assignment TODO: figure out how not to use id to create an assignment
    def post(self, id):
        json_data = request.get_json()
        if not json_data:
            abort("404")
        try:
            data, errors = assignment_schema.load(json_data)
            if errors:
                return jsonify(errors)
            db.session.add(data)
            db.session.commit()
            return assignment_schema.jsonify(data)
        except Exception as e:
            return {"message": e._message(), "status": 400}, 400

    # update assignment
    def put(self, id):
        assignment = Assignment.query.get_or_404(id)
        json_data = request.get_json()
        if not json_data:
            abort("404")
        try:
            data, errors = assignment_schema.load(json_data)
            if errors:
                return jsonify(errors)
            # TODO: this will need some work...
            assignment = data
            assignment.id = id
            db.session.add(assignment)
            db.session.commit()
            return assignment_schema.jsonify(data)
        except Exception as e:
            return {"message": e._message(), "status": 400}, 400
