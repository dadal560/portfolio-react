import logging
from flask import Flask, jsonify
from flask_mail import Mail
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from .config import Config

mail = Mail()
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://"
)

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Validation de la configuration
    if not app.config.get('SECRET_KEY'):
        raise ValueError("SECRET_KEY must be set in environment variables")
    
    if not app.config.get('MAIL_USERNAME') or not app.config.get('MAIL_PASSWORD'):
        raise ValueError("MAIL_USERNAME and MAIL_PASSWORD must be set")

    # Extensions
    mail.init_app(app)
    limiter.init_app(app)
    
    # CORS avec origine dynamique
    allowed_origins = app.config.get('CORS_ORIGINS', []).split(',')
    CORS(
        app, 
        origins=allowed_origins,
        supports_credentials=True,
        methods=["GET", "POST", "OPTIONS"],
        allow_headers=["Content-Type"]
    )

    # Logging configuration
    logging.basicConfig(
        level=logging.INFO if not app.debug else logging.DEBUG,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
        handlers=[
            logging.FileHandler("app.log"),
            logging.StreamHandler()
        ]
    )

    # Désactiver les logs Flask par défaut en production
    if not app.debug:
        log = logging.getLogger('werkzeug')
        log.setLevel(logging.ERROR)

    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            "status": "error",
            "message": "Resource not found"
        }), 404

    @app.errorhandler(500)
    def internal_error(error):
        app.logger.error(f"Internal server error: {error}")
        return jsonify({
            "status": "error",
            "message": "Internal server error"
        }), 500

    @app.errorhandler(429)
    def ratelimit_handler(error):
        return jsonify({
            "status": "error",
            "message": "Too many requests. Please try again later."
        }), 429

    # Security headers
    @app.after_request
    def set_security_headers(response):
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['X-XSS-Protection'] = '1; mode=block'
        
        # HSTS uniquement en production avec HTTPS
        if not app.debug:
            response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
        
        return response

    # Health check endpoint
    @app.route('/health', methods=['GET'])
    def health_check():
        return jsonify({
            "status": "healthy",
            "service": "flask-mailer"
        }), 200

    # Import routes avec prefix /api
    from .routes import main
    app.register_blueprint(main, url_prefix='/api')

    app.logger.info("Application start")
    
    return app