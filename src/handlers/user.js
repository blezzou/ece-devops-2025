/**
 * Handlers utilisateurs
 *
 * Contient la logique métier pour récupérer les informations
 * des utilisateurs depuis la base de données.
 *
 * @auteur ADAM BOUCHIBA
 * @version 1.0.0
 * @depuis 30/09/2025
 */

const db = require("../db");

/**
 * Récupère un utilisateur par son nom d'utilisateur
 *
 * @param {string} username - Le nom d'utilisateur à rechercher
 * @returns {Object|null} L'objet utilisateur ou null si inexistant
 */
async function getUser(username) {
  const user = await db.get(username);
  if (!user) return null;
  return user;
}
module.exports = { getUser };
