from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

import models


@app.route('/')
def hello_world():
    return 'Hello World'


if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
