"""
WSGI entry point for Gunicorn
"""
from app import create_app
import os

app = create_app()

if __name__ == "__main__":
    # Ce bloc ne sera jamais exécuté avec Gunicorn
    # Mais utile pour le debug local
    port = int(os.getenv("PORT", 5000))
    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )