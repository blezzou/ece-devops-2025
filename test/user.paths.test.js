/**
 * Tests des routes GET /user/:username de l'application User API
 *
 * Vérifie que la récupération des utilisateurs fonctionne correctement.
 *
 * @auteur Ismail CHERCHAR
 * @version 1.0.0
 * @depuis 30/09/2025
 */

const request = require("supertest");
const app = require("../src/app");

describe("GET /user/:username", () => {

  /**
   * Test : récupération d'un utilisateur existant
   * Doit renvoyer le statut 200 et les informations de l'utilisateur
   */
  test("GET USER avec succes", async () => {
    const res = await request(app).get("/user/ismail");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ username: "ismail", email: "ismail@edu.ece.fr" });
  });

  /**
   * Test : récupération d'un utilisateur inexistant
   * Doit renvoyer le statut 404 et un message d'erreur
   */
  test("doit renvoyer une erreur 404 lorsque l'utilisateur n'existe pas", async () => {
    const res = await request(app).get("/user/ghost");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Utilisateur introuvable" });
  });

});
