from flask import Blueprint, jsonify, request, url_for

from . import db
from .errors import bad_request
from .models import Question, Answer

bp = Blueprint('api', __name__)

@bp.route('/')
def hello_world():
    return 'Hello World'


@bp.route('/questions')
def list_questions():
    questions = [ q.to_dict() for q in Question.query.all() ]

    return jsonify(questions)


@bp.route('/questions/<int:id>')
def get_question(id):
    question = Question.query.get_or_404(id)

    return jsonify(question.to_dict())


@bp.route('/questions', methods=['POST'])
def create_question():
    data = request.get_json() or {}

    if 'user' not in data or 'title' not in data or 'body' not in data:
        return bad_request('must include user, title and body fields')

    question = Question()
    question.from_dict(data)
    db.session.add(question)
    db.session.commit()

    response = jsonify(question.to_dict())
    response.status_code = 201
    response.headers['Location'] = url_for('api.get_question', id=question.id)
    return response


@bp.route('/answers/<int:id>')
def get_answer(id):
    answer = Answer.query.get_or_404(id)

    return jsonify(answer.to_dict())


@bp.route('/answers', methods=['POST'])
def create_answer():
    data = request.get_json() or {}

    if 'user' not in data or 'body' not in data or 'question_id' not in data:
        return bad_request('must include user, body and question id')

    answer = Answer()
    answer.from_dict(data)
    db.session.add(answer)
    db.session.commit()

    response = jsonify(answer.to_dict())
    response.status_code = 201
    response.headers['Location'] = url_for('api.get_answer', id=answer.id)
    return response