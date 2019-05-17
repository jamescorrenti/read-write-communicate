from flask import jsonify, request, abort
from .. import db

from ..models import School, Permission, SchoolSchema
from .decorators import permission_required
from .errors import forbidden
from flask_restful import Resource

schools_schema = SchoolSchema(many=True)
school_schema = SchoolSchema()


class SchoolsResource(Resource):
    def get(self):
        schools = School.query.all()
        return schools_schema.jsonify(schools)


class SchoolResource(Resource):
    def get(self, id):
        school = School.query.get_or_404(id)
        return school_schema.jsonify(school)

    # returns 1 if deleted, returns 0 if failed (did ID exist?)
    def delete(self, id):
        school = School.query.filter_by(id=id).delete()
        db.session.commit()
        return jsonify(school)

    # create an school TODO: figure out how not to use id to create an school
    def post(self, id):
        json_data = request.get_json()
        if not json_data:
            abort("404")
        try:
            data, errors = school_schema.load(json_data)
            if errors:
                return jsonify(errors)
            db.session.add(data)
            db.session.commit()
            return school_schema.jsonify(data)
        except Exception as e:
            return {"message": e._message(), "status": 400}, 400

    # update school
    def put(self, id):
        school = School.query.get_or_404(id)
        json_data = request.get_json()
        if not json_data:
            abort("404")
        try:
            data, errors = school_schema.load(json_data)
            if errors:
                return jsonify(errors)
            # TODO: this will need some work...
            school = data
            school.id = id
            db.session.add(school)
            db.session.commit()
            return school_schema.jsonify(data)
        except Exception as e:
            return {"message": e._message(), "status": 400}, 400
