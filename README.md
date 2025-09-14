# Portfolio React + Flask Mailer

Application full-stack combinant un portfolio React (frontend) et un système de contact Flask avec envoi d'emails (backend).

## Technologies utilisées

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) ![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black) ![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=black)

- **React.js** - Interface utilisateur moderne et réactive
- **JavaScript (ES6+)** - Logique frontend avancée
- **HTML5 & CSS3** - Structure et style responsive
- **Webpack & Babel** - Build et transpilation

### Backend
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white) ![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)

- **Python 3.7+** - Langage backend robuste
- **Flask** - Framework web minimaliste et flexible
- **Flask-Mail** - Système d'envoi d'emails intégré
- **Flask-CORS** - Gestion des requêtes cross-origin

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

## Structure du projet

```
portfolio-react-flask/
├── frontend/                    # Application React
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   ├── About/
│   │   │   ├── Projects/
│   │   │   ├── Skills/
│   │   │   ├── Contact/         # Formulaire de contact
│   │   │   └── Footer/
│   │   ├── services/
│   │   │   └── api.js          # Appels API vers Flask
│   │   ├── assets/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── build/                   # Build de production
├── backend/                     # Application Flask
│   ├── app.py                  # API Flask principale
│   ├── wsgi.py                 # Point d'entrée WSGI
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── contact.py          # Route pour l'envoi d'emails
│   │   └── api.py              # Routes API
│   ├── utils/
│   │   └── mail.py             # Configuration Flask-Mail
│   └── requirements.txt
├── nginx/
│   └── portfolio.conf          # Configuration Nginx
├── .env                        # Variables d'environnement
├── gunicorn.conf.py           # Configuration Gunicorn
└── README.md
```

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

2. **Configuration du Backend (Flask)**

```bash
# Aller dans le dossier backend
cd backend

# Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # Sur Windows: venv\Scripts\activate

# Installer les dépendances Python
pip install -r requirements.txt
```

3. **Configuration du Frontend (React)**

```bash
# Aller dans le dossier frontend
cd ../frontend

# Installer les dépendances Node.js
npm install
```

4. **Variables d'environnement**

Créez un fichier `.env` à la racine du projet :

```env
# Flask Configuration
FLASK_SECRET_KEY=votre_clé_secrète_très_longue_et_complexe
FLASK_ENV=production

# Email Configuration
MAIL_USERNAME=votre.email@gmail.com
MAIL_PASSWORD=votre_mot_de_passe_application
MAIL_SERVER=smtp.gmail.com
MAIL_PORT=587
MAIL_USE_TLS=True

# API Configuration
API_BASE_URL=https://votre-domaine.com/api
```

### Configuration Gmail

1. Activez l'authentification à deux facteurs sur votre compte Gmail
2. Générez un mot de passe d'application :
   - Allez dans **Compte Google** → **Sécurité**
   - Cliquez sur **Mots de passe des applications**
   - Sélectionnez **Autre** et nommez-le "Portfolio App"
   - Utilisez le mot de passe généré dans le fichier `.env`

## Développement

### Lancement en mode développement

**Terminal 1 - Backend Flask :**
```bash
cd backend
source venv/bin/activate
python app.py
```
Le backend sera accessible sur `http://127.0.0.1:5000`

**Terminal 2 - Frontend React :**
```bash
cd frontend
npm start
```
Le frontend sera accessible sur `http://127.0.0.1:3000`

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/contact` | Envoi d'email de contact |
| `GET` | `/api/health` | Vérification de l'état du serveur |
| `GET` | `/api/projects` | Liste des projets (optionnel) |

### Exemple d'appel API (React)

```javascript
// frontend/src/services/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const sendContactEmail = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi du message');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
};
```

```javascript
// frontend/src/components/Contact/ContactForm.js
import { sendContactEmail } from '../../services/api';

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  
  try {
    await sendContactEmail({
      name: formData.name,
      email: formData.email,
      message: formData.message
    });
    
    setSuccessMessage('Message envoyé avec succès !');
    setFormData({ name: '', email: '', message: '' });
  } catch (error) {
    setErrorMessage('Erreur lors de l\'envoi du message');
  } finally {
    setIsLoading(false);
  }
};
```

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
Flask-CORS==4.0.0
python-dotenv==1.0.0
gunicorn==21.2.0
```

