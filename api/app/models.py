from . import db
from flask import url_for


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(64), index=True, nullable=False)
    title = db.Column(db.String(140), nullable=False)
    body = db.Column(db.Text(), nullable=False)

    answers = db.relationship('Answer', backref='question', lazy=True)

    def __repr__(self):
        return '<Question {}>'.format(self.title)

    def to_dict(self):
        data = {
            'id': self.id,
            'user': self.user,
            'title': self.title,
            'body': self.body,
            '_links': {
                #'self': url_for('get_question', id=self.id),
            }
        }

        return data


class Answer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(64), index=True, nullable=False)
    body = db.Column(db.Text(), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), nullable=False)

    votes = db.relationship('Vote', backref='answer', lazy=True)

    def __repr__(self):
        return '<Answer {}>'.format(self.body)


class Vote(db.Model):
    answer_id = db.Column(db.Integer, db.ForeignKey('answer.id'), primary_key=True)
    user = db.Column(db.String(64), primary_key=True)
    value = db.Column(db.Integer, db.CheckConstraint('value IN (+1, -1)'), nullable=False)

    def __repr__(self):
        return '<Vote {}>'.format(self.value)
