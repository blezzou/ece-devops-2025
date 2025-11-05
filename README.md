# Lab 5 - Continuous Integration & Continuous Delivery (CI/CD)

# Lab - Continuous Integration & Continuous Delivery (CI/CD)

## Description

Ce projet met en œuvre l'intégration continue (CI) et la livraison continue (CD) pour une application Node.js. L'intégration continue utilise **GitHub Actions** pour automatiser les tests et la vérification de code, tandis que la livraison continue déploie l'application sur **Render**. Ce processus permet de tester, valider et déployer automatiquement les modifications du code à chaque mise à jour du projet.

Le projet comprend deux parties principales :

1. **Intégration continue avec GitHub Actions** : Mise en place d'un workflow GitHub Actions pour automatiser les tests de l'application.
2. **Livraison continue avec Render** : Déploiement automatique de l'application sur la plateforme Render, tout en s'assurant que l'application fonctionne correctement après chaque modification.

Version : 1.0.0  
Date : 05/11/2025

## Technologies utilisées

- **Node.js** : Environnement d'exécution JavaScript côté serveur
- **GitHub Actions** : Outil d'intégration continue pour automatiser les tests et les déploiements
- **Render** : Plateforme de déploiement pour héberger l'application Web
- **Redis** : Base de données en mémoire utilisée dans le cadre de l'intégration continue
- **Express.js** : Framework Node.js pour la création d'API REST (dépendance pré-existante du projet)

## Prérequis

Avant de commencer à configurer CI/CD, assurez-vous d'avoir :

1. Un dépôt GitHub contenant le projet de l'API utilisateur.
2. Un compte Render pour le déploiement de l'application.
3. La configuration des services Redis dans GitHub Actions et Render (une carte de crédit peut être nécessaire sur Render pour certains services).

## Installation

### 1. Initialisation du projet

Si le projet n'est pas encore configuré sur GitHub, voici les étapes à suivre pour initialiser le dépôt local et pousser le code sur GitHub :

1. **Créer un dépôt Git local** :
   ```bash
   git init

2. **Ajouter les fichiers du projet** :

    git add .
    git commit -m "Initial commit"


3. **Créer un dépôt distant sur GitHub et le lier à votre projet local** :

    git remote add origin <url_du_dépôt_github>
    git push -u origin master


### 2. Installation des dépendances, démarrage et tests

npm install

npm start

npm test


## Partie 1 : Intégration Continue avec GitHub Actions

### 1. Configuration du Workflow GitHub Actions

Le fichier de configuration pour GitHub Actions est situé dans `.github/workflows/ci.yml`. Ce fichier définit le workflow d'intégration continue pour le projet, qui comprend les étapes suivantes :

- Installation des dépendances
- Lancement des tests
- Vérification de l'intégration avec Redis (si utilisé)

### 2. Amélioration du Workflow avec Redis

Le workflow inclut un service Redis simulé à l'aide des "service containers" de GitHub Actions. Cette configuration permet à l'application Node.js de se connecter à Redis pendant les tests, ce qui est essentiel pour valider l'intégration correcte avec la base de données en mémoire.

### 3. Pull Request et Validation

Après avoir créé une nouvelle branche, vous pouvez faire une pull request vers la branche principale pour que GitHub Actions exécute les tests et vérifie les modifications avant de fusionner la branche.

- Créer une nouvelle branche :
git checkout -b <nom_de_branche>

- Effectuer une modification du code et valider les changements :
git commit -am "Modification du code"
git push origin <nom_de_branche>

### 3. Vérification du Workflow sur GitHub

Une fois la Pull Request créée, allez dans l'onglet "Actions" de GitHub pour observer l'exécution du workflow. Vous pouvez consulter les logs pour vérifier si des erreurs surviennent durant les tests ou la connexion à Redis.


## Partie 2 : Livraison Continue avec Render

### 1. Création de l'application sur Render

Créez une application Web sur Render en suivant les étapes de la documentation.
Synchronisez l'application avec le dépôt GitHub contenant votre projet.
Sélectionnez la région Frankfurt (EU Central) pour l'hébergement et choisissez l'option For Hobby Projects pour le type d'instance.
Configurez les commandes suivantes :
Root directory : modules/04.continuous-testing/lab-corrections
Build Command : npm build
Start Command : npm start

### 2. Déploiement et tests

Le processus de déploiement automatique se déclenchera à chaque fois qu'une nouvelle modification sera poussée sur le dépôt GitHub. Vous pouvez tester l'application sur votre domaine public fourni par Render.

## Auteur
**Ismail CHERCHAR | ADAM BOUCHIBA | NICOLAS PELLERIN**  