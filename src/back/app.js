const express = require("express");
const { sequelize } = require("./src/models");
const cors = require("cors");

const usuarioRoutes = require('./src/routes/usuarioRoutes');
const flowRoutes = require('./src/routes/flowRoutes');
const comentarioRoutes = require('./src/routes/comentarioRoutes');
const flowSalvoRoutes = require('./src/routes/flowsalvoRouter');
const curtidaRoutes = require('./src/routes/curtidaRouter');
const comentarioPostagemRoutes = require('./src/routes/comentarioPostagemRoutes');
const postagemComunidadeRoutes = require('./src/routes/postagemComunidadeRoutes');
const filters = require('./src/routes/filtrosRouter');

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
app.use('/api/flowsalvos', flowSalvoRoutes);
app.use('/api/curtidas', curtidaRoutes);
app.use('/api/comentariopostagem', comentarioPostagemRoutes);
app.use('/api/postagemcomunidade', postagemComunidadeRoutes);
app.use('/api/filtros', filters)

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
