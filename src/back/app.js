const express = require('express');
const cors = require('cors'); // 👈 importar o cors
const { sequelize } = require('./src/models');
const cors = require("cors");

const filtrosRoutes = require("./src/routes/filtros");
const usuarioRoutes = require("./src/routes/usuarioRoutes");
const flowRoutes = require("./src/routes/flowRoutes");
const comentarioRoutes = require("./src/routes/comentarioRoutes");
const flowSalvoRoutes = require("./src/routes/flowsalvoRouter");
const curtidaRoutes = require("./src/routes/curtidaRouter");
const comentarioPostagemRoutes = require("./src/routes/comentarioPostagemRoutes");
const postagemComunidadeRoutes = require("./src/routes/postagemComunidadeRoutes");
const filtrosRoutes = require("./src/routes/filtros");

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // ou use '*' temporariamente para testes (não recomendado em produção)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));


app.use(express.json());

// Rotas da API
app.use('/api/usuario', usuarioRoutes);
app.use('/api/flow', flowRoutes);
app.use('/api/comentario', comentarioRoutes)
app.use('/flowsalvos', flowSalvoRoutes);
app.use('/curtidas', curtidaRoutes);
app.use('/comentariopostagem', comentarioPostagemRoutes);
app.use('/postagemcomunidade', postagemComunidadeRoutes)
app.use('/filtros', filtrosRoutes);

app.get("/", (req, res) => {
  res.send("A API do KnowFlow está rodando 🤩!");
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Banco sincronizado com Sequelize');
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`O servidor do KnowFlow está na porta ${port} 🤖`);
    });
  })
  .catch((err) => {
    console.error("Erro ao sincronizar o banco:", err);
  });
