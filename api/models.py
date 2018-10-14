from app import db


class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(64), index=True, nullable=False)
    title = db.Column(db.String(140), nullable=False)
    body = db.Column(db.Text(), nullable=False)

    answers = db.relationship('Answer', backref='question', lazy=True)

    def __repr__(self):
        return '<Question {}>'.format(self.title)


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
    value = db.Column(db.Text(), db.CheckConstraint('value IN (+1, -1)'), nullable=False)

    def __repr__(self):
        return '<Vote {}>'.format(self.value)
