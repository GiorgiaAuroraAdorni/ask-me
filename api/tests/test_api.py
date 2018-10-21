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


def test_hello_world(client):
    rv = client.get('/')
def test_create_answer_has_votes(client):
    """Create answer also create a list of votes and the field score."""

    assert create_question(client).status_code == 201

    answer = create_answer(client)

    assert answer.status_code == 201

    json = answer.get_json()

    assert json['votes'] == []
    assert json['score'] == 0


    assert rv.status_code == 200
    assert b'Hello World' in rv.data
