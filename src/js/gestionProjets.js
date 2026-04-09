/* ======================= gestionProjets.js - Gestion de l'ajout et suppression des projets (Amina) ======================= *//* ======================= 
   gestionProjets.js 
========================= */
let projets = [];
let nextId = 1;

function ajouterProjet(nom, description) {
  // Créer l'objet projet
  const nouveauProjet = {
    id: nextId++,
    nom: nom,
    description: description
  };

  // Ajouter dans le tableau
  projets.push(nouveauProjet);

  // Afficher dans la page
  const container = document.getElementById("projects");
  const projet = document.createElement("div");
  projet.className = "project bg-white rounded-lg p-4 border mb-4";
  projet.id = `projet-${nouveauProjet.id}`;

  projet.innerHTML = `
    <h3 class="text-xl font-bold">${nom}</h3>
    <p class="text-gray-600">${description}</p>
    <button 
      onclick="supprimerProjet(${nouveauProjet.id})"
      class="mt-2 text-red-500 border border-red-500 px-3 py-1 rounded">
      Supprimer
    </button>
  `;

  container.appendChild(projet);
}