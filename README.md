# Lab 6 - Instructure as code

## Description

Ce laboratoire vous permettra de découvrir l'Infrastructure as Code (IaC) en utilisant Vagrant et Ansible pour la gestion de machines virtuelles et le déploiement d'applications. Vous apprendrez à provisionner des machines virtuelles à l'aide de méthodes impératives et déclaratives, puis à configurer un serveur GitLab et à effectuer un contrôle de santé sur ce dernier.

Le projet comprend deux parties principales :

1. **Approche impérative - Utilisation de Vagrant avec le provisionneur Shell.**
2. **Approche déclarative - Installation de GitLab avec Vagrant et le provisionneur Ansible / Configuration d’un contrôle de santé pour GitLab.**

## Technologies utilisées

- **VirtualBox** : Pour la gestion des machines virtuelles
- **Vagrant** : outil pour gérer les environnements virtuels

## Prérequis

Avant de commencer à configurer CI/CD, assurez-vous d'avoir :

1. Un dépôt GitHub contenant le projet de l'API utilisateur.
2. Un compte Render pour le déploiement de l'application.
3. La configuration des services Redis dans GitHub Actions et Render (une carte de crédit peut être nécessaire sur Render pour certains services).


## Partie 1 : Approche impérative - Utilisation de Vagrant avec Shell Provisioner / Configuration d'un contrôle de santé pour GitLab

### 1. Préparer l'environnement virtuel

Accédez au dossier part-1 et examinez le fichier Vagrantfile

### 2. Créer et démarrer une machine virtuelle (VM)

Pour créer la VM et la démarrer, exécutez la commande suivante :
vagrant up

Vous pouvez également utiliser les commandes suivantes pour gérer la VM :
- Vérifier l'état des VMs
vagrant status

- Arrêter la VM
vagrant halt

- Détruire la VM
vagrant destroy

### 3. Connexion SSH à la VM

Pour vous connecter à la VM via SSH, exécutez la commande :
vagrant ssh

Cela vous donnera un accès terminal à la machine virtuelle, où vous pourrez exécuter des commandes Linux.

### 4. Configuration via le Shell Provisioner

Dans le fichier Vagrantfile, vous pouvez ajouter des scripts pour automatiser certaines configurations.

## Partie 2 : Approche déclarative - Installation de GitLab avec Vagrant et Ansible

Dans cette partie, nous allons utiliser Ansible pour installer GitLab sur une machine virtuelle.

### 1. Préparer l'environnement virtuel

Accédez au dossier part-2 et examinez le fichier Vagrantfile et les playbooks Ansible
Le dossier playbooks contient les playbooks Ansible nécessaires pour l'installation de GitLab.

### 2. Créer et provisionner la VM

Exécutez la commande suivante pour démarrer la machine virtuelle et lancer le provisioning :
vagrant up

### 3. Tester l'installation de GitLab

Après le provisioning, ouvrez un navigateur et accédez à l'URL pour vérifier que GitLab est correctement installé

### 4. Exécuter un contrôle de santé avec curl

Connectez-vous à la VM avec SSH et exécutez la commande pour vérifier l'état de GitLab :
curl http://[...]-/health

### 5. Lire les tâches de contrôle de santé dans Ansible

Examinez le fichier lab/part-2/playbooks/roles/gitlab/healthchecks/tasks/main.yml pour voir comment les contrôles de santé sont configurés dans Ansible.

### 6. Exécuter le rôle gitlab/healthcheck

Exécutez les playbooks Ansible pour lancer les contrôles de santé, en remplaçant TAG par le tag approprié :
ansible-playbook /vagrant/playbooks/run.yml --tags TAG -i /tmp/vagrant-ansible/inventory/vagrant_ansible_local_inventory


## Auteur
**Ismail CHERCHAR | ADAM BOUCHIBA | NICOLAS PELLERIN**  
