from app import create_app
import os

app = create_app()

if __name__ == "__main__":
    if os.getenv("FLASK_ENV") == "production":
        exit(1)
    
    # Développement uniquement
    port = int(os.getenv("DEV_PORT", 5000))
    app.run(
        host="127.0.0.1",  # localhost seulement
        port=port,
        debug=True,        # Auto-reload
        use_reloader=True
    )