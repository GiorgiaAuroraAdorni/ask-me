import pytest

from app import create_app, config, db


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

    assert rv.status_code == 200
    assert b'Hello World' in rv.data
