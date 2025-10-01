/**
 * Routes pour les utilisateurs avec documentation Swagger
 *
 * Définit les endpoints liés aux utilisateurs et appelle
 * les handlers correspondants pour traiter les requêtes.
 *
 * @auteur ADAM BOUCHIBA
 * @version 1.0.0
 * @depuis 30/09/2025
 */

const express = require("express");
const paths = express.Router();

const userController = require("../handlers/user");

/**
 * @route GET /user/{username}
 * @group Utilisateurs - Gestion des utilisateurs
 * @param {string} username.path.required - Nom de l'utilisateur
 * @returns {object} 200 - Objet utilisateur
 * @returns {Error} 404 - Utilisateur introuvable
 */
paths.get("/:username", async (req, res) => {
  const user = await userController.getUser(req.params.username);
  if (!user) {
    return res.status(404).json({ error: "Utilisateur introuvable" });
  }
  res.json(user);
});

module.exports = paths;
