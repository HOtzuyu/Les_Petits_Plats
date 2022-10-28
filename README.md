# Développez un algorithme de recherche en JavaScript || Les petits plats
***
## introduction du sujet
***
Freelance missionné par l'entreprise “Les petits plats” en temps que Développeur Front-end pour une mission de 3 mois. 
Création d'une maquette coté front avec implémentation des fonctionnalités de recherches.
***
## Objectifs
***
Mise en place d'un algo pour filtrer les divers recettes sur le site.
***
1. [Bases](#Bases)
2. [Créations](#Creations)
3. [Logique](#Logiques)
***
### Bases
***
Les fichiers fournis : 
* recette.js _ les recettes tests
* Logo
***
### Creations
***
Mise en place des fichiers HTML, CSS et des JS manquant.
master = base de code
log1 = méthode filter
log2 = boucle for
#### Creation des cards
***
La création des cards de recette est mis en place dans RecetteCards-fact.js. Créé par intégration depuis le Js dans le HTML. 
S'adapte à chaque recette
***
#### Creation des tags
***
Les tags sont mis en place comme les cards dans un fichier JS tag.js qui permet d'adapter la couleur et le nom selon le click.
Le filtre se base sur le data-filtertype.
***
#### Autres fichiers
***
* filter.js : se charge de gérer les filtres des cards en se basan sur les tags
* cardRecette.js : ajoute les cards dans le html
* CreatLists.js : crée les listes de tag sélectionnable dans les bons filtres en évitant les répétitions
* search.js : écoute la barre de recherche principale
* script.js : lance les méthodes
* algo.js : OBJECTIF DU PROJET création de l'algo pour filtrer et trier les recherches
***
#### Fonctionnement de la logique
***
* L'utilisateur choisi un tag : 
Le fichier identifie le data-filtertype du tag créée et le mot sélectionné. Vérifie sa présence dans les recettes et affiche ceux qui ont cet élément dans le type choisi.
* L'utilisateur cherche sur la cearch-bar : 
A partir de 2 lettres, le systeme lance un filtre dans les titres, description ou ingredients dans recettes et affiche ceux qui ont l'élément. Si pas présent, un message d'erreur s'affiche.
***
## Conclusion
***
Le choix de la bonne méthode de boucle pour le filtre est la méthode FILTER