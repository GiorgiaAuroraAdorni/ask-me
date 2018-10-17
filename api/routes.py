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


@app.route('/questions/<int:id>')
def get_question(id):
    from models import Question

    return jsonify(Question.query.get_or_404(id).to_dict())
@app.route('/answers/<int:id>')
def get_answer(id):
    from models import Answer

    return jsonify(Answer.query.get_or_404(id).to_dict())
