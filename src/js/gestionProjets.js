/* ======================= gestionProjets.js - Gestion de l'ajout et suppression des projets (Amina) ======================= */
function ajouterProjet(nom, description) {
    const container = document.getElementById("projects");

    const projet = document.createElement("div");
    projet.className = "project";

    projet.innerHTML = `
        <h3>${nom}</h3>
        <p>${description}</p>
        <button class="delete">Supprimer</button>
    `;

    container.appendChild(projet);
}