**Frontend (package.json) :**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.4.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
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

    # Dossier racine pour React (build)
    root /var/www/portfolio/frontend/build;
    index index.html;

    # Gestion des routes React (SPA)
    location / {
        try_files $uri $uri/ /index.html;
        expires 1h;
        add_header Cache-Control "public, must-revalidate, proxy-revalidate";
    }

    # Fichiers statiques React avec cache long
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # API Flask - Proxy vers Gunicorn
    location /api/ {
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
        
        # Headers CORS pour API
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
        add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range";
    }

    # Logs
    access_log /var/log/nginx/portfolio.access.log;
    error_log /var/log/nginx/portfolio.error.log;

    # Limitation du taux de requêtes pour l'API
    location /api/contact {
        limit_req zone=contact burst=5 nodelay;
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
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

### Service systemd pour Gunicorn

Créez `/etc/systemd/system/portfolio-flask.service` :

```ini
[Unit]
Description=Gunicorn instance to serve Portfolio Flask API
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/portfolio/backend
Environment="PATH=/var/www/portfolio/backend/venv/bin"
EnvironmentFile=/var/www/portfolio/.env
ExecStart=/var/www/portfolio/backend/venv/bin/gunicorn -c /var/www/portfolio/gunicorn.conf.py wsgi:app
ExecReload=/bin/kill -s HUP $MAINPID
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
```

### Configuration Gunicorn (gunicorn.conf.py)

```python
bind = "127.0.0.1:5000"
workers = 4
worker_class = "sync"
worker_connections = 1000
max_requests = 1000
max_requests_jitter = 100
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

# 3. Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# 4. Frontend
cd ../frontend
npm install
npm run build

# 5. Configuration système
sudo cp nginx/portfolio.conf /etc/nginx/sites-available/portfolio
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo systemctl enable portfolio-flask
sudo systemctl start portfolio-flask
sudo nginx -t && sudo systemctl reload nginx
```

## Fonctionnalités

### Frontend React
- **Portfolio responsive** adapté à tous les écrans
- **Navigation fluide** entre les sections
- **Galerie de projets** avec filtres et animations
- **Formulaire de contact** avec validation
- **Animations CSS** et transitions
- **SEO optimisé**

### Backend Flask
- **API REST** pour le formulaire de contact
- **Envoi d'emails** avec Flask-Mail
- **Validation des données**
- **Gestion des erreurs**
- **CORS configuré** pour React
- **Logs structurés**

## Sécurité

### Protection CSRF et validation

```python
# backend/routes/contact.py
from flask import request, jsonify
import re

@app.route('/api/contact', methods=['POST'])
def send_contact():
    data = request.get_json()
    
    # Validation des données
    if not data or not all(k in data for k in ('name', 'email', 'message')):
        return jsonify({'error': 'Données manquantes'}), 400
    
    # Validation email
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_pattern, data['email']):
        return jsonify({'error': 'Email invalide'}), 400
    
    # Limitation de taille
    if len(data['message']) > 5000:
        return jsonify({'error': 'Message trop long'}), 400
    
    try:
        # Envoi de l'email
        send_email(data['name'], data['email'], data['message'])
        return jsonify({'message': 'Message envoyé avec succès'}), 200
    except Exception as e:
        app.logger.error(f'Erreur envoi email: {e}')
        return jsonify({'error': 'Erreur serveur'}), 500
```

### Variables d'environnement complètes

| Variable | Description | Exemple |
|----------|-------------|---------|
| `FLASK_SECRET_KEY` | Clé secrète Flask | `your-super-secret-key-here` |
| `FLASK_ENV` | Environnement Flask | `production` |
| `MAIL_USERNAME` | Email expéditeur | `votre.email@gmail.com` |
| `MAIL_PASSWORD` | Mot de passe d'application | `abcd efgh ijkl mnop` |
| `MAIL_SERVER` | Serveur SMTP | `smtp.gmail.com` |
| `MAIL_PORT` | Port SMTP | `587` |
| `MAIL_USE_TLS` | Activation TLS | `True` |
| `API_BASE_URL` | URL de base API | `https://votre-domaine.com/api` |

## Scripts utiles

### Package.json (scripts pour le développement)

```json
{
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd backend && source venv/bin/activate && python app.py",
    "dev:frontend": "cd frontend && npm start",
    "build": "cd frontend && npm run build",
    "deploy": "npm run build && rsync -av frontend/build/ user@server:/var/www/portfolio/frontend/build/"
  },
  "devDependencies": {
    "concurrently": "^8.2.0"
  }
}
```

## Monitoring et Logs

### Logs d'application Flask

```python
import logging
from logging.handlers import RotatingFileHandler
import os

if not app.debug:
    if not os.path.exists('logs'):
        os.mkdir('logs')
    
    file_handler = RotatingFileHandler('logs/portfolio.log', maxBytes=10240, backupCount=10)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    ))
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.INFO)
    app.logger.info('Portfolio startup')
```

### Commandes de monitoring

```bash
# Statut des services
sudo systemctl status portfolio-flask
sudo systemctl status nginx

# Logs en temps réel
sudo journalctl -u portfolio-flask -f
sudo tail -f /var/log/nginx/portfolio.access.log
sudo tail -f /var/log/nginx/portfolio.error.log

# Redémarrage
sudo systemctl restart portfolio-flask
sudo systemctl reload nginx
```

## Dépannage

### Problèmes courants

**Erreur CORS lors des appels API**
- Vérifiez la configuration Flask-CORS
- Assurez-vous que l'URL de l'API est correcte

**Build React ne fonctionne pas**
- Vérifiez les variables d'environnement React (`REACT_APP_*`)
- Nettoyez le cache : `npm run build -- --reset-cache`

**Emails non envoyés**
- Vérifiez les credentials Gmail
- Consultez les logs Flask : `sudo journalctl -u portfolio-flask`

**Erreur 502 Bad Gateway**
- Vérifiez que Gunicorn écoute sur le bon port
- Vérifiez la configuration Nginx

## Performance

### Optimisations React
- Code splitting avec React.lazy()
- Images optimisées avec WebP
- Service Worker pour le cache
- Bundle analysis avec webpack-bundle-analyzer

### Optimisations Backend
- Mise en cache des réponses API
- Compression gzip activée
- Pool de connexions pour la base de données (si applicable)

## Contribution

Les contributions sont les bienvenues ! Processus :

1. Fork le projet
2. Créez une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

### Standards de code
- **React** : ESLint + Prettier
- **Python** : PEP 8 avec Black formatter
- **Tests** : Jest (frontend) + pytest (backend)

## License

Ce projet est sous licence Apache-2.0. Voir le fichier `LICENSE` pour plus de détails.

## Support

Pour toute question ou problème :

- **Email** : [gwen.henry56@gmail.com](mailto:gwen.henry56@gmail.com)
- **Issues** : [GitHub Issues](https://github.com/dadal560/portfolio-react/issues)

---

⭐ **N'oubliez pas de star le projet s'il vous a été utile !**
