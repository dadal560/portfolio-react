import logging
from flask import Flask
from flask_mail import Mail
from flask_cors import CORS
from .config import Config

mail = Mail()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Extensions
    mail.init_app(app)
    
    # Autoriser le front à communiquer avec le back
    CORS(app, origins=["http://localhost:5173"] ,supports_credentials=True)

    # Logging
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(message)s",# Format de sortie du log
        handlers=[
            logging.FileHandler("app.log"),
            logging.StreamHandler()
        ]
    )

    # Import routes
    from .routes import main
    app.register_blueprint(main)

    return app
