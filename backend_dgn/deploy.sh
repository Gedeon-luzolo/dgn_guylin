#!/bin/bash

# Script de déploiement automatique
# Usage: ./deploy.sh

set -e  # Arrêter le script en cas d'erreur

echo "🚀 Début du déploiement..."



# Fonction pour afficher les messages colorés
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Étape 1: Pull depuis la branche preprod
log_info "Étape 1: Pull depuis origin/preprod..."
git pull origin preprod
if [ $? -eq 0 ]; then
    log_success "Pull réussi"
else
    log_error "Échec du pull"
    exit 1
fi

# Étape 2: Installer les dépendances du backend
log_info "Étape 2: Installation des dépendances backend..."
npm install
if [ $? -eq 0 ]; then
    log_success "Dépendances backend installées"
else
    log_error "Échec de l'installation des dépendances backend"
    exit 1
fi

# Étape 3: Aller dans le dossier frontend et installer les dépendances
log_info "Étape 3: Installation des dépendances frontend..."
cd ../frontend_app
pnpm install
if [ $? -eq 0 ]; then
    log_success "Dépendances frontend installées"
else
    log_error "Échec de l'installation des dépendances frontend"
    exit 1
fi

# Étape 4: Build du frontend
log_info "Étape 4: Build du frontend..."
pnpm run build
if [ $? -eq 0 ]; then
    log_success "Build frontend réussi"
else
    log_error "Échec du build frontend"
    exit 1
fi

# Étape 5: Retourner au backend et build
log_info "Étape 5: Build du backend..."
cd ../backend_dgn
npm run build
if [ $? -eq 0 ]; then
    log_success "Build backend réussi"
else
    log_error "Échec du build backend"
    exit 1
fi

# Étape 6: Redémarrer PM2
log_info "Étape 6: Redémarrage de PM2..."
pm2 restart backend_dgn
if [ $? -eq 0 ]; then
    log_success "PM2 redémarré avec succès"
else
    log_warning "PM2 n'est pas installé ou l'application n'existe pas"
    log_info "Tentative de démarrage avec PM2..."
    pm2 start dist/main.js --name backend_dgn
    if [ $? -eq 0 ]; then
        log_success "Application démarrée avec PM2"
    else
        log_error "Échec du démarrage PM2"
        exit 1
    fi
fi

# Étape 7: Vérifier le statut
log_info "Étape 7: Vérification du statut..."
pm2 status
pm2 logs backend_dgn --lines 10

log_success "🎉 Déploiement terminé avec succès!"
log_info "L'application devrait être accessible sur le port configuré" 