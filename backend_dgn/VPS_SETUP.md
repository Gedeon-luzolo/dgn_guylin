# Guide Complet : Configuration VPS et Déploiement

## 📋 Prérequis VPS

### 1. Connexion SSH
```bash
ssh root@votre-ip-vps
```

### 2. Mise à jour du système
```bash
apt update && apt upgrade -y
```

### 3. Installation des dépendances
```bash
# Node.js et npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Git
apt install git -y

# PM2 (gestionnaire de processus)
npm install -g pm2

# Nginx (serveur web)
apt install nginx -y

# Certbot (SSL)
apt install certbot python3-certbot-nginx -y
```

## 📁 Structure du Projet

### 4. Création de la structure
```bash
# Créer le dossier principal
mkdir -p /var/www/dgn
cd /var/www/dgn

# Cloner votre repository
git clone https://github.com/votre-username/votre-repo.git .

# Ou si vous avez déjà le code
# Copier vos fichiers backend_dgn et frontend_app
```

### 5. Configuration des permissions
```bash
# Donner les bonnes permissions
chown -R www-data:www-data /var/www/dgn
chmod -R 755 /var/www/dgn
```

## 🔧 Configuration Backend

### 6. Configuration environnement
```bash
cd /var/www/dgn/backend_dgn

# Créer le fichier .env
nano .env
```

**Contenu du fichier .env :**
```env
# Base de données
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=votre_user
DB_PASSWORD=votre_password
DB_NAME=dgn_database

# Serveur
PORT=3000
NODE_ENV=production

# Autres configurations
JWT_SECRET=votre_secret_jwt
```

### 7. Installation et build backend
```bash
# Installer les dépendances
npm install

# Build du backend
npm run build
```

## 🎨 Configuration Frontend

### 8. Build frontend
```bash
cd /var/www/dgn/frontend_app

# Installer les dépendances
npm install

# Build du frontend
npm run build
```

## 🚀 Configuration PM2

### 9. Démarrage avec PM2
```bash
cd /var/www/dgn/backend_dgn

# Démarrer l'application
pm2 start dist/main.js --name backend_dgn

# Sauvegarder la configuration
pm2 save

# Configurer le démarrage automatique
pm2 startup
```

## 🌐 Configuration Nginx

### 10. Configuration Nginx
```bash
# Créer le fichier de configuration
nano /etc/nginx/sites-available/dgn
```

**Contenu du fichier :**
```nginx
server {
    listen 80;
    server_name votre-domaine.com www.votre-domaine.com;

    # Redirection vers HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name votre-domaine.com www.votre-domaine.com;

    # Certificat SSL (sera généré par Certbot)
    ssl_certificate /etc/letsencrypt/live/votre-domaine.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/votre-domaine.com/privkey.pem;

    # Configuration SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Headers de sécurité
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";

    # Proxy vers l'application Node.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Cache pour les assets statiques
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 11. Activer le site
```bash
# Créer un lien symbolique
ln -s /etc/nginx/sites-available/dgn/etc/nginx/sites-enabled/

# Supprimer le site par défaut
rm /etc/nginx/sites-enabled/default




# Tester la configuration
nginx -t

# Redémarrer Nginx
systemctl restart nginx
```

## 🔒 Configuration SSL

### 12. Obtenir le certificat SSL
```bash
# Remplacer par votre domaine
certbot --nginx -d preprod.dgn-rdc.net -d www.preprod.dgn-rdc.net

# Renouvellement automatique
crontab -e
# Ajouter cette ligne :
# 0 12 * * * /usr/bin/certbot renew --quiet
```

## 🗄️ Configuration Base de Données

### 13. Installation PostgreSQL
```bash
# Installer PostgreSQL
apt install postgresql postgresql-contrib -y

# Démarrer le service
systemctl start postgresql
systemctl enable postgresql

# Accéder à PostgreSQL
sudo -u postgres psql
```

### 14. Configuration base de données
```sql
-- Créer l'utilisateur et la base de données
CREATE USER dgn_user WITH PASSWORD 'votre_password';
CREATE DATABASE dgn_database OWNER dgn_user;
GRANT ALL PRIVILEGES ON DATABASE dgn_database TO dgn_user;
\q
```

## 🔄 Script de Déploiement Automatique

### 15. Rendre le script exécutable
```bash
cd /var/www/dgn/backend_dgn
chmod +x deploy.sh
```

### 16. Test du déploiement
```bash
./deploy.sh
```
./deploy.sh
## 📊 Monitoring et Logs

### 17. Commandes utiles
```bash
# Statut PM2
pm2 status

# Logs en temps réel
pm2 logs backend_dgn

# Redémarrer l'application
pm2 restart backend_dgn

# Statut Nginx
systemctl status nginx

# Logs Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

## 🔧 Maintenance

### 18. Mise à jour automatique
```bash
# Créer un script de mise à jour
nano /var/www/dgn/update.sh
```

**Contenu du script de mise à jour :**
```bash
#!/bin/bash
cd /var/www/dgn
git pull origin main
cd backend_dgn && npm install && npm run build
cd ../frontend_app && npm install && npm run build
pm2 restart backend_dgn
```

### 19. Rendre exécutable
```bash
chmod +x /var/www/dgn/update.sh
```

## ✅ Vérification Finale

### 20. Tests
- ✅ Site accessible via HTTPS
- ✅ API fonctionnelle
- ✅ Images et assets chargés
- ✅ Base de données connectée
- ✅ PM2 en cours d'exécution
- ✅ Nginx configuré
- ✅ SSL actif

## 🚨 Sécurité

### 21. Firewall
```bash
# Installer UFW
apt install ufw -y

# Configurer le firewall
ufw allow ssh
ufw allow 'Nginx Full'
ufw enable
```

### 22. Mise à jour automatique
```bash
# Installer unattended-upgrades
apt install unattended-upgrades -y

# Configurer
dpkg-reconfigure -plow unattended-upgrades
```

## 📈 Performance

### 23. Optimisations
```bash
# Compression Gzip
echo 'gzip on;' >> /etc/nginx/nginx.conf
echo 'gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;' >> /etc/nginx/nginx.conf

# Redémarrer Nginx
systemctl restart nginx
```

Votre application est maintenant prête pour la production ! 🎉 