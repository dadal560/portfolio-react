from flask import Flask, render_template , request , redirect, flash
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

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

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        client_email = request.form["email"]
        client_message = request.form["message"]
        try:
            msg = Message(
                subject="Flask mail",
                recipients=[os.getenv("MAIL_USERNAME")],  # Destinataire
                body=f"Adresse de l'expéditeur : {client_email}\n\nMessage :\n{client_message}"
            )
            mail.send(msg)
            flash("Votre message a été envoyé avec succès", "success")
            return redirect("/")
        except Exception as e:
            flash(f"Erreur lors de l'envoi : {str(e)}", "danger")
            return redirect("/")

    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=5000)