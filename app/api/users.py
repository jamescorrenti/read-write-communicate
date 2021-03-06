from flask import jsonify, request, abort
from .. import db

from ..models import User, Permission, UserSchema
from .decorators import permission_required
from .errors import forbidden
from flask_restful import Resource

users_schema = UserSchema(many=True)
user_schema = UserSchema()


class UsersResource(Resource):
    def get(self):
        users = User.query.all()
        return users_schema.jsonify(users)


class UserResource(Resource):
    def get(self, id):
        user = User.query.get_or_404(id)
        return user_schema.jsonify(user)

    # returns 1 if deleted, returns 0 if failed (did ID exist?)
    def delete(self, id):
        user = User.query.filter_by(id=id).delete()
        db.session.commit()
        return jsonify(user)

    # create an user TODO: figure out how not to use id to create an user
    def post(self, id):
        json_data = request.get_json()
        if not json_data:
            abort("404")
        try:
            data, errors = user_schema.load(json_data)
            if errors:
                return jsonify(errors)
            db.session.add(data)
            db.session.commit()
            return user_schema.jsonify(data)
        except Exception as e:
            return {"message": e._message(), "status": 400}, 400

    # update user
    def put(self, id):
        user = User.query.get_or_404(id)
        json_data = request.get_json()
        if not json_data:
            abort("404")
        try:
            data, errors = user_schema.load(json_data)
            if errors:
                return jsonify(errors)
            # TODO: this will need some work...
            user = data
            user.id = id
            db.session.add(user)
            db.session.commit()
            return user_schema.jsonify(data)
        except Exception as e:
            return {"message": e._message(), "status": 400}, 400
