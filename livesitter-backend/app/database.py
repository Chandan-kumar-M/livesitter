from flask import current_app, g
from pymongo import MongoClient
import os

def init_db(app):
    @app.before_request
    def before_request():
        if 'db' not in g:
            mongo_uri = os.getenv('MONGO_URI', 'mongodb://localhost:27017')
            db_name = os.getenv('DB_NAME', 'livesitter')
            g.mongo_client = MongoClient(mongo_uri)
            g.db = g.mongo_client[db_name]

    @app.teardown_appcontext
    def teardown_db(exception):
        mongo_client = g.pop('mongo_client', None)
        if mongo_client is not None:
            mongo_client.close()

def get_db():
    return g.db
