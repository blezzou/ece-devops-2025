/**
 * Tests unitaires des handlers utilisateurs
 *
 * Vérifie que la logique de récupération d'un utilisateur fonctionne correctement.
 *
 * @auteur Ismail CHERCHAR
 * @version 1.0.0
 * @depuis 30/09/2025
 */

const { getUser } = require("../src/handlers/user");

describe("Handlers utilisateurs", () => {

  /**
   * Test : récupération d'un utilisateur existant
   * Doit renvoyer l'objet utilisateur correspondant
   */
  test("essayons de trouver un utilisateur avec son prénom", async () => {
    const user = await getUser("ismail");
    expect(user).toEqual({ username: "ismail", email: "ismail@edu.ece.fr" });
  });

  /**
   * Test : récupération d'un utilisateur inexistant
   * Doit renvoyer null
   */
  test("ne retourne rien si utilisateur existe pas", async () => {
    const user = await getUser("ghost");
    expect(user).toBeNull();
  });

});
