import "./css/output.css"
import { setProjets }          from "./js/projet.js";
import { fetchTousProjets }    from "./js/api.js";
import { afficherCarteProjet, majCompteur, initUI } from "./js/ui.js";
import { initGestionProjets }  from "./js/gestionProjets.js";
import { initDetailProjet }    from "./js/detailProjet.js";

/* ────────────────────────────────────────────────────── *
 *  chargerProjets()                                      *
 *  Récupère les projets depuis json-server et les        *
 *  affiche. Utilise des données de démo en cas d'échec.  *
 * ────────────────────────────────────────────────────── */
async function chargerProjets() {
  let liste = [];

  try {
    liste = await fetchTousProjets();
  } catch (err) {
    console.warn("json-server inaccessible — données de démo chargées.", err);
    liste = [
      {
        id: 1,
        libelle: "ImmoSN – Plateforme immobilière",
        description: "Plateforme Laravel multi-rôles pour la gestion et la location de biens immobiliers au Sénégal.",
        imageUrl: "",
        technologies: ["Laravel 10", "MySQL", "Tailwind CSS", "Alpine.js"],
        githubUrl: "",
        demoUrl: "",
        statut: "termine",
      },
      {
        id: 2,
        libelle: "E-tourisme Flask/Gunicorn",
        description: "Application web de tourisme déployée avec Flask, Gunicorn et Traefik en reverse proxy.",
        imageUrl: "",
        technologies: ["Python", "Flask", "Docker", "Traefik"],
        githubUrl: "",
        demoUrl: "",
        statut: "termine",
      },
      {
        id: 3,
        libelle: "IoT Dashboard – ESP8266 + Grafana",
        description: "Stack de monitoring IoT : ESP8266 + DHT11 → MQTT → Telegraf → InfluxDB → Grafana.",
        imageUrl: "",
        technologies: ["ESP8266", "MQTT", "Telegraf", "InfluxDB 2.x", "Grafana"],
        githubUrl: "",
        demoUrl: "",
        statut: "en_cours",
      },
    ];
  }

  /* Stocke en mémoire */
  setProjets(liste);

  /* Affiche du plus ancien au plus récent
     (afficherCarteProjet insère toujours en tête → inverser) */
  [...liste].reverse().forEach((p) => afficherCarteProjet(p));
  majCompteur();
}

/* ── Initialisation globale ──────────────────────────── */
async function init() {
  initUI();              /* zone upload, menu mobile          */
  initDetailProjet();    /* overlay détail + fermeture        */
  initGestionProjets();  /* formulaire ajout / suppression    */
  await chargerProjets();
}

init();
