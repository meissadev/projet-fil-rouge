/* ======================= projet.js - Gestion des projets (Modou Ndiaye) =======================*/

/**
 * projet.js — Modèle de données Projet
 * Responsable : Modou
 *
 * Définit la structure d'un projet et expose
 * la factory creerProjet() utilisée par tout le module.
 */

/**
 * Crée un objet projet structuré.
 *
 * @param {number|string} id        - Identifiant unique
 * @param {string}        libelle   - Nom du projet
 * @param {string}        [description=""]   - Description longue
 * @param {string}        [imageUrl=""]      - URL ou data-URL de l'image
 * @param {string[]}      [technologies=[]]  - Liste des techno utilisées
 * @param {string}        [githubUrl=""]     - Lien vers le dépôt GitHub
 * @param {string}        [demoUrl=""]       - Lien vers la démo en ligne
 * @param {string}        [statut="en_cours"]- Statut : en_cours | termine | archive
 * @returns {Object} Objet projet normalisé
 */
export function creerProjet(
  id,
  libelle,
  description  = "",
  imageUrl     = "",
  technologies = [],
  githubUrl    = "",
  demoUrl      = "",
  statut       = "en_cours"
) {
  /* Normalise technologies : accepte aussi bien un tableau
     qu'une chaîne séparée par des virgules */
  const techs = Array.isArray(technologies)
    ? technologies
    : technologies.split(",").map((t) => t.trim()).filter(Boolean);

  return {
    id,
    libelle:      libelle.trim(),
    description:  description.trim(),
    imageUrl:     imageUrl.trim(),
    technologies: techs,
    githubUrl:    githubUrl.trim(),
    demoUrl:      demoUrl.trim(),
    statut,
  };
}

/**
 * Tableau en mémoire de tous les projets chargés.
 * Partagé entre gestionProjets.js, detailProjet.js et ui.js
 * via import/export.
 */
export let projets = [];

/**
 * Remplace le tableau interne (appelé après chargement API).
 * @param {Object[]} liste
 */
export function setProjets(liste) {
  projets.length = 0;
  projets.push(...liste);
}

/**
 * Ajoute un projet dans le tableau en mémoire.
 * @param {Object} projet
 */
export function ajouterEnMemoire(projet) {
  projets.unshift(projet);
}

/**
 * Supprime un projet du tableau en mémoire par son id.
 * @param {number|string} id
 */
export function supprimerEnMemoire(id) {
  const index = projets.findIndex((p) => p.id == id);
  if (index !== -1) projets.splice(index, 1);
}

/**
 * Recherche un projet par son id.
 * @param {number|string} id
 * @returns {Object|undefined}
 */
export function trouverProjet(id) {
  return projets.find((p) => p.id == id);
}
