"""
WSGI entry point for Gunicorn
"""
from app import create_app
import os

app = create_app()

# Utilisez run.py pour le dev local