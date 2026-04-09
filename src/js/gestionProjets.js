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

  const container = document.getElementById("projects");
  const projet = document.createElement("div");
  projet.className = "project";
  projet.id = `projet-${nouveauProjet.id}`;

  projet.innerHTML = `
    <h3>${nom}</h3>
    <p>${description}</p>
    <button class="delete" onclick="supprimerProjet(${nouveauProjet.id})">
      Supprimer
    </button>
  `;

  container.appendChild(projet);
}

function supprimerProjet(id) {
  projets = projets.filter(p => p.id !== id);

  const element = document.getElementById(`projet-${id}`);
  if (element) {
    element.remove();
  }
}