/* =======================
   gestionProjets.js
========================= */

let projets = [];
let nextId = 1;

function ajouterProjet(nom, description) {
  if (!nom || !description) {
    alert("Remplis tous les champs !");
    return;
  }

  const nouveauProjet = {
    id: nextId++,
    nom: nom,
    description: description
  };

  projets.push(nouveauProjet);