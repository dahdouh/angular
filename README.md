Le projet est déployé sur Heroku sur le lien : 
https://guarded-scrubland-09023.herokuapp.com/

==================================================================================

Application web e-commerce reposant sur l’architecture MEAN (MongoDB, Express, Angular, NodeJs).



Côte serveur (backend)

Une base de donnees MongoDB contient cinq collections produits, users et paniers, categories. Un serveur Node.js utilisant le framework Express fournie tous les services web RESTful necessaires pour réponse aux demandes du client.

Côte client (fronend)


Le client :

1)	en mode "invite" (sans être connecte), presentation des differentes categories de produits (et de la liste alphabetique des produits) mais sans pouvoir les commander ;

2)	identification/connexion d’un utilisateur et déconnexion ;

3)	en mode "connecté", affichage des produits correspondant à une catégorie et via leur liste alphabétique (le client peut commander des produits).


4)	création d’un nouvel utilisateur ;

5)	gestion d’un panier :

•	ajout ou suppression d’un produit

•	modification de la quantité d’un produit déjà commande
•	validation de la commande : le panier est alors vide

6)	recherche de produits par n’importe quelle combinaison de critères (nom, catégorie, prix...).

==================================================================================
