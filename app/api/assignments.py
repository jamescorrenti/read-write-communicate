from flask import jsonify, request, g, url_for, current_app, abort
from flask_restful import Resource
from marshmallow import ValidationError
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
            return jsonify("404")
        try:
            data, errors = assignment_schema.load(json_data)
            if errors:
                return jsonify(errors)
            db.session.add(data)
            db.session.commit()
            return assignment_schema.jsonify(data)
        except:
            abort(500)


    #update assignment
    def put(self, id):
        assignment = Assignment.query.get_or_404(id)

        return jsonify("buhbye")

#@api.route('/assignment/', methods=['POST'])
# @permission_required(Permission.CREATE_ASSIGNMENT)
def new_assignment():
    assignment = Assignment.from_json(request.json)
    # TODO: add assignment to class
    # assignement.author = g.current_user
    db.session.add(assignment)
    db.session.commit()
    return jsonify(assignment.to_json()), 201, \
        {'Location': url_for('api.get_assignment', id=assignment.id)}


#@api.route('/assignment/<int:id>', methods=['PUT'])
#@permission_required(Permission.WRITE)
def edit_assignment(id):
    assignment = Assignment.query.get_or_404(id)
    if g.current_user != assignment.author and \
            not g.current_user.can(Permission.ADMIN):
        return forbidden('Insufficient permissions')
    assignment.body = request.json.get('body', assignment.body)
    db.session.add(assignment)
    db.session.commit()
    return jsonify(assignment.to_json())
