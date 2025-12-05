Projet MERN – Plateforme de Réservation et Gestion de Contenus

Ce projet est une application complète développée avec l’architecture MERN (MongoDB, Express.js, React, Node.js).
Il permet la gestion des utilisateurs, la consultation de contenus, les réservations en ligne et l’envoi automatique d’emails de confirmation.

1. Technologies utilisées
Backend

Node.js

Express.js

MongoDB + Mongoose

JWT (authentification sécurisée)

Bcrypt (hashing des mots de passe)

Nodemailer (envoi de courriels automatiques)

Frontend

React.js

React Router

Axios

TailwindCSS

Outils et environnement

Visual Studio Code

Git & GitHub

MongoDB Atlas

Postman (tests API)

2. Fonctionnalités principales
Côté Backend

Authentification (inscription, connexion, token JWT)

Gestion des contenus (selon les besoins du projet)

Système de réservation :

Enregistrement d’une réservation

Validation des données

Envoi d’un email automatique à l’utilisateur

Architecture REST structurée

Séparation contrôleurs / routes / modèles

Côté Frontend

Pages : Accueil, Contenus, Détails, Login, Register

Interface React complète

Navigation avec React Router

Appels API via Axios

Formulaires avec validation

Interface responsive (mobile et desktop)

Affichage des données provenant du backend

3. Répartition des tâches de l’équipe
Fatoumata — Responsable Frontend

Développement des pages principales : Accueil, Contenus, Détails, Login, Register

Intégration de React Router

Gestion des appels API Axios

Conception et intégration UI/UX

Gestion des états et interactions utilisateurs

Contribution principale : Frontend complet

Mamadou Oury — Backend & Intégration

Mise en place de la structure initiale du backend

Configuration d’Express

Création des premières routes d’authentification et de contenus

Connexion à MongoDB et création des premiers modèles

Ajustements sur certaines pages Frontend

Contribution principale : Structure backend + routes initiales

Yvanelle — Développeuse Backend principale

Développement de la page Offres et logique associée

Création du système de réservations (routes + contrôleur)

Intégration complète de Nodemailer

Configuration des variables d’environnement

Tests via Postman

Rédaction du README

Contribution principale : Réservations + emails + documentation

4. Structure du projet
/project
│── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── config
│   ├── server.js
│   └── .env.example
│
│── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── services
│   │   └── App.jsx
│   └── package.json
│
└── README.md

5. Installation et exécution
5.1 Cloner le projet
git clone <URL_DU_DEPOT>
cd project

5.2 Installation Backend
cd backend
npm install


Créer un fichier .env :

MONGO_URI=...
JWT_SECRET=...
SMTP_USER=...
SMTP_PASS=...


Démarrer le serveur :

npm start

5.3 Installation Frontend
cd frontend
npm install
npm start


L’application sera accessible sur :
http://localhost:3000

6. Déploiement prévu
Service	Plateforme
Frontend	Netlify
Backend	Render / Railway
Base de données	MongoDB Atlas
7. Tests API

Les routes peuvent être testées avec Postman :

POST /api/auth/register

POST /api/auth/login

POST /api/reservations

GET /api/contenus

Un fichier de collection Postman peut être ajouté selon les besoins.

8. Conclusion

Ce projet a permis à l’équipe de développer une application MERN complète, fonctionnelle et sécurisée.
La collaboration via GitHub, la gestion des branches, l’intégration Backend–Frontend et l’utilisation des outils professionnels ont permis de répondre à toutes les exigences du projet intégrateur.