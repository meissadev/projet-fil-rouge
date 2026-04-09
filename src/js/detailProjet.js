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
    