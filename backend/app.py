from flask import Flask, jsonify, request 
from flask_cors import CORS
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os

# Charger les variables d'environnement
load_dotenv()

app = Flask(__name__)
CORS(app)  # Autoriser le front à communiquer avec le back

app.secret_key = os.getenv('FLASK_SECRET_KEY')

# Configuration Flask-Mail
app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USERNAME=os.getenv('MAIL_USERNAME'),
    MAIL_PASSWORD=os.getenv('MAIL_PASSWORD'),
    MAIL_DEFAULT_SENDER=os.getenv('MAIL_USERNAME')
)

mail = Mail(app)

@app.route("/send-email", methods=["POST"])
def send_email():
    data = request.get_json()
    client_email = data.get("email")
    subject = data.get("subject", "Message depuis Portfolio")
    message_body = data.get("message")

    if not client_email or not message_body:
        return jsonify({"status": "error", "message": "Email et message requis"}), 400

    try:
        msg = Message(
            subject=subject,
            recipients=[os.getenv("MAIL_USERNAME")],  # Ton email
            body=f"Adresse de l'expéditeur : {client_email}\n\nMessage :\n{message_body}"
        )
        mail.send(msg)
        return jsonify({"status": "success", "message": "Email envoyé avec succès"})
    except Exception as e:
        return jsonify({"status": "error", "message": f"Erreur lors de l'envoi : {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)