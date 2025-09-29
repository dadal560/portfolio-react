from flask import Blueprint, request, jsonify
from flask_mail import Message
from . import mail
import os
import logging

logger = logging.getLogger(__name__)
main = Blueprint("main", __name__)

@main.route("/send-email", methods=["POST"])
def send_email():
    data = request.get_json()
    email = data.get("email")
    subject = data.get("subject")
    message_body = data.get("message")

    if not email or not message_body:
        return jsonify({"status": "error", "message": "Email et message obligatoires"}), 400

    try:
        msg = Message(
            subject=f"[Contact Form] {subject}",
            recipients=os.getenv("MAIL_RECIPIENTS", os.getenv("MAIL_USERNAME")).split(","),
            body=f"De: {email}\nIP: {request.remote_addr}\n\nSujet: {subject}\n\n{message_body}"
        )
        mail.send(msg)
        logger.info("Email envoyé depuis %s (IP: %s)", email, request.remote_addr)
        return jsonify({"status": "success", "message": "Message envoyé ✅"})
    except Exception as e:
        logger.exception("Erreur lors de l'envoi email")
        return jsonify({"status": "error", "message": "Erreur lors de l'envoi ❌"}), 500
