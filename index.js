const express = require('express');
const app = express();
const userRouter = require('./src/routes/user');

app.use(express.json());
app.use('/user', userRouter);

app.listen(3000, () => {
  console.log('✅ Serveur démarré sur http://localhost:3000');
});

module.exports = app; // utile pour les tests

//fin à revoir
