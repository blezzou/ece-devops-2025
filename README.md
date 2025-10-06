# Lab 4 - User API

## Description
Ce projet implémente une API REST simple pour gérer les utilisateurs.  
Il permet de récupérer un utilisateur par son nom d’utilisateur (`GET /user/:username`) et utilise **Test-Driven Development (TDD)** avec des tests unitaires et des tests API.  
Le projet inclut également **Swagger UI** pour la documentation des endpoints.

## Auteur
**Ismail CHERCHAR | ADAM BOUCHIBA | NICOLAS PELLERIN**  
Version : 1.0.0  
Date : 30/09/2025

## Technologies utilisées
- Node.js  
- Express.js  
- Jest (tests unitaires et API)  
- Supertest (tests API)  
- Swagger UI (`express-swagger-generator`)  
- Base de données simulée en mémoire

## Installation


Installer les dépendances

npm install


Lancer le serveur

npm start


Lancer les tests

npm test

Endpoints
GET /user/:username

Récupère un utilisateur par son nom d’utilisateur.

Paramètres :

username (string) : nom de l’utilisateur

Réponses :

200 OK : retourne l’objet utilisateur

{
  "username": "ismail",
  "email": "ismail@edu.ece.fr"
}


404 Not Found : utilisateur introuvable

{
  "error": "Utilisateur introuvable"
}

Swagger UI

Swagger est disponible à l’adresse :

http://localhost:3000/api-docs/


Permet de visualiser et tester tous les endpoints de l’API.

Structure du projet
Lab4/
├─ index.js               # Point d'entrée
├─ package.json
├─ src/
│  ├─ app.js             # Configuration Express
│  ├─ server.js          # Lancement du serveur + Swagger
│  ├─ db.js              # Base de données simulée
│  ├─ handlers/
│  │  └─ user.js         # Logique métier utilisateur
│  └─ paths/
│     └─ user.js         # Routes utilisateur
└─ test/
   ├─ user.handlers.test.js  # Tests unitaires
   └─ user.paths.test.js     # Tests API

Tests

Unitaires : npm test → vérifie le fonctionnement du handler getUser

API : npm test → vérifie les endpoints /user/:username

Remarques

L’API utilise une base de données en mémoire, pas de persistance réelle.

Swagger UI est intégré pour documenter et tester l’API facilement.


Tu peux copier-coller directement dans ton fichier `README.md`.  

Si tu veux, je peux te créer **une version encore plus concise et professionn
