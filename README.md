# Application de Coaching Personnel – Projet Full-Stack MERN

## Description du projet

Ce projet est une application web MERN permettant à une coach de vie d'offrir des services en ligne.  
L’utilisateur peut :

- Créer un compte et se connecter
- Accéder aux offres de coaching
- Consulter les informations présentées dans les pages (Accueil, Offres, etc.)
- Réserver une séance de coaching en ligne
- Recevoir automatiquement un courriel de confirmation après la réservation

Le but du projet était de mettre en œuvre les compétences acquises dans le cadre du cours **Projet Intégrateur — Application Web Full-Stack (MERN)** :contentReference[oaicite:1]{index=1} :
- Construction d’une API REST sécurisée (Express + MongoDB)
- Intégration frontend en React
- Gestion de l’authentification (JWT)
- Collaboration Git/GitHub en équipe
- Déploiement en production 



## 📌 Instructions d'installation

### 1️⃣ Cloner le dépôt
```bash
git clone https://github.com/ourymali966-ui/application_mern.git

# Installation des dépendances
Backend
cd backend
npm install

Frontend
cd ../frontend
npm install

# Configuration du fichier .env (backend)

Créer un fichier .env dans backend/ contenant :

PORT=5000
MONGO_URI=<votre_url_mongodb>
JWT_SECRET=<secret_jwt>

# SMTP pour l'envoi des emails
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<compte_google>
SMTP_PASS=<mot_de_passe_application_google>
EMAIL_FROM="Chelsea (Coach de vie)" <adresse_email>

###  Lancer l'application en local

pour  Lancer le backend (API Node/Express)

cd backend
npm install   

Pour Lancer le frontend (React)

cd frontend
npm start       # Lancer l'application React

Technologies utilisées
pour le  Backend nous avons utilisées: Node.js, Express.js. MongoDB + Mongoose, JWT, Bcrypt et Nodemailer.
 
Pour le Frontend nous avons utilisées: React.js,  React Router, Axios, CSS/Tailwind

Les outils utilisées sont: Git & GitHub, Vs Code, MongoDB Atlas, Postman (tests API)


 Répartition des tâches dans l’équipe:

Fatoumata

Responsable du Front-End

Développement des pages : Accueil, Offres, Contenus, Détails, Login, Register

Intégration avec React Router

Gestion des appels API via Axios

Création de l’interface utilisateur et design

Responsivité et structure visuelle

Gestion des états et interactions utilisateur

Contribution principale : Frontend complet

Mamadou Oury

Travail initial sur le Backend

Installation et configuration initiale d’Express

Mise en place des premières routes (authentification, contenus)

Connexion MongoDB et création des premiers modèles

Organisation de la structure backend

Ajustements front-end sur certaines pages (notamment Offres)

Contribution principale : Structure backend + routes initiales + pages frontend

 Yvanelle

Responsable des ajouts majeurs sur le backend

Création du système de réservations :

Route POST /api/reservations

Contrôleur reservation.controller.js

Validation et traitement des données envoyées par le frontend

Mise en place de l’envoi automatique de courriels avec Nodemailer

Configuration SMTP + variables d'environnement

Mise à jour de server.js pour intégrer les nouvelles routes

Tests Postman

Documentation (README.md)

Contribution principale : Finalisation backend + système réservation + Documentation + envoi d’emails

# Respect des exigences du projet

 Notre application respecte les éléments suivants :

Architecture MVC simplifiée ,  API REST sécurisée avec JWT, Minimum 2 collections MongoDB,  CRUD (authentification + réservation), React Router pour la navigation, Gestion des formulaires côté frontend
 Collaboration Git/GitHub avec une branche par membre,  Présentation du travail de chaque membre

Déploiement en production prévu :

Frontend → Netlify

Backend → Render / Railway

Base de données → MongoDB Atlas

#Conclusion

Ce projet a permis aux membres de l’équipe :

de développer une application MERN complète

de collaborer efficacement via GitHub

d’intégrer une API, une interface React et une BD MongoDB

de respecter les exigences académiques du projet intégrateur