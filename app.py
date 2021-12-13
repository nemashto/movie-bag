from flask import Flask
from flask_cors import CORS, cross_origin
from flask_restful import Api
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager

from database.db import initialize_db
from resources.routes import initialize_routes

app = Flask(__name__)
app.config.from_envvar('ENV_FILE_LOCATION')

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
api = Api(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# init
app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://localhost/movie-bag'
}

initialize_db(app)
initialize_routes(api)

app.run()
