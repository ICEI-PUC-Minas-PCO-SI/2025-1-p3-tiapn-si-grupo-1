const express = require('express');
const cors = require('cors'); // 👈 importar o cors
const { sequelize } = require('./src/models');

const usuarioRoutes = require('./src/routes/usuarioRoutes');
const flowRoutes = require('./src/routes/flowRoutes');

const app = express();

// Habilitar CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

// Rotas da API
app.use('/api/usuario', usuarioRoutes);
app.use('/api/flow', flowRoutes);

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
