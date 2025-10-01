/**
 * Configuration principale de l'application Express
 *
 * Initialise l'application, configure le parsing JSON et
 * lie les routes des utilisateurs.
 *
 * @auteur Nicolas Pellerin
 * @version 1.0.0
 * @depuis 30/09/2025
 */

const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./paths/user");
const app = express();
app.use(bodyParser.json());
app.use("/user", userRoutes);
module.exports = app;
