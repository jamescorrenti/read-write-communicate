from flask import jsonify, request, g, url_for, current_app, abort, Response
from flask_restful import Resource
from .. import db
from ..models import StudentAssignment, Student, Permission, StudentAssignmentSchema, Assignment, AssignmentSchema
from .decorators import permission_required
from .errors import forbidden
from flask_jwt_extended import jwt_required, get_jwt_identity

student_assignments_schema = StudentAssignmentSchema(many=True)
student_assignment_schema = StudentAssignmentSchema()
assignment_schema = AssignmentSchema()


class StudentSubmittedAssignmentsResource(Resource):
    @jwt_required
    def get(self, id):
        student = Student.query.filter_by(id=id).first()
        sub_assignments = StudentAssignment.query.filter_by(student_id=student.id, submitted=True) \
            .order_by(StudentAssignment.submit_date.desc())
        return student_assignments_schema.jsonify(sub_assignments)
        # student = Student.query.filter_by(username=get_jwt_identity()).first()


class StudentTodoAssignmentsResource(Resource):
    @jwt_required
    def get(self, id):
        student = Student.query.filter_by(id=id).first()
        todo_assignments = StudentAssignment.query.filter_by(student_id=student.id, submitted=False) \
            .order_by(StudentAssignment.submit_date.asc())
        return student_assignments_schema.jsonify(todo_assignments)


class StudentAssignmentResource(Resource):
    #@jwt_required
    def get(self, id, assignment_id):
        assignment = Assignment.query.get_or_404(assignment_id)
        for s_a in assignment.students:
            if s_a.student_id == id:
                return student_assignment_schema.jsonify(s_a)
        return {"message": "Not assigned"}, 400

    # returns 1 if deleted, returns 0 if failed (did ID exist?)
    @jwt_required
    def delete(self, id, assignment_id):
        assignment = Assignment.query.filter_by(id=assignment_id).delete()
        db.session.commit()
        return jsonify(assignment)

    # submit an assignment TODO: figure out how not to use id to create an assignment
    @jwt_required
    def post(self, id, assignment_id):
        json_data = request.get_json()
        if not json_data:
            abort("404")
        try:
            data, errors = student_assignment_schema.load(json_data)
            if errors:
                return jsonify(errors)
            db.session.add(data)
            db.session.commit()
            return student_assignment_schema.jsonify(data)
        except Exception as e:
            return {"message": e._message(), "status": 400}, 400

    # update assignment
    #@jwt_required
    """
    def put(self, id, assignment_id):
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
    """