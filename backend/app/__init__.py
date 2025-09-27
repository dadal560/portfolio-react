import logging
from flask import Flask
from flask_mail import Mail
from flask_wtf.csrf import CSRFProtect
from .config import Config # Import relatif : "config" est dans le même dossier (package app)

mail = Mail()
csrf = CSRFProtect() # Protection contre les attaques CSRF

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Extensions
    mail.init_app(app)
    csrf.init_app(app)

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
