from flask import Blueprint, render_template, request, redirect, url_for, flash
from flask_mail import Message
from .forms import ContactForm # Import relatif : "forms" est dans le même dossier (package app), 
from . import mail
import logging
import os

logger = logging.getLogger(__name__)
main = Blueprint("main", __name__)

@main.route("/", methods=["GET", "POST"])
def index():
    form = ContactForm()
    if form.validate_on_submit():
        try:
            msg = Message(
                subject="[Contact Form]",
                recipients=os.getenv("MAIL_RECIPIENTS", os.getenv("MAIL_USERNAME")).split(","),
                body=(
                    f"De: {form.email.data}\n"
                    f"IP: {request.remote_addr}\n\n"
                    f"{form.message.data}"
                )
            )
            mail.send(msg)
            flash("Message envoyé ✅", "success")
            logger.info("Email envoyé depuis %s (IP: %s)", form.email.data, request.remote_addr)
            return redirect(url_for("main.index"))
        except Exception:
            logger.exception("Erreur lors de l'envoi email")
            flash("Erreur lors de l'envoi ❌", "danger")
            return redirect(url_for("main.index"))
    return render_template("index.html", form=form)
