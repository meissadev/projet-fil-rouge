/**
 * gestionProjets.js — Ajout et suppression de projets
 * Responsable : Amina
 *
 * Orchestre : lecture du formulaire → création objet →
 * persistance API → mise à jour mémoire → rendu UI.
 */

import { creerProjet, ajouterEnMemoire, supprimerEnMemoire } from "./projet.js";
import { postProjet, deleteProjet }                          from "./api.js";
import { afficherCarteProjet, supprimerCarteUI, majCompteur } from "./ui.js";

/* ── Références DOM ──────────────────────────────────── */
const formulaire  = document.getElementById("formulaireProjet");
const inputLibelle      = document.getElementById("libelle");
const inputDescription  = document.getElementById("description");
const inputImageFile    = document.getElementById("imageFile");
const inputTechnologies = document.getElementById("technologies");
const inputGithub       = document.getElementById("githubUrl");
const inputDemo         = document.getElementById("demoUrl");
const selectStatut      = document.getElementById("statut");

/* ── Lecture de l'image (FileReader) ─────────────────── */
function lireImageEnBase64(file) {
  return new Promise((resolve) => {
    if (!file || !file.type.startsWith("image/")) {
      resolve("");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

/* ────────────────────────────────────────────────────── *
 *  ajouterProjet()                                       *
 *  Lit le formulaire, crée le projet, le persiste        *
 *  et l'affiche en tête de liste.                        *
 * ────────────────────────────────────────────────────── */
export async function ajouterProjet() {
  const libelle = inputLibelle.value.trim();
  if (!libelle) {
    inputLibelle.focus();
    return;
  }

  const imageUrl = await lireImageEnBase64(inputImageFile.files[0]);

  /* Fabrique l'objet sans id (json-server l'attribue) */
  const donnees = creerProjet(
    null,
    libelle,
    inputDescription.value.trim(),
    imageUrl,
    inputTechnologies.value,
    inputGithub.value.trim(),
    inputDemo.value.trim(),
    selectStatut.value
  );
  delete donnees.id; // laisse json-server générer l'id

  try {
    const projetSauvegarde = await postProjet(donnees);
    ajouterEnMemoire(projetSauvegarde);
    afficherCarteProjet(projetSauvegarde);
    majCompteur();
    formulaire.reset();
    /* Réinitialise l'aperçu image */
    document.getElementById("previewImg").classList.add("hidden");
  } catch (err) {
    console.error("Erreur lors de l'ajout :", err);
    /* Fallback sans serveur */
    const projetLocal = creerProjet(
      Date.now(),
      libelle,
      inputDescription.value.trim(),
      imageUrl,
      inputTechnologies.value,
      inputGithub.value.trim(),
      inputDemo.value.trim(),
      selectStatut.value
    );
    ajouterEnMemoire(projetLocal);
    afficherCarteProjet(projetLocal);
    majCompteur();
    formulaire.reset();
    document.getElementById("previewImg").classList.add("hidden");
  }
}

/* ────────────────────────────────────────────────────── *
 *  supprimerProjet(id, event)                            *
 *  Supprime côté serveur, mémoire et DOM.                *
 * ────────────────────────────────────────────────────── */
export async function supprimerProjet(id, event) {
  event.stopPropagation();

  try {
    await deleteProjet(id);
  } catch (err) {
    console.warn("Serveur inaccessible, suppression locale uniquement.", err);
  }

  supprimerEnMemoire(id);
  supprimerCarteUI(id);
  majCompteur();
}

/* ── Branchement écouteur formulaire ─────────────────── */
export function initGestionProjets() {
  formulaire.addEventListener("submit", (e) => {
    e.preventDefault();
    ajouterProjet();
  });
}
