import os
from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, Email, Length

class ContactForm(FlaskForm):
    email = StringField("Email", validators=[DataRequired(), Email(), Length(min=15, max=120)])
    subject = StringField("Sujet", validators=[DataRequired(), Length(min=3, max=150)])
    message = TextAreaField("Message", validators=[DataRequired(), Length(min=10, max=2000)])
    submit = SubmitField("Envoyer")