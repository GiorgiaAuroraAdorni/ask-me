from sqlalchemy import func

from . import db
from flask import url_for


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(64), db.CheckConstraint('length(user) > 0', 'ck_question_user_len'), index=True, nullable=False)
    title = db.Column(db.String(140), db.CheckConstraint('length(title) > 0', 'ck_question_title_len'), nullable=False)
    body = db.Column(db.Text(), db.CheckConstraint('length(body) > 0', 'ck_question_body_len'), nullable=False)

    answers = db.relationship('Answer', backref='question', lazy=True)

    def __repr__(self):
        return '<Question {}>'.format(self.title)

    def to_dict(self, answers=False):
        data = {
            'id': self.id,
            'user': self.user,
            'title': self.title,
            'body': self.body,
            '_links': {
                'self': url_for('api.get_question', id=self.id),
            }
        }

        if answers:
            data['answers'] = [a.to_dict() for a in self.answers]

        return data

    def from_dict(self, data):
        for field in ['user', 'title', 'body']:
            if field in data:
                setattr(self, field, data[field])


class Answer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(64), db.CheckConstraint('length(user) > 0', 'ck_answer_user_len'), index=True, nullable=False)
    body = db.Column(db.Text(), db.CheckConstraint('length(body) > 0', 'ck_answer_body_len'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('question.id'), nullable=False)

    votes = db.relationship('Vote', backref='answer', lazy=True)

    def __repr__(self):
        return '<Answer {}>'.format(self.body)

    def to_dict(self, votes=False):
        data = {
            'id': self.id,
            'user': self.user,
            'body': self.body,
            'question_id': self.question_id,
            '_links': {
                'self': url_for('api.get_answer', id=self.id),
            }
        }

        if votes:
            data['votes'] = [v.to_dict() for v in self.votes]
            data['score'] = Vote.query.\
                                filter_by(answer_id=self.id).\
                                with_entities(func.sum(Vote.value)).scalar()

        return data

    def from_dict(self, data):
        for field in ['user', 'body', 'question_id']:
            if field in data:
                setattr(self, field, data[field])


class Vote(db.Model):
    answer_id = db.Column(db.Integer, db.ForeignKey('answer.id'), primary_key=True)
    user = db.Column(db.String(64), db.CheckConstraint('length(user) > 0', 'ck_vote_user_len'), primary_key=True)
    value = db.Column(db.Integer, db.CheckConstraint('value IN (+1, -1)'), nullable=False)

    def __repr__(self):
        return '<Vote {}>'.format(self.value)

    def to_dict(self):
        data = {
            'answer_id': self.answer_id,
            'user': self.user,
            'value': self.value,
            '_links': {
            #    'self': url_for('api.get_vote', id=self.id),
            }
        }

        return data

    def from_dict(self, data):
        for field in ['answer_id', 'user', 'value']:
            if field in data:
                setattr(self, field, data[field])
