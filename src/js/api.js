/* ===================== api.js - API REST avec json-server (Sadikh) ======================= */
/**
 * api.js — Couche d'accès à l'API REST (json-server)
 * Responsable : Sadikh
 *
 * Toutes les communications réseau passent ici.
 * Les autres modules n'utilisent jamais fetch() directement.
 */

const API_URL = "http://localhost:3000/projets";

/**
 * Récupère tous les projets depuis le serveur.
 * @returns {Promise<Object[]>}
 */
export async function fetchTousProjets() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`GET /projets → ${res.status}`);
  return res.json();
}

/**
 * Récupère un projet par son id.
 * @param {number|string} id
 * @returns {Promise<Object>}
 */
export async function fetchProjet(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error(`GET /projets/${id} → ${res.status}`);
  return res.json();
}

/**
 * Crée un nouveau projet côté serveur.
 * @param {Object} projet - Objet sans id (json-server l'auto-génère)
 * @returns {Promise<Object>} Projet enregistré avec son id
 */
export async function postProjet(projet) {
  const res = await fetch(API_URL, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(projet),
  });
  if (!res.ok) throw new Error(`POST /projets → ${res.status}`);
  return res.json();
}

/**
 * Met à jour un projet existant (remplacement complet).
 * @param {number|string} id
 * @param {Object}        projet
 * @returns {Promise<Object>}
 */
export async function putProjet(id, projet) {
  const res = await fetch(`${API_URL}/${id}`, {
    method:  "PUT",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(projet),
  });
  if (!res.ok) throw new Error(`PUT /projets/${id} → ${res.status}`);
  return res.json();
}

/**
 * Supprime un projet côté serveur.
 * @param {number|string} id
 * @returns {Promise<void>}
 */
export async function deleteProjet(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`DELETE /projets/${id} → ${res.status}`);
}