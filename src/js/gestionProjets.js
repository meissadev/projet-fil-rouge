/* ======================= 
   gestionProjets.js 
========================= */
let projets = [];
let nextId = 1;

function ajouterProjet(nom, description) {
  // Vérification : les champs ne doivent pas être vides
  if (!nom || !description) {
    alert("Remplis tous les champs !");
    return;
  }
