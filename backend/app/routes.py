from flask import Blueprint, request, jsonify
from flask_mail import Message
from . import mail, limiter
import os
import logging
import re
from email.utils import parseaddr

logger = logging.getLogger(__name__)
main = Blueprint("main", __name__)

# Regex pour validation email plus stricte
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')


def valide_email(email: str) -> bool:
    """Valide le format de l'email"""
    if not email or len(email) > 120:
        return False
    
    # Vérifier avec parseaddr (sécurité)
    _, addr = parseaddr(email)
    if not addr:
        return False
    
    # Vérifier avec regex
    return bool(EMAIL_REGEX.match(addr))


def sanitize_input(text: str, max_length: int = 2000) -> str:
    """Nettoie et limite la longueur du texte"""
    if not text:
        return ""
    
    # Enlever les espaces superflus
    text = text.strip()
    
    # Limiter la longueur
    if len(text) > max_length:
        text = text[:max_length]
    
    return text


@main.route("/api", methods=["POST"])
@limiter.limit("5 per hour")  # Maximum 5 emails par heure par IP
def send_email():
    """Endpoint pour envoyer un email via le formulaire de contact"""
    
    # Vérifier le Content-Type
    if not request.is_json:
        return jsonify({
            "status": "error",
            "message": "Content-Type must be application/json"
        }), 415
    
    # Récupérer les données
    data = request.get_json()
    
    if not data:
        return jsonify({
            "status": "error",
            "message": "No data provided"
        }), 400
    
    email = data.get("email", "").strip()
    subject = data.get("subject", "").strip()
    message_body = data.get("message", "").strip()
    
    # Validation des champs obligatoires
    if not email or not message_body:
        return jsonify({
            "status": "error",
            "message": "Email et message sont obligatoires"
        }), 400
    
    # Validation de l'email
    if not valide_email(email):
        return jsonify({
            "status": "error",
            "message": "Format d'email invalide"
        }), 400
    
    # Validation de la longueur du sujet
    if subject and len(subject) > 150:
        return jsonify({
            "status": "error",
            "message": "Le sujet ne peut pas dépasser 150 caractères"
        }), 400
    
    # Validation de la longueur du message
    if len(message_body) < 10:
        return jsonify({
            "status": "error",
            "message": "Le message doit contenir au moins 10 caractères"
        }), 400
    
    if len(message_body) > 2000:
        return jsonify({
            "status": "error",
            "message": "Le message ne peut pas dépasser 2000 caractères"
        }), 400
    
    # Sanitisation des inputs
    subject = sanitize_input(subject, 150)
    message_body = sanitize_input(message_body, 2000)
    
    # Par défaut si pas de sujet
    if not subject:
        subject = "Nouveau message de contact"
    
    try:
        # Récupérer les destinataires depuis la config
        recipients_str = os.getenv("MAIL_RECIPIENTS", os.getenv("MAIL_USERNAME"))
        recipients = [r.strip() for r in recipients_str.split(",") if r.strip()]
        
        # Construire le message
        msg = Message(
            subject=f"[Contact Form] {subject}",
            recipients=recipients,
            body=f"""Nouveau message du formulaire de contact
            
De: {email}
IP: {request.remote_addr}
User-Agent: {request.headers.get('User-Agent', 'Unknown')}

Sujet: {subject}

Message:
{message_body}

---
Cet email a été envoyé depuis le formulaire de contact du portfolio.
""",
            reply_to=email
        )
        
        # Envoi de l'email
        mail.send(msg)
        
        # Log de succès (sans données sensibles)
        logger.info(
            f"Email sent successfully from {email[:3]}***@{email.split('@')[1]} "
            f"(IP: {request.remote_addr})"
        )
        
        return jsonify({
            "status": "success",
            "message": "Message envoyé avec succès ✅"
        }), 200
        
    except Exception:
        # Log de l'erreur (avec stack trace)
        logger.exception(f"Failed to send email from {email}")
        
        # Message d'erreur générique pour l'utilisateur
        return jsonify({
            "status": "error",
            "message": "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer plus tard."
        }), 500


@main.route("/test", methods=["GET"])
def test():
    """Endpoint de test pour vérifier que l'API fonctionne"""
    return jsonify({
        "status": "success",
        "message": "API is working",
        "endpoints": {
            "/api/send-email": "POST - Send contact form email",
            "/api/test": "GET - Test endpoint",
            "/health": "GET - Health check"
        }
    }), 200