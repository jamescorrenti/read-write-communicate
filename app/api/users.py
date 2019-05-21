from flask import jsonify, request, abort
from .. import db

from ..models import User, Permission, UserSchema, RevokedTokenModel, Student, Faculty
from .decorators import permission_required
from .errors import forbidden
from flask_restful import Resource, reqparse

from flask_jwt_extended import (create_access_token, create_refresh_token, jwt_required,
                                jwt_refresh_token_required, get_jwt_identity, get_raw_jwt)

parser = reqparse.RequestParser()
parser.add_argument('username')
parser.add_argument('email')
parser.add_argument('password', help='This field cannot be blank', required=True)
parser.add_argument('type')

users_schema = UserSchema(many=True, exclude=['password_hash'])
user_schema = UserSchema(exclude=['password_hash'])


class UserRegistration(Resource):
    def post(self):
        data = parser.parse_args()
        try:
            if data['type'] == 'student':
                user = Student(**data)
            elif data['type'] == 'faculty':
                user = Faculty(**data)
            else:
                return {"message": "type must be studnet or faculty", "status": 400}, 400
            user.password = data['password']
            db.session.add(user)
            db.session.commit()
            access_token = create_access_token(identity=user.username)
            refresh_token = create_refresh_token(identity=user.username)
            return {
                'id': user.id,
                'type': user.type,
                'avatar': user.avatar(),
                'username': user.username,
                'access_token': access_token,
                'refresh_token': refresh_token
            }
        except Exception as e:
            return {"message": e._message(), "status": 400}, 400


class UserLogin(Resource):
    def post(self):
        data = parser.parse_args()
        if not data['username'] and not data['email']:
            return {'message': 'Username or email is required'}
        current_user = User.query.filter_by(username=data['username']).first_or_404()

        if not current_user:
            return {'message': 'User {} doesn\'t exist'.format(data['username'])}

        if current_user.verify_password(data['password']):
            access_token = create_access_token(identity=data['username'])
            refresh_token = create_refresh_token(identity=data['username'])
            return {
                'id': current_user.id,
                'type': current_user.type,
                'avatar': current_user.avatar(),
                'username': current_user.username,
                'access_token': access_token,
                'refresh_token': refresh_token
            }
        # TODO: what happens if invalid password?


class UserLogoutAccess(Resource):
    @jwt_required
    def post(self):
        jti = get_raw_jwt()['jti']
        try:
            revoked_token = RevokedTokenModel(jti=jti)
            revoked_token.add()
            return {'message': 'Access token has been revoked'}
        except:
            return {'message': 'Something went wrong'}, 500


class UserLogoutRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        jti = get_raw_jwt()['jti']
        try:
            revoked_token = RevokedTokenModel(jti=jti)
            revoked_token.add()
            return {'message': 'Refresh token has been revoked'}
        except:
            return {'message': 'Something went wrong'}, 500


class TokenRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        access_token = create_access_token(identity=current_user)
        return {'access_token': access_token}


class UsersResource(Resource):
    @jwt_required
    def get(self):
        users = User.query.all()
        return users_schema.jsonify(users)


class UserResource(Resource):
    @jwt_required
    def get(self, id):
        user = User.query.get_or_404(id)
        return user_schema.jsonify(user)

    # returns 1 if deleted, returns 0 if failed (did ID exist?)
    @jwt_required
    def delete(self, id):
        user = User.query.filter_by(id=id).delete()
        db.session.commit()
        return jsonify(user)

    # create an user TODO: figure out how not to use id to create an user
    @jwt_required
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
    @jwt_required
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
