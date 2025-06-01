const express = require('express');
const { sequelize } = require('./src/models');

const usuarioRoutes = require('./src/routes/usuarioRoutes');
const flowRoutes = require('./src/routes/flowRoutes');
const comentarioRoutes = require('./src/routes/comentarioRoutes');
const flowSalvoRoutes = require('./src/routes/flowSalvoRoutes');
const curtidaRoutes = require('./src/routes/curtidaRoutes');
const comentarioPostagemRoutes =- require('./src/routes/comentarioPostagemRoutes');

const app = express();

app.use(express.json());

// Rotas da API
app.use('/api/usuario', usuarioRoutes);
app.use('/api/flow', flowRoutes);
app.use('/api/comentario', comentarioRoutes)
app.use('/flowsalvos', flowSalvoRoutes);
app.use('/curtidas', curtidaRoutes);
app.use('/api/comentariopostagem', comentarioPostagemRoutes);

app.get('/', (req, res) => {
  res.send('A API do KnowFlow está rodando 🤩!');
});

sequelize.sync({ alter: true })  // mantém sincronizado com as models
  .then(() => {
    console.log('Banco sincronizado com Sequelize');
    app.listen(3000, () => {
      console.log('O servidor do KnowFlow está rodando em http://localhost:3000 🤖');
    });
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco:', err);
  });
