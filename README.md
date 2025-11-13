# Lab 8 - CONTAINER ORCHESTRATION

## Introduction

Nous allons commencer par rappeler simplement les différents outils et expliquer le lexique utile pour le lab.

**Image Docker** : nous pouvons faire la comparaison avec une recette de cuisine (liste d’ingrédients + instructions) qui décrit exactement comment préparer un plat. Une image contient tout ce qu’il faut pour exécuter une application (système de fichiers minimal, bibliothèques, code).

**Conteneur** : on suit la recette et que tu cuisines, on obtient un plat prêt à servir. Un conteneur est l’exécution de l’image : c’est le plat qui tourne. Il est isolé (comme un bocal hermétique) et fonctionne de façon identique sur n’importe quelle machine qui comprend Docker.

Avec ceci, pas besoin d’installer manuellement tous les logiciels sur une machine : l’image embarque l’intégralité.

**Kubernetes** : il joue le rôle de chef d’orchestre pour les conteneurs. Si Docker gère des plats individuels (conteneurs), Kubernetes gère le grand restaurant (des centaines de plats) : il organise qui cuisine, s’assure qu’il y a assez de portions, et distribue les plats aux clients.

Voici quelques concepts clés :

- **Pod** : un ou plusieurs conteneurs qui tournent ensemble (comme une assiette avec un plat dedans).
- **Deployment** : une demande pour dire « je veux N assiettes ».
- **Service** : une porte d’entrée stable pour accéder à une application, même si les assiettes (pods) changent d’adresse (IP).
- **Scaling** : augmenter ou diminuer le nombre d’assiettes (pods) pour supporter plus ou moins de clients.

**Minikube** : c’est un mini-restaurant local que l’on peut lancer sur sa machine pour apprendre Kubernetes. Il simule un cluster (ensemble de machines Kubernetes) sur son PC en utilisant une VM ou des conteneurs.

Avant de démarrer le TP, il est important de comprendre pourquoi ces outils existent. Aujourd’hui, les applications ne tournent plus sur une seule machine : elles sont réparties sur plusieurs serveurs pour être plus rapides et plus fiables. Gérer manuellement toutes ces machines serait comme devoir surveiller des dizaines de casseroles sur le feu en même temps. C’est là que Kubernetes intervient, il automatise le lancement, la mise à jour et la surveillance de centaines de conteneurs. Minikube est la version “maison” de Kubernetes : on peut l’utiliser sur son propre ordinateur pour apprendre sans avoir besoin d’un vrai serveur.

## 1. Mise en place de Minikube

