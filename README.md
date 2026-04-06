# Projet-fil-rouge du groupe 2

## Description du projet

Réalisation d'une application Web SPA (Single Page Application) de gestion de portfolio utilisant du Vanilla JavaScript.

### Fonctionnalités principales

- **Prototyper l'application** : Conception et développement d'une interface utilisateur moderne
- **Gestion des projets** : Stockage en mémoire des projets sous forme de tableau
- **Création de projets** : Fonction `creerProjet()` pour créer et afficher un nouveau projet
- **Ajout de projets** : Fonction `ajouterProjet()` pour ajouter des projets en mémoire et sur l'interface
- **Détail des projets** : Fonction `detaillerProjet()` pour afficher les caractéristiques d'un projet
- **Suppression de projets** : Fonction `supprimerProjet()` pour supprimer un projet de la mémoire et de l'interface
- **Persistance des données** : Utilisation d'un serveur factice d'API REST (json-server) pour persister les données côté serveur

### Technologies utilisées

- **Vanilla JavaScript** : Pour la logique applicative
- **Tailwind CSS** : Pour le styling et l'interface utilisateur
- **HTML5** : Structure de l'application
- **JSON Server** : Serveur factice pour l'API REST

## Installation du projet

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/meissadev/projet-fil-rouge
   ```

2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Compiler Tailwind CSS :
   ```bash
   npx @tailwindcss/cli -i ./src/css/input.css -o ./src/css/output.css --watch
   ```

## Structure du projet

```
projet-fil-rouge/
├── index.html          # Point d'entrée de l'application
├── package.json        # Configuration npm
├── README.md          # Documentation du projet
├── public/            # Ressources publiques
└── src/
    ├── main.js        # Point d'entrée et orchestration des modules
    ├── assets/        # Ressources statiques
    ├── css/
    │   ├── input.css  # Fichier d'entrée Tailwind
    │   └── output.css # Fichier de sortie Tailwind compilé
    └── js/            # Modules JavaScript organisés par fonctionnalité
        ├── projet.js          # Gestion des projets (Modou)
        ├── gestionProjets.js  # Ajout/Suppression (Amina)
        ├── detailProjet.js    # Détails des projets (Yacine)
        ├── api.js             # API REST (Sadik)
        └── ui.js              # Interface utilisateur (Meissa)
```

## Organisation du travail en équipe

### Branches Git
```
main
└── develop
    ├── feature/setup-structure    → Meissa
    ├── feature/creer-projet       → Modou Ndiaye
    ├── feature/ajouter-supprimer  → Amina
    ├── feature/detailler-projet   → Mame Yacine
    └── feature/api-json-server    → Sadik
```

### Répartition des tâches

- **Meissa** — Setup & Prototype UI (Branche: `feature/setup-structure`)
  - Configuration de la structure du projet
  - Prototypage de l'interface utilisateur
  - Intégration des modules dans `main.js`

- **Modou Ndiaye** — `creerProjet()` + tableau projets (Branche: `feature/creer-projet`)
  - Fonction `creerProjet(id, libelle, imageSrc)`
  - Gestion du tableau `projets` en mémoire

- **Amina** — `ajouterProjet()` + `supprimerProjet()` (Branche: `feature/ajouter-supprimer`)
  - Fonction `ajouterProjet()` pour ajouter des projets
  - Fonction `supprimerProjet()` pour supprimer des projets

- **Mame Yacine** — `detaillerProjet()` (Branche: `feature/detailler-projet`)
  - Fonction `detaillerProjet()` pour afficher les détails

- **Sadik** — API REST avec json-server (Branche: `feature/api-json-server`)
  - Intégration de json-server pour la persistance
  - Fonctions API: `getProjetsFromAPI()`, `saveProjetToAPI()`, etc.

## Démarrage du serveur de développement

Pour démarrer l'application en mode développement :

```bash
npm run dev
```

## Utilisation de JSON Server

Pour la persistance des données, utilisez json-server :

```bash
npx json-server --watch db.json --port 3001
```

Créez un fichier `db.json` à la racine du projet avec cette structure initiale :

```json
{
  "projets": []
}
```

## Workflow de développement

### Travail sur une branche feature

1. Créer et basculer sur votre branche :
   ```bash
   git checkout -b feature/votre-feature
   ```

2. Développer votre fonctionnalité dans le fichier approprié dans `src/js/`

3. Tester vos modifications

4. Commiter vos changements :
   ```bash
   git add .
   git commit -m "feat: description de votre fonctionnalité"
   ```

5. Pousser votre branche :
   ```bash
   git push origin feature/votre-feature
   ```

6. Créer une Pull Request vers `develop`

### Modules JavaScript

L'application utilise des modules ES6 pour une meilleure organisation :

- **`projet.js`** : Contient le tableau `projets` et la fonction `creerProjet()`
- **`gestionProjets.js`** : Fonctions `ajouterProjet()` et `supprimerProjet()`
- **`detailProjet.js`** : Fonction `detaillerProjet()` et utilitaires d'affichage
- **`api.js`** : Toutes les fonctions d'interaction avec l'API REST
- **`ui.js`** : Fonctions d'interface utilisateur et rendu
- **`main.js`** : Orchestration et initialisation de l'application

Chaque module exporte ses fonctions et importe ce dont il a besoin depuis les autres modules.

## Fonctions JavaScript principales

- `creerProjet(id, libelle, imageSrc)` : Crée un nœud projet et l'insère en première position
- `ajouterProjet()` : Ajoute un nouveau projet en mémoire et sur l'interface
- `detaillerProjet(projet)` : Affiche les détails d'un projet
- `supprimerProjet(id)` : Supprime un projet de la mémoire et de l'interface

