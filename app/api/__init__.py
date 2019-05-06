from flask import Blueprint
from flask_restful import Api
from .assignments import AssignmentsResource, AssignmentResource

api_bp = Blueprint('api', __name__)
api = Api(api_bp)


#from . import authentication, assignments, users, questions, errors
api.add_resource(AssignmentsResource, '/assignments/')
api.add_resource(AssignmentResource, '/assignment/<int:id>')
