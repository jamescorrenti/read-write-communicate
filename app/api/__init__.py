from flask import Blueprint
from flask_restful import Api
from .assignments import AssignmentsResource, AssignmentResource
from .questions import QuestionResource
from .users import UsersResource, UserResource
from .classes import ClassResource, ClassesResource
from .schools import SchoolResource, SchoolsResource

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

api.add_resource(AssignmentsResource, '/assignments/')
api.add_resource(AssignmentResource, '/assignment/<int:id>')
api.add_resource(QuestionResource, '/question/<int:id>')
api.add_resource(UsersResource, '/users/')
api.add_resource(UserResource, '/user/<int:id>')
api.add_resource(ClassesResource, '/classes/')
api.add_resource(ClassResource, '/class/<int:id>')
api.add_resource(SchoolsResource, '/schools/')
api.add_resource(SchoolResource, '/school/<int:id>')
