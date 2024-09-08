const express = require('express');
const path = require('path');
// const sequelize = require('./models');
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;

// sequelize.sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Servidor rodando na porta ${PORT}`);
//   });
// }).catch(error => {
//   console.error('Erro ao conectar ao banco de dados:', error);
// });
