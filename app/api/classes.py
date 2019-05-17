from flask import jsonify, request, abort
from .. import db

from ..models import Class, Permission, ClassSchema
from .decorators import permission_required
from .errors import forbidden
from flask_restful import Resource

classes_schema = ClassSchema(many=True)
class_schema = ClassSchema()


class ClassesResource(Resource):
    def get(self):
        classes = Class.query.all()
        return classes_schema.jsonify(classes)


class ClassResource(Resource):
    def get(self, id):
        _class = Class.query.get_or_404(id)
        return class_schema.jsonify(_class)

    # returns 1 if deleted, returns 0 if failed (did ID exist?)
    def delete(self, id):
        _class = Class.query.filter_by(id=id).delete()
        db.session.commit()
        return jsonify(_class)

    # create an class TODO: figure out how not to use id to create an class
    def post(self, id):
        json_data = request.get_json()
        if not json_data:
            abort("404")
        try:
            data, errors = class_schema.load(json_data)
            if errors:
                return jsonify(errors)
            db.session.add(data)
            db.session.commit()
            return class_schema.jsonify(data)
        except Exception as e:
            return {"message": e._message(), "status": 400}, 400

    # update class
    def put(self, id):
        _class = Class.query.get_or_404(id)
        json_data = request.get_json()
        if not json_data:
            abort("404")
        try:
            data, errors = class_schema.load(json_data)
            if errors:
                return jsonify(errors)
            # TODO: this will need some work...
            _class = data
            _class.id = id
            db.session.add(_class)
            db.session.commit()
            return class_schema.jsonify(data)
        except Exception as e:
            return {"message": e._message(), "status": 400}, 400
