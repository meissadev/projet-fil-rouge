
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

