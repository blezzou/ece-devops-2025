/**
 * Serveur principal de l'application avec Swagger UI
 *
 * Ce fichier démarre le serveur Express, écoute sur le port défini
 * et configure la documentation Swagger pour l'API.
 *
 * @auteur NICOLAS PELLERIN
 * @version 1.0.0
 * @depuis 30/09/2025
 */

const app = require("./app");
const expressSwagger = require('express-swagger-generator')(app);
const PORT = process.env.PORT || 3000;
let options = {
    swaggerDefinition: {
        info: {
            description: 'Documentation API User',
            title: 'User API',
            version: '1.0.0',
        },
        host: `localhost:${PORT}`,
        basePath: '/',
        produces: [
            "application/json"
        ],
        schemes: ['http'],
    },
    basedir: __dirname,     
    files: ['./paths/*.js']  
};
expressSwagger(options);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger UI disponible sur http://localhost:${PORT}/api-docs`);
});
