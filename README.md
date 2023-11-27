## Application Météo

Bienvenue dans 'Weather Forecast App' ! Cette application utilise l'API OpenWeatherMap pour afficher les prévisions météorologiques des 15 prochains jours pour une ville donnée.

# Installation

1. Installez les dépendances `npm install`

2. Configuration de la clé API :
L'application utilise une clé API OpenWeatherMap pour accéder aux données météorologiques. Vous devez configurer cette clé avant de lancer l'application.
- Récupérez votre clé API OpenWeatherMap en vous inscrivant sur leur site.
- Créez un fichier .env à la racine du projet et ajoutez votre clé API : `REACT_APP_API_KEY=votre_clé_api`

# serveur de développement 

- Pour lancer le serveur de développement : `npm start`
L'application sera disponible à l'adresse http://localhost:3000 dans votre navigateur.

# déploiement du projet 

- Pour construire le projet en vue d'un déploiement : `npm run build`
Les fichiers construits seront dans le répertoire build/.