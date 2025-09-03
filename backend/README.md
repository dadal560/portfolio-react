# Flask mailer

Une application web simple pour envoyer des emails via un formulaire de contact, construite avec Flask et Flask-Mail.

## Installation et Configuration

### Prérequis

- Python 3.7+
- Un compte Gmail avec mot de passe d'application

### Installation

1. **Clonez le dépôt**
```bash
git clone https://github.com/dadal560/flask-mailer.git
cd flask-mailer
```

2. **Créez un environnement virtuel**
```bash
python -m venv venv
source venv/bin/activate  # Sur Windows: venv\Scripts\activate
```

3. **Installez les dépendances**
```bash
pip install -r requirements.txt
```

4. **Configuration des variables d'environnement**

Créez un fichier `.env` à la racine du projet :

```env
FLASK_SECRET_KEY=votre_clé_secrète_très_longue_et_complexe
MAIL_USERNAME=votre.email@gmail.com
MAIL_PASSWORD=votre_mot_de_passe_application
```

### Configuration Gmail

1. Activez l'authentification à deux facteurs sur votre compte Gmail
2. Générez un mot de passe d'application :
   - Allez dans **Compte Google** → **Sécurité**
   - Cliquez sur **Mots de passe des applications**
   - Sélectionnez **Autre** et nommez-le "Flask App"
   - Utilisez le mot de passe généré dans le fichier `.env`

## Utilisation

### Lancement de l'application

```bash
python app.py
```

L'application sera accessible sur `http://127.0.0.1:5000`

### Structure du projet

```
flask-contact-form/
├── app.py              # Application Flask principale
├── templates/
│   └── index.html      # Template du formulaire
├── .env               # Variables d'environnement (à créer)
├── requirements.txt   # Dépendances Python
└── README.md         # Documentation
```

## Fichier requirements.txt

```txt
Flask==2.3.3
Flask-Mail==0.9.1
python-dotenv==1.0.0
```

## Configuration Avancée

### Personnalisation du serveur SMTP

Pour utiliser un autre fournisseur d'email, modifiez les paramètres dans `app.py` :

```python
# Pour Outlook/Hotmail
app.config.update(
    MAIL_SERVER='smtp.live.com',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    # ...
)

# Pour Yahoo
app.config.update(
    MAIL_SERVER='smtp.mail.yahoo.com',
    MAIL_PORT=587,
    MAIL_USE_TLS=True,
    # ...
)
```

### Variables d'environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `FLASK_SECRET_KEY` | Clé secrète pour Flask | `your-super-secret-key-here` |
| `MAIL_USERNAME` | Email expéditeur | `votre.email@gmail.com` |
| `MAIL_PASSWORD` | Mot de passe d'application | `abcd efgh ijkl mnop` |


## Personnalisation

### Modification du style

Le CSS est intégré dans le fichier `templates/index.html`. Vous pouvez :

- Modifier les couleurs en changeant les valeurs hexadécimales
- Ajuster les tailles et espacements
- Ajouter des animations CSS

### Personnalisation du message

Dans `app.py`, modifiez le contenu du message :

```python
body=f"""
Nouveau message de contact

Expéditeur: {client_email}
Date: {datetime.now().strftime('%d/%m/%Y %H:%M')}

Message:
{client_message}
"""
```

## Dépannage

### Problèmes courants

**Erreur d'authentification Gmail**
- Vérifiez que l'authentification 2FA est activée
- Utilisez un mot de passe d'application, pas votre mot de passe principal

**Erreur "Variables d'environnement manquantes"**
- Vérifiez que le fichier `.env` existe
- Assurez-vous que toutes les variables sont définies

**Page ne se charge pas**
- Vérifiez que le port 5000 n'est pas utilisé
- Essayez de changer le port dans `app.run(port=5001)`

### Logs de débogage

Activez le mode debug pour plus d'informations :

```python
app.run(debug=True)
```

## Déploiement

### Déploiement Heroku

1. Créez un `Procfile` :
```
web: python app.py
```

2. Configurez les variables d'environnement sur Heroku :
```bash
heroku config:set FLASK_SECRET_KEY=your-secret-key
heroku config:set MAIL_USERNAME=your-email@gmail.com
heroku config:set MAIL_PASSWORD=your-app-password
```

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commit vos changements
4. Push vers la branche
5. Ouvrir une Pull Request


## Support

Pour toute question ou problème :

- Email : gwen.henry56@gmail.com
- Issues : [GitHub Issues](https://github.com/dadal560/flask-mailer/issues)

---

⭐ **N'oubliez pas de star le projet si il vous a été utile !**
