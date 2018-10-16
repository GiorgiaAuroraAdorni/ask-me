from app import app
from flask import jsonify

@app.route('/')
def hello_world():
    return 'Hello World'


@app.route('/questions/')
def list_questions():
    from models import Question

    questions = [ q.to_dict() for q in Question.query.all() ]

    return jsonify(questions)