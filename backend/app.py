from flask import Flask, render_template, request, redirect, flash, url_for
from flask_mail import Mail, Message
from flask_wtf import FlaskForm, CSRFProtect
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Email, Length
from dotenv import load_dotenv
import os
import logging

# Charger variables .env
load_dotenv()

# Vérification des variables obligatoires
for var in ['FLASK_SECRET_KEY', 'MAIL_USERNAME', 'MAIL_PASSWORD']:
    if not os.getenv(var):
        raise EnvironmentError(f"Variable d'environnement manquante: {var}")

# Config Flask
app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("FLASK_SECRET_KEY")
# Protection contre les attaques CSRF sur les formulaires
csrf = CSRFProtect(app)

# Config email
app.config.update(
    MAIL_SERVER="smtp.gmail.com",
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_DEFAULT_SENDER=os.getenv("MAIL_USERNAME")
)
mail = Mail(app)

# Logging basique
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler("app.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Formulaire contact
class ContactForm(FlaskForm):
    email = StringField("Email", validators=[DataRequired(), Email()])
    message = TextAreaField("Message", validators=[DataRequired(), Length(min=10, max=2000)])
    submit = SubmitField("Envoyer")

@app.route("/", methods=["GET", "POST"])
def index():
    form = ContactForm()
    if form.validate_on_submit():
        try:
            msg = Message(
                subject="[Contact Form]",
                recipients=[os.getenv("MAIL_USERNAME")],
                body=f"De: {form.email.data}\nIP: {request.remote_addr}\n\n{form.message.data}"
            )
            mail.send(msg)
            flash("Message envoyé ✅", "success")
            logger.info(f"Email envoyé depuis {form.email.data} (IP: {request.remote_addr})")
            return redirect(url_for("index"))
        except Exception as e:
            flash("Erreur d'envoi ❌", "danger")
            logger.error(f"Erreur lors de l'envoi email: {e}")
            return redirect(url_for("index"))
    return render_template("index.html", form=form)

if __name__ == "__main__":
    app.run(debug=True)