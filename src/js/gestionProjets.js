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