Après avoir installé Minikube depuis le site [https://minikube.sigs.k8s.io/docs/](https://minikube.sigs.k8s.io/docs/), on démarre Minikube avec la commande :

```bash
minikube start
```

Cela lance un petit cluster local (un nœud) sur ta machine. On peut vérifier le statut du cluster avec la commande :

```bash
minikube status
```

Voici ce qu’on est censé avoir :

Si tous les éléments (host, kubelet, apiserver, etc.) sont indiqués comme “Running”, cela signifie que notre mini-cluster est bien démarré et prêt à recevoir des déploiements.

Minikube peut être vu comme un petit “centre de test” dans lequel on va lancer nos conteneurs sans risquer de perturber notre machine principale.

## 2. Utilisation des commandes kubectl

Maintenant, créons un Deployment (une application) avec la commande :

```bash
kubectl create deployment kubernetes-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1
```

Cette commande crée une ressource nommée kubernetes-bootcamp qui démarrera un pod contenant l’image gcr.io/google-samples/kubernetes-bootcamp:v1. Elle demande à Kubernetes de créer une "recette de déploiement" (Deployment). Kubernetes sait maintenant comment lancer et surveiller cette application à partir d’une image Docker.

Ensuite, vérifions les pods avec la commande :

```bash
kubectl get pods
```

Les pods sont les unités de base dans Kubernetes. Chaque pod correspond à un ou plusieurs conteneurs qui tournent ensemble et partagent les mêmes ressources.

Ici, il faut attendre que le Pod atteigne le « 1/1 » et on viendra ensuite enregistrer le nom du Pod. Par exemple : kubernetes-bootcamp-658f6cbd58-cwxc4.

Nous allons ensuite inspecter les logs avec :

```bash
kubectl logs $POD_NAME
```
(Remplacez $POD_NAME par le nom du pod, ici kubernetes-bootcamp-658f6cbd58-cwxc4).

Exécutons une commande dans le pod pour lire le fichier /etc/os-release :

```bash
kubectl exec kubernetes-bootcamp-658f6cbd58-cwxc4 -- cat /etc/os-release
```

Nous allons ensuite ouvrir un shell pour interagir directement avec l’application :

```bash
kubectl exec -it kubernetes-bootcamp-658f6cbd58-cwxc4 -- bash
```

Dans ce shell, exécutons plusieurs commandes pour répertorier le contenu du répertoire dans lequel on se trouve et tester l'application web à l’intérieur du conteneur :

```bash
ls
cat server.js
curl localhost:8080
```

La première commande liste les fichiers et dossiers du répertoire courant. La deuxième affiche le contenu du fichier server.js, et la troisième commande fait un appel curl pour vérifier si l’application répond à l’intérieur du pod. Cependant, cette application n’est pas encore visible depuis l’extérieur : pour l’instant, elle tourne uniquement dans le “monde privé” du cluster Kubernetes.

Pour quitter le shell, il suffit d’exécuter la commande exit:

Pour l’instant, on ne peut pas encore y accéder depuis l’extérieur car le pod est exposé uniquement dans le réseau interne de Kubernetes.

## 3. Apprendre à exposer un service Kubernetes à l'extérieur

Maintenant, exposons notre application au navigateur.

Dans Kubernetes, pour qu’un utilisateur ou un navigateur puisse accéder à une application, il faut créer un objet appelé Service. Ce Service redirige les demandes du monde extérieur vers les bons pods à l’intérieur du cluster. Sans ce Service, même si nos pods tournent parfaitement, personne ne pourrait y accéder depuis l’extérieur.

Nous allons créer un service qui expose notre application sur le port 8080 :

```bash
kubectl expose deployment kubernetes-bootcamp --type=NodePort --port=8080
```

Pour vérifier sur quel port le service a été attaché, utilise la commande suivante :

```bash
kubectl get services
```

Comme l’on utilise le Docker driver dans Minikube, on doit créer un tunnel vers le nœud du cluster (qui s'exécute en tant que conteneur Docker). Et cela en exécutant la commande :

```bash
minikube service kubernetes-bootcamp
```
Cette commande ouvre un tunnel temporaire entre ton hôte et le service exposé et lance automatiquement son navigateur vers l’URL correcte.

## 4. Apprendre à augmenter et réduire la taille d'un déploiement Kubernetes

Maintenant nous allons voir comment augmenter et réduire le nombre de Pods. 
Le “scaling” (changement d’échelle) est une des forces majeures de Kubernetes.
Dans une entreprise, si un site web reçoit soudainement beaucoup de visiteurs, il faut pouvoir augmenter rapidement le nombre d’instances qui tournent pour absorber la charge.
Kubernetes le fait très simplement : il suffit d’une seule commande pour multiplier ou réduire le nombre de pods.
Pour commencer on augmente le déploiement à un total de 5 pods avec la commande :

```bash
kubectl scale deployments/kubernetes-bootcamp --replicas=5
```

Pour vérifier si le « scaling » a fonctionné on utiliser la commande :

```bash
kubectl get pods
```

On voit bien ici que nous avons maintenant 5 Pods qui tourne actuellement. Nous allons maintenant constater l’augmentation de la taille du déploiement en exposant l’application au navigateur et en rafraîchissant la page. Ce qui doit se passer c’est qu’on doit avoir les différents nom qui apparaissent sur le navigateur au fur et à mesure que nous rafraîchissons la page.

On observe que le nom du Pod affiché sur le navigateur change bien et corresponds à ceux ajouter après avoir augmenter la taille du déploiement.
Ce que l’on observe s’appel du load balancing (répartition de charge). Kubernetes répartit automatiquement les requêtes entre les différents pods disponibles, comme un serveur de restaurant qui distribue les commandes entre plusieurs cuisiniers.

Maintenant nous allons réduire la taille du déploiement en utilisant la même commande mais en mettant 2 en paramètre :

```bash
kubectl scale deployments/kubernetes-bootcamp --replicas=2
```

Nous allons afficher les pods avec la meme commande pour vérifier si la modification de la taille à fonctionne :

```bash
kubectl get pods
```

## 5. Exécutez une application à plusieurs pods dans Kubernetes.

Lorsqu’on fait tourner plusieurs pods, Kubernetes devient capable de mettre à jour une application sans interruption. Pour le démontrer, nous avons mis à jour l’image Docker utilisée par le déploiement.

Voici la commande à utiliser :

```bash
kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v2
```

Cette commande indique à Kubernetes de remplacer la version actuelle de l’application (v1) par la nouvelle (v2).

Dès l’exécution, la page du navigateur se met à jour automatiquement, car Kubernetes remplace les anciens pods un par un : c’est ce qu’on appelle un rolling update.
Cela permet de ne jamais couper le service.
Pendant que de nouveaux pods (v2) démarrent, les anciens (v1) sont encore actifs. Une fois que les nouveaux sont prêts, les anciens sont arrêtés.

On répète l’opération avec la version suivante :

```bash
kubectl set image deployments/kubernetes-bootcamp kubernetes-bootcamp=jocatalin/kubernetes-bootcamp:v3
```

On observe que certains pods sont en train de se créer tandis que d’autres disparaissent : Kubernetes gère la transition de manière fluide.

Si une mise à jour pose problème (par exemple une erreur dans la nouvelle version), on peut revenir facilement à la version précédente avec :

```bash
kubectl rollout undo deployments/kubernetes-bootcamp
```

Cette commande annule le dernier déploiement et restaure la version précédente — un peu comme un “Ctrl+Z” pour les applications.

## 6. Exécutez une application à plusieurs pods dans Kubernetes.

Jusqu’à présent, nous avons tout fait avec des commandes dans le terminal.
Mais dans un vrai projet, il est préférable d’automatiser les déploiements grâce à des fichiers appelés manifestes YAML.
Ces fichiers décrivent précisément comment doit être déployée l’application, comme une recette complète que Kubernetes peut suivre automatiquement.

D’abord, on nettoie le cluster avec les commandes :

```bash
kubectl delete service kubernetes-bootcamp
kubectl delete deployment kubernetes-bootcamp
```

On lit le fichier avec kubernetes : 

```bash
kubectl apply -f deployment.yaml
```

On crée ensuite un fichier service.yaml pour exposer l’application et on lit également le fichier :

```bash
kubectl apply -f service.yaml
```

Et après on vérifie le bon fonctionnement avec la commande :

```bash
minikube service kubernetes-bootcamp
```

Cela ouvre directement l’application dans le navigateur.
Enfin, pour tester le scaling à partir du YAML, on modifie replicas: 1 en replicas: 3 puis :

```bash
kubectl apply -f deployment.yaml
```

En rafraîchissant la page (CTRL+F5), on remarque que le nom du pod change à chaque fois, preuve que plusieurs répliques répondent à tour de rôle.

## Conclusion

Ce TP nous a permis de comprendre en pratique le fonctionnement de Kubernetes et de ses outils associés.
Nous avons appris à :
Créer et gérer des pods,
Exposer des services,
Faire du scaling et des mises à jour sans interruption,
Et enfin, automatiser nos déploiements grâce à des fichiers YAML.

Kubernetes nous montre ici sa puissance : il permet d’administrer des applications complexes de manière fiable, comme un chef d’orchestre coordonne plusieurs musiciens pour jouer une même symphonie sans fausse note.


## Auteur
**Ismail CHERCHAR | ADAM BOUCHIBA | NICOLAS PELLERIN**  
