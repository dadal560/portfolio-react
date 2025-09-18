# Portfolio React + Flask Mailer

Projet combinant un portfolio moderne en React (frontend) et un système de contact Flask (backend).

## Technologies utilisées

### Frontend (Portfolio)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black) ![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=black)

- **React.js** - Interface utilisateur moderne et réactive
- **JavaScript (ES6+)** - Logique frontend avancée
- **HTML5 & CSS3** - Structure et style responsive
- **Webpack & Babel** - Build et transpilation

### Backend (Contact Mailer)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white) ![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)

- **Python 3.7+** - Langage backend robuste
- **Flask** - Application web avec formulaire HTML intégré
- **Flask-Mail** - Système d'envoi d'emails SMTP
- **Jinja2** - Templating pour les pages HTML

### Production & Déploiement
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white) ![Gunicorn](https://img.shields.io/badge/Gunicorn-499848?style=for-the-badge&logo=gunicorn&logoColor=white) ![Let's Encrypt](https://img.shields.io/badge/Let's%20Encrypt-003A70?style=for-the-badge&logo=letsencrypt&logoColor=white) ![Linux](https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black) ![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=for-the-badge&logo=ubuntu&logoColor=white)

- **Nginx** - Serveur web haute performance et proxy inverse
- **Gunicorn** - Serveur WSGI Python pour la production
- **Let's Encrypt** - Certificats SSL gratuits et automatisés
- **Linux/Ubuntu** - Environnement serveur stable

### Outils de développement
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white) ![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

- **Git & GitHub** - Contrôle de version et collaboration
- **Node.js & NPM** - Gestionnaire de paquets et environnement JS
- **VS Code** - Éditeur de code recommandé
- **ESLint & Prettier** - Qualité et formatage du code

## Installation et Configuration

### Prérequis

- **Node.js** (version 14.0 ou supérieure)
- **Python 3.7+**
- **npm ou yarn**
- **Un compte Gmail** avec mot de passe d'application
- **Nginx** (pour la production)

### Installation

1. **Clonez le dépôt**

```bash
git clone https://github.com/dadal560/portfolio-react.git
cd portfolio-react
```

2. **Configuration du Backend (Flask Mailer)**

```bash
# Aller dans le dossier backend
cd backend

# Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # Sur Windows: venv\Scripts\activate

# Installer les dépendances Python
pip install -r requirements.txt
```

3. **Configuration du Frontend (React Portfolio)**

```bash
# Aller dans le dossier frontend
cd ../frontend

# Installer les dépendances Node.js
npm install
```

4. **Variables d'environnement**

Créez un fichier `.env` dans le dossier `backend/` :

```env
# Flask Configuration
FLASK_SECRET_KEY=votre_clé_secrète_très_longue_et_complexe

# Email Configuration
MAIL_USERNAME=votre.email@gmail.com
MAIL_PASSWORD=votre_mot_de_passe_application
```

### Configuration Gmail

1. Activez l'authentification à deux facteurs sur votre compte Gmail
2. Générez un mot de passe d'application :
   - Allez dans **myaccount.google.com** → **Sécurité**
   - Cliquez sur **Mots de passe des applications**
   - Sélectionnez **Autre** et nommez-le "Portfolio Mailer"
   - Utilisez le mot de passe généré (16 caractères) dans le fichier `.env`

## Développement

### Lancement en mode développement

**Terminal 1 - Backend Flask Mailer :**
```bash
cd backend
source venv/bin/activate
python app.py
```
Le formulaire de contact sera accessible sur `http://127.0.0.1:5000`

**Terminal 2 - Frontend React Portfolio :**
```bash
cd frontend
npm start
```
Le portfolio sera accessible sur `http://127.0.0.1:3000`

### Fonctionnalités

#### Portfolio React (Frontend)
- **Design responsive** adapté à tous les écrans
- **Navigation fluide** entre les sections
- **Présentation About** avec photo et parcours
- **Section Skills** avec technologies maîtrisées
- **Galerie Projects** avec liens GitHub
- **Lien vers formulaire** de contact Flask
- **Animations CSS** et transitions modernes

#### Flask Mailer (Backend)
- **Validation des données** côté serveur
- **Envoi d'emails** via Gmail SMTP
- **Messages de confirmation** utilisateur
- **Gestion d'erreurs** complète

## Build et Déploiement

### Build de production

```bash
# Build du frontend React
cd frontend
npm run build

# Le dossier build/ contient les fichiers statiques optimisés
```

### Dépendances

**Backend (requirements.txt) :**
```txt
Flask==2.3.3
Flask-Mail==0.9.1
python-dotenv==1.0.0
gunicorn==21.2.0
```

**Frontend (package.json) :**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  }
}
```

## Configuration de Production avec Nginx

### Configuration Nginx

Créez le fichier `/etc/nginx/sites-available/portfolio` :

```nginx
server {
    listen 80;
    server_name votre-domaine.com www.votre-domaine.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name votre-domaine.com www.votre-domaine.com;

    # Certificats SSL
    ssl_certificate /etc/letsencrypt/live/votre-domaine.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/votre-domaine.com/privkey.pem;
    
    # Configuration SSL sécurisée
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;

    # Headers de sécurité
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Portfolio React - Servir les fichiers statiques
    location / {
        root /var/www/portfolio/frontend/build;
        index index.html;
        try_files $uri $uri/ /index.html;
        expires 1h;
        add_header Cache-Control "public, must-revalidate, proxy-revalidate";
    }

    # Fichiers statiques React avec cache long
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        root /var/www/portfolio/frontend/build;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Flask Mailer - Formulaire de contact
    location /contact {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Limitation du taux pour le formulaire de contact
    location ~ ^/contact/(send|submit) {
        limit_req zone=contact burst=3 nodelay;
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Logs
    access_log /var/log/nginx/portfolio.access.log;
    error_log /var/log/nginx/portfolio.error.log;
}

# Configuration globale (dans nginx.conf)
http {
    # Limitation du taux pour le contact
    limit_req_zone $binary_remote_addr zone=contact:10m rate=2r/m;
    
    # Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json
        font/truetype
        font/opentype
        application/vnd.ms-fontobject
        image/svg+xml;
}
```

### Service systemd pour Flask Mailer

Créez `/etc/systemd/system/portfolio-mailer.service` :

```ini
[Unit]
Description=Gunicorn instance to serve Flask Mailer
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/portfolio/backend
Environment="PATH=/var/www/portfolio/backend/venv/bin"
EnvironmentFile=/var/www/portfolio/backend/.env
ExecStart=/var/www/portfolio/backend/venv/bin/gunicorn -c /var/www/portfolio/gunicorn.conf.py wsgi:app
ExecReload=/bin/kill -s HUP $MAINPID
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

### Configuration Gunicorn

```python
# gunicorn.conf.py
bind = "127.0.0.1:5000"
workers = 2
worker_class = "sync"
timeout = 30
keepalive = 2
preload_app = True
chdir = "/var/www/portfolio/backend"
```

### Déploiement complet

```bash
# 1. Préparer l'environnement
sudo mkdir -p /var/www/portfolio
sudo chown -R www-data:www-data /var/www/portfolio

# 2. Cloner et configurer
cd /var/www/portfolio
git clone https://github.com/dadal560/portfolio-react.git .

# 3. Backend Flask Mailer
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 4. Frontend React Portfolio
cd ../frontend
npm install
npm run build

# 5. Configuration système
sudo cp nginx/portfolio.conf /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo systemctl enable portfolio-mailer
sudo systemctl start portfolio-mailer
sudo nginx -t && sudo systemctl reload nginx
```

## Monitoring et Logs

### Commandes de monitoring

```bash
# Statut des services
sudo systemctl status portfolio-mailer
sudo systemctl status nginx

# Logs Flask Mailer
sudo journalctl -u portfolio-mailer -f

# Logs Nginx
sudo tail -f /var/log/nginx/portfolio.access.log
sudo tail -f /var/log/nginx/portfolio.error.log

# Redémarrage des services
sudo systemctl restart portfolio-mailer
sudo systemctl reload nginx
```

## Dépannage

### Problèmes courants

**Portfolio React ne se charge pas**
- Vérifiez que le build existe : `ls frontend/build/`
- Vérifiez la configuration Nginx pour les fichiers statiques

**Formulaire de contact inaccessible**
- Vérifiez que Flask Mailer est démarré : `sudo systemctl status portfolio-mailer`
- Vérifiez les logs : `sudo journalctl -u portfolio-mailer`

**Emails non envoyés**
- Vérifiez les credentials Gmail dans `.env`
- Consultez les logs Flask pour les erreurs SMTP

**Erreur 502 Bad Gateway sur /contact**
- Vérifiez que Gunicorn écoute sur le port 5000
- Vérifiez la configuration du proxy Nginx

## License

Ce projet est sous licence Apache-2.0. Voir le fichier `LICENSE` pour plus de détails.

## Support

Pour toute question ou problème :

- **Email** : [gwen.henry56@gmail.com](mailto:gwen.henry56@gmail.com)
- **Issues** : [GitHub Issues](https://github.com/dadal560/portfolio-react/issues)
- **Discussions** : [GitHub Discussions](https://github.com/dadal560/portfolio-react/discussions)

---

⭐ **N'oubliez pas de star le projet s'il vous a été utile !**
