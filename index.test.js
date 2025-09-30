const request = require('supertest');
const app = require('./index'); // on importe ton serveur

describe('GET /users/:id', () => {
  it('retourne "Utilisateur non trouvé" si user inexistant', async () => {
    const res = await request(app).get('/users/999');
    expect(res.statusCode).toBe(200); // ou 404 selon ton API
    expect(res.body).toEqual({ error: "Utilisateur non trouvé" });
  });
});
