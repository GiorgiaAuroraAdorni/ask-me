from app import app
from flask import jsonify, request, url_for
from app import db
from errors import bad_request


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


@app.route('/questions', methods=['POST'])
def create_question():
    from models import Question

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


@app.route('/answers/<int:id>')
def get_answer(id):
    from models import Answer

    return jsonify(Answer.query.get_or_404(id).to_dict())


@app.route('/answers', methods=['POST'])
def create_answer():
    from models import Answer

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
