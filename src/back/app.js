const express = require('express');
const { sequelize } = require('./src/models');

const usuarioRoutes = require('./src/routes/usuarioRoutes');
const flowRoutes = require('./src/routes/flowRoutes');
const comentarioRoutes = require('./src/routes/comentarioRoutes');
const flowSalvoRoutes = require('./src/routes/flowsalvoRouter');
const curtidaRoutes = require('./src/routes/curtidaRouter');
const comentarioPostagemRoutes = require('./src/routes/comentarioPostagemRoutes');
const postagemComunidadeRoutes = require('./src/routes/postagemComunidadeRoutes');


const app = express();

app.use(express.json());

// Rotas da API
app.use('/api/usuario', usuarioRoutes);
app.use('/api/flow', flowRoutes);
app.use('/api/comentario', comentarioRoutes)
app.use('/flowsalvos', flowSalvoRoutes);
app.use('/curtidas', curtidaRoutes);
app.use('/comentariopostagem', comentarioPostagemRoutes);
app.use('/postagemcomunidade', postagemComunidadeRoutes)

app.get('/', (req, res) => {
  res.send('A API do KnowFlow está rodando 🤩!');
});

// CÓDIGO CORRIGIDO (COPIE E COLE ESTE BLOCO NO LUGAR DO ANTERIOR)
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Banco sincronizado com Sequelize');
    
    // Define a porta usando a variável de ambiente do Azure, ou 3000 como padrão
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`O servidor do KnowFlow está rodando na porta ${port} 🤖`);
    });
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco:', err);
  });
