from flask import Blueprint
from flask_restful import Api

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

from . import users, questions, classes, assignments, schools

api.add_resource(users.UserRegistration, '/registration')
api.add_resource(users.UserLogin, '/login')
api.add_resource(users.UserLogoutAccess, '/logout/access')
api.add_resource(users.UserLogoutRefresh, '/logout/refresh')
api.add_resource(users.TokenRefresh, '/token/refresh')

api.add_resource(assignments.AssignmentsResource, '/assignments/')
api.add_resource(assignments.AssignmentResource, '/assignment/<int:id>')
api.add_resource(questions.QuestionResource, '/question/<int:id>')
api.add_resource(users.UsersResource, '/users/')
api.add_resource(users.UserResource, '/user/<int:id>')
api.add_resource(classes.ClassesResource, '/classes/')
api.add_resource(classes.ClassResource, '/class/<int:id>')
api.add_resource(schools.SchoolsResource, '/schools/')
api.add_resource(schools.SchoolResource, '/school/<int:id>')
