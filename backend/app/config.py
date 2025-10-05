import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Configuration de l'application Flask"""
    
    # Sécurité - CRITIQUE
    SECRET_KEY = os.getenv("FLASK_SECRET_KEY")
    if not SECRET_KEY:
        raise ValueError(
            "FLASK_SECRET_KEY must be set in environment variables. "
            "Generate one with: python -c 'import secrets; print(secrets.token_hex(32))'"
        )
    
    # Env
    ENV = os.getenv("FLASK_ENV", "production")
    DEBUG = ENV == "development"
    TESTING = False
    
    # CORS - Frontend autorisé
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173")
    
    # Configuration Mail
    MAIL_SERVER = os.getenv("MAIL_SERVER", "smtp.gmail.com")
    MAIL_PORT = int(os.getenv("MAIL_PORT", "587"))
    MAIL_USE_TLS = os.getenv("MAIL_USE_TLS", "True").lower() == "true"
    MAIL_USE_SSL = os.getenv("MAIL_USE_SSL", "False").lower() == "true"
    MAIL_USERNAME = os.getenv("MAIL_USERNAME")
    MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
    MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER", os.getenv("MAIL_USERNAME"))
    
    # Destinataires (peut être multiple, séparés par des virgules)
    MAIL_RECIPIENTS = os.getenv("MAIL_RECIPIENTS", os.getenv("MAIL_USERNAME"))
    
    # Validation de la config mail
    if not MAIL_USERNAME:
        raise ValueError("MAIL_USERNAME must be set in environment variables")
    if not MAIL_PASSWORD:
        raise ValueError("MAIL_PASSWORD must be set in environment variables")
    
    # Limites de rate limiting
    RATELIMIT_STORAGE_URL = os.getenv("RATELIMIT_STORAGE_URL", "memory://")
    
    # Timeouts
    MAIL_TIMEOUT = int(os.getenv("MAIL_TIMEOUT", "10"))  # 10 secondes
    
    # Logging
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
    LOG_FILE = os.getenv("LOG_FILE", "app.log")
    
    @staticmethod
    def init_app(app):
        """Initialisation supplémentaire si nécessaire"""
        pass


class DevelopmentConfig(Config):
    """Configuration pour le développement"""
    DEBUG = True
    ENV = "development"


class ProductionConfig(Config):
    """Configuration pour la production"""
    DEBUG = False
    ENV = "production"
    
    # Validation supplémentaire en production
    @classmethod
    def init_app(cls, app):
        Config.init_app(app)
        
        # Vérifier que debug est bien désactivé
        assert not app.debug, "Debug mode must be disabled in production"


class TestingConfig(Config):
    """Configuration pour les tests"""
    TESTING = True
    WTF_CSRF_ENABLED = False


# Dictionnaire des configurations
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': ProductionConfig
}