from flask import Flask
from flask_cors import CORS
from .database import init_db
from .routes.overlays import overlay_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    # init database
    init_db(app)

    # register blueprints
    app.register_blueprint(overlay_bp, url_prefix='/api/overlays')

    return app
