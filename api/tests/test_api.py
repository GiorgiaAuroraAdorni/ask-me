import pytest

from app import create_app, config, db
from sqlalchemy import engine, event, exc


@event.listens_for(engine.Engine, "connect")
def enforce_foreign_keys(dbapi_connection, connection_record):
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA foreign_keys=ON")
    cursor.close()


class TestConfig(config.Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite://'


@pytest.fixture
def client():
    app = create_app(TestConfig)

    with app.app_context():
        db.create_all()

        yield app.test_client()

        db.session.remove()
        db.drop_all()


def create_question(client, user='anonimo', title='domanda', body='testo domanda'):

    question = {
        'user': user,
        'title': title,
        'body': body
    }

    return client.post('/questions', json=question)


def create_answer(client, user='anonimo', question_id=1, body='testo risposta'):

    answer = {
        'user': user,
        'question_id': question_id,
        'body': body
    }

    return client.post('/answers', json=answer)


def create_vote(client, user='anonimo', answer_id=1, value=1):

    vote = {
        'user': user,
        'answer_id': answer_id,
        'value': value
    }

    return client.post('/votes', json=vote)

#


def test_successful_creation(client):
    """Create question, answer and vote works."""

    # create question with success
    question = create_question(client)

    assert question.status_code == 201

    rv = client.get('/questions/1')

    assert question.get_json() == rv.get_json()

    # create answer with success
    answer = create_answer(client)

    assert answer.status_code == 201

    rv = client.get('/answers/1')

    assert answer.get_json() == rv.get_json()

    # create vote
    vote = create_vote(client)

    assert vote.status_code == 201


def test_create_question_has_answer(client):
    """Create question also create a list of answer."""

    question = create_question(client)
    assert question.status_code == 201

    json = question.get_json()

    assert json['answers'] == []


def test_create_answer_has_votes(client):
    """Create answer also create a list of votes and the field score."""

    assert create_question(client).status_code == 201

    answer = create_answer(client)

    assert answer.status_code == 201

    json = answer.get_json()

    assert json['votes'] == []
    assert json['score'] == 0


def test_fail_create_answer(client):
    """Create answer doesn't work because the question doesn't exist."""

    with pytest.raises(exc.IntegrityError):
        create_answer(client)


def test_fail_create_vote(client):
    """Create vote doesn't work because the answer doesnt exist."""

    with pytest.raises(exc.IntegrityError):
        create_vote(client)


def test_null_question_parameter(client):
    """Create question with null or empty field doesn't work."""

    for field in ['user', 'title', 'body']:
        for value in [None, '']:
            kwargs = {
                field: value
            }
            print(field, value)
            with pytest.raises(exc.IntegrityError):
                create_question(client, **kwargs)


def test_null_answer_parameter(client):
    """Create answer with null or empty field doesn't work."""

    for field in ['user', 'body']:
        for value in [None, '']:
            kwargs = {
                field: value
            }

            with pytest.raises(exc.IntegrityError):
                create_answer(client, **kwargs)

    with pytest.raises(exc.IntegrityError):
        create_answer(client, question_id=None)


def test_null_vote_parameter(client):
    """Create vote with null or empty field doesn't work."""

    for field in ['user']:
        for value in [None, '']:
            kwargs = {
                field: value
            }

            with pytest.raises(exc.IntegrityError):
                create_vote(client, **kwargs)

    for field in ['answer_id', 'value']:
        for value in [None]:
            kwargs = {
                field: value
            }

            with pytest.raises(exc.IntegrityError):
                create_vote(client, **kwargs)


def test_invalid_vote(client):
    """Create vote with invalid value (different from -1 or +1) doesn't work."""

    with pytest.raises(exc.IntegrityError):
        create_vote(client, value=0)

    with pytest.raises(exc.IntegrityError):
        create_vote(client, value=-2)


def test_score(client):
    """Score contains the sum of the votes and is the expected value expected."""

    assert create_question(client).status_code == 201

    answer = create_answer(client)

    answer_id = answer.get_json()['id']

    assert answer.status_code == 201

    # add some votes
    assert create_vote(client).status_code == 201

    assert create_vote(client, user='anonimo2').status_code == 201

    assert create_vote(client, user='anonimo3').status_code == 201

    assert create_vote(client, user='anonimo4', value=-1).status_code == 201

    rv = client.get('/answers/%d' % answer_id)

    score = rv.get_json()['score']

    assert score == 2


def test_change_vote(client):
    """Change vote works."""

    # create question, related answer and vote it
    assert create_question(client).status_code == 201

    assert create_answer(client).status_code == 201

    vote = create_vote(client)

    answer_id = vote.get_json()['answer_id']
    value = vote.get_json()['value']

    assert vote.status_code == 201

    rv = client.get('/answers/%d' % answer_id)

    score = rv.get_json()['score']

    assert score == value

    # change the vote
    vote = create_vote(client, value=-1)

    value = vote.get_json()['value']

    assert vote.status_code == 201

    rv = client.get('/answers/%d' % answer_id)

    score = rv.get_json()['score']

    assert score == value
