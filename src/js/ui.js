// ui.js - Setup & Prototype UI (Meissa)

/**
 * ui.js — Interface utilisateur
 * Responsable : Meissa
 *
 * Gère :
 *  - la création / suppression des cartes projet dans le DOM
 *  - le compteur de projets
 *  - la zone de drag-and-drop / upload d'image
 *  - le menu mobile
 */

import { detaillerProjet }  from "./detailProjet.js";
import { supprimerProjet }  from "./gestionProjets.js";

/* ── Références DOM ──────────────────────────────────── */
const conteneurProjets = document.getElementById("conteneur-projets");
const compteurEl       = document.getElementById("compteurProjets");
const dropZone         = document.getElementById("dropZone");
const imageFileInput   = document.getElementById("imageFile");
const previewImg       = document.getElementById("previewImg");
const btnMenu          = document.getElementById("btnMenu");
const mobileMenu       = document.getElementById("mobileMenu");

/* ────────────────────────────────────────────────────── *
 *  afficherCarteProjet(projet)                           *
 *  Crée un nœud DOM carte et l'insère en 1er élément     *
 *  du conteneur flex.                                    *
 * ────────────────────────────────────────────────────── */
export function afficherCarteProjet(projet) {
  const placeholder = `https://picsum.photos/seed/${projet.id}/600/400`;
  const src         = projet.imageUrl || placeholder;

  const carte = document.createElement("div");
  carte.dataset.id = projet.id;
  carte.className  =
    "project-card bg-surface border border-card rounded-xl overflow-hidden " +
    "transition-all duration-300 cursor-pointer group";

  carte.innerHTML = `
    <div class="relative overflow-hidden aspect-video">
      <img src="${src}"
           alt="${projet.libelle}"
           onerror="this.src='${placeholder}'"
           class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
    </div>
    <div class="p-4 flex items-center justify-between gap-3">
      <h3 class="text-white font-display font-bold text-base truncate flex-1">
        ${projet.libelle}
      </h3>
      <button class="btn-supprimer shrink-0 text-xs font-mono
                     bg-red-500/20 border border-red-500/40 text-red-400
                     px-3 py-1.5 rounded-lg hover:bg-red-500/40 transition-colors">
        ✕ Supprimer
      </button>
    </div>
  `;

  /* Clic sur la carte → détail (sauf si clic sur le bouton) */
  carte.addEventListener("click", (e) => {
    if (!e.target.closest(".btn-supprimer")) {
      detaillerProjet(projet.id);
    }
  });

  /* Clic sur le bouton Supprimer */
  carte.querySelector(".btn-supprimer").addEventListener("click", (e) => {
    supprimerProjet(projet.id, e);
  });

  /* Insérer comme 1er enfant */
  conteneurProjets.insertBefore(carte, conteneurProjets.firstChild);
}

/* ────────────────────────────────────────────────────── *
 *  supprimerCarteUI(id)                                  *
 *  Retire la carte du DOM avec une animation de sortie.  *
 * ────────────────────────────────────────────────────── */
export function supprimerCarteUI(id) {
  const carte = conteneurProjets.querySelector(`[data-id="${id}"]`);
  if (!carte) return;

  carte.style.transition = "opacity .3s, transform .3s";
  carte.style.opacity    = "0";
  carte.style.transform  = "scale(0.92)";

  setTimeout(() => {
    carte.remove();
    majCompteur();
  }, 300);
}

/* ────────────────────────────────────────────────────── *
 *  majCompteur()                                         *
 *  Met à jour l'affichage du nombre de projets.          *
 * ────────────────────────────────────────────────────── */
export function majCompteur() {
  const n = conteneurProjets.querySelectorAll("[data-id]").length;
  compteurEl.textContent = `${n} projet${n !== 1 ? "s" : ""}`;
}

/* ────────────────────────────────────────────────────── *
 *  initUploadImage()                                     *
 *  Zone de drag-and-drop + prévisualisation image.       *
 * ────────────────────────────────────────────────────── */
function afficherPreview(file) {
  if (!file || !file.type.startsWith("image/")) return;
  const reader  = new FileReader();
  reader.onload = (e) => {
    previewImg.src = e.target.result;
    previewImg.classList.remove("hidden");
  };
  reader.readAsDataURL(file);
}

function initUploadImage() {
  /* Clic sur la zone → ouvre le sélecteur de fichier */
  dropZone.addEventListener("click", () => imageFileInput.click());

  /* Changement via l'input natif */
  imageFileInput.addEventListener("change", () => {
    afficherPreview(imageFileInput.files[0]);
  });

  /* Drag over */
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("border-neon");
  });

  /* Drag leave */
  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("border-neon");
  });

  /* Drop */
  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("border-neon");
    const file = e.dataTransfer.files[0];
    /* Synchronise avec l'input file (pour que gestionProjets.js puisse le lire) */
    imageFileInput.files = e.dataTransfer.files;
    afficherPreview(file);
  });
}

/* ────────────────────────────────────────────────────── *
 *  initMenuMobile()                                      *
 * ────────────────────────────────────────────────────── */
function initMenuMobile() {
  btnMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

/* ── Point d'entrée UI ───────────────────────────────── */
export function initUI() {
  initUploadImage();
  initMenuMobile();
}
