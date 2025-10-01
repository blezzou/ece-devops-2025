/**
 * Base de données simulée pour les utilisateurs
 *
 * Contient une liste d'utilisateurs en mémoire et fournit une fonction
 * pour récupérer un utilisateur par son nom d'utilisateur.
 *
 * @auteur Ismail CHERCHAR
 * @version 1.0.0
 * @depuis 30/09/2025
 */

const users = {
  ismail: { username: "ismail", email: "ismail@edu.ece.fr" },
  nicolas: { username: "nicolas", email: "nicolas@edu.ece.fr" }
};

/**
 * Récupère un utilisateur par son nom d'utilisateur
 *
 * @param {string} username - Le nom d'utilisateur à rechercher
 * @returns {Object|null} L'objet utilisateur ou null si inexistant
 */
async function get(username) {
  return users[username] || null;
}
module.exports = { get };
