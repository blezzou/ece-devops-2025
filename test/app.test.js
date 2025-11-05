const request = require('supertest');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.status(200).send('ok'));

describe('GET /', () => {
  it('should return ok', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
  });
});
