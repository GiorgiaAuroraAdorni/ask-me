from flask import Blueprint, jsonify

from .models import Question

bp = Blueprint('api', __name__)

@bp.route('/')
def hello_world():
    return 'Hello World'


@bp.route('/questions/')
def list_questions():
    questions = [ q.to_dict() for q in Question.query.all() ]

    return jsonify(questions)