<<<<<<< feature/detailler-projet
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
=======
/* ======================= detailProjet.js - Affichage des détails d'un projet (Mame Yacine) ======================= */
>>>>>>> develop
