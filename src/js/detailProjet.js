/* ======================= detailProjet.js - Affichage des détails d'un projet (Mame Yacine) ======================= */

import { trouverProjet } from "./projet.js";

/* ── Références DOM ──────────────────────────────────── */
const sectionDetail   = document.getElementById("section-detail");
const detailContenu   = document.getElementById("detail-contenu");
const btnFermerDetail = document.getElementById("btnFermerDetail");

/* ── Labels lisibles pour le statut ─────────────────── */
const STATUT_LABELS = {
  en_cours: { label: "En cours",  classe: "text-yellow-400" },
  termine:  { label: "Terminé",   classe: "text-neon"       },
  archive:  { label: "Archivé",   classe: "text-muted"      },
};

/* ────────────────────────────────────────────────────── *
 *  detaillerProjet(id)                                   *
 *  Affiche les caractéristiques complètes d'un projet    *
 *  dans l'overlay prévu à cet effet.                     *
 * ────────────────────────────────────────────────────── */
export function detaillerProjet(id) {
  const projet = trouverProjet(id);
  if (!projet) return;

  const placeholder = `https://picsum.photos/seed/${projet.id}/800/450`;
  const src         = projet.imageUrl || placeholder;

  /* Statut */
  const statutInfo  = STATUT_LABELS[projet.statut] || { label: projet.statut, classe: "text-muted" };

  /* Sous-liste ordonnée des technologies */
  const techItems = projet.technologies.length
    ? projet.technologies
        .map((t) => `<li class="mb-1">${t}</li>`)
        .join("")
    : "<li class='text-muted'>Non renseignées</li>";

  /* Liens optionnels */
  const lienGithub = projet.githubUrl
    ? `<a href="${projet.githubUrl}" target="_blank" rel="noopener"
          class="text-accent hover:underline truncate block">
         Voir le dépôt →
       </a>`
    : `<span class="text-muted">—</span>`;

  const lienDemo = projet.demoUrl
    ? `<a href="${projet.demoUrl}" target="_blank" rel="noopener"
          class="text-accent hover:underline truncate block">
         Accéder à la démo →
       </a>`
    : `<span class="text-muted">—</span>`;

    /* ── Injection du contenu ───────────────────────── */
  detailContenu.innerHTML = `
  <!-- Image -->
  <img src="${src}"
       alt="${projet.libelle}"
       onerror="this.src='${placeholder}'"
       class="w-full rounded-xl mb-6 object-cover max-h-56"/>

  <!-- En-tête -->
  <p class="text-neon font-mono text-xs mb-1 tracking-widest uppercase">
    Projet #${projet.id}
  </p>
  <h3 class="text-white font-display font-extrabold text-2xl mb-4">
    ${projet.libelle}
  </h3>

  <!-- Grille de méta-données -->
  <div class="grid grid-cols-2 gap-3 mb-4 text-xs font-mono">

    <div class="bg-card rounded-lg p-3">
      <p class="text-muted mb-1 uppercase tracking-widest">Statut</p>
      <p class="${statutInfo.classe} font-bold">${statutInfo.label}</p>
    </div>

    <div class="bg-card rounded-lg p-3">
      <p class="text-muted mb-1 uppercase tracking-widest">GitHub</p>
      ${lienGithub}
    </div>

    <div class="bg-card rounded-lg p-3 col-span-2">
      <p class="text-muted mb-1 uppercase tracking-widest">Démo</p>
      ${lienDemo}
    </div>

    <div class="bg-card rounded-lg p-3 col-span-2">
      <p class="text-muted mb-1 uppercase tracking-widest">Description</p>
      <p class="text-white leading-relaxed">
        ${projet.description || "<span class='text-muted'>Aucune description.</span>"}
      </p>
    </div>

  </div>

  <!-- Technologies : sous-liste ordonnée -->
  ${projet.technologies.length ? `
  <div class="bg-card rounded-lg p-4">
    <p class="text-muted text-xs uppercase tracking-widest mb-2">
      Technologies utilisées
    </p>
    <ol class="list-decimal list-inside space-y-1 text-neon text-xs font-mono">
      ${techItems}
    </ol>
  </div>` : ""}
`;

/* Affiche l'overlay */
sectionDetail.style.display = "flex";
}

/* ────────────────────────────────────────────────────── *
 *  fermerDetail()                                        *
 *  Cache l'overlay et vide son contenu.                  *
 * ────────────────────────────────────────────────────── */
export function fermerDetail() {
  sectionDetail.style.display = "none";
  detailContenu.innerHTML     = "";
}