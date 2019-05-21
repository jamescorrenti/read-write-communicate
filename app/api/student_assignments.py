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
    # @jwt_required
    def get(self, id):
        student = Student.query.filter_by(id=id).first()
        sub_assignments = StudentAssignment.query.filter_by(student_id=student.id, submitted=True) \
            .order_by(StudentAssignment.submit_date.desc())
        return student_assignments_schema.jsonify(sub_assignments)
        # student = Student.query.filter_by(username=get_jwt_identity()).first()


class StudentTodoAssignmentsResource(Resource):
    # @jwt_required
    def get(self, id):
        student = Student.query.filter_by(id=id).first()
        todo_assignments = StudentAssignment.query.filter_by(student_id=student.id, submitted=False) \
            .order_by(StudentAssignment.submit_date.asc())
        assignments = {}
        i = 0
        for todo_assign in todo_assignments:
            print(todo_assign.submit_date)
            assign = Assignment.query.filter_by(id=todo_assign.assignment_id).first()
            assignments[str(i)] = {"class": assign._class.name,
                                   "due_date": assign.due_date.strftime("%m-%d-%YT%H:%M:%S+%M:%S"),
                                   "name": assign.name, "assignment_id": assign.id}
            i += 1
        return jsonify(assignments)
        # return student_assignments_schema.jsonify(todo_assignments)
        # student = get_jwt_identity()


class StudentAssignmentResource(Resource):
    #@jwt_required
    def get(self, id, assignment_id):
        assignment = Assignment.query.get_or_404(assignment_id)
        student_info = None
        for s_a in assignment.students:
            if s_a.student_id == id:
                student_info = s_a
        if student_info:
            return {"class": assignment._class.name,
                    "teacher": assignment._class.teacher.name,
                    "due_date": assignment.due_date.strftime("%m-%d-%YT%H:%M:%S+%M:%S"),
                    "id": assignment_id,
                    "instructions": assignment.instructions,
                    "question": assignment.questions[0].q,
                    "answer": assignment.questions[0].answer,
                    "submitted": student_info.submitted,
                    "fk_ease": student_info.fk_ease,
                    "fk_grade": student_info.fk_grade
            }
        else:
            return {"message": "Not assigned"}, 400
        # return student_assignment_schema.jsonify(assignment)

    # returns 1 if deleted, returns 0 if failed (did ID exist?)
    #@jwt_required
    def delete(self, id, assignment_id):
        assignment = Assignment.query.filter_by(id=assignment_id).delete()
        db.session.commit()
        return jsonify(assignment)

    # submit an assignment TODO: figure out how not to use id to create an assignment
    #@jwt_required
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