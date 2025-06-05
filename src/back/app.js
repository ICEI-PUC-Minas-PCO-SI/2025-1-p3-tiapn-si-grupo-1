const express = require("express");
const { sequelize } = require("./src/models");
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

// Habilita CORS para todas as origens
app.use(cors());
/*CORS (Cross-Origin Resource Sharing) é um mecanismo de segurança implementado 
pelos navegadores que controla quais origens (domínios) têm permissão para acessar recursos de um servidor.*/

app.use(express.json());

// Rotas da API
app.use('/api/usuario', usuarioRoutes);
app.use('/api/flow', flowRoutes);
app.use('/api/comentario', comentarioRoutes)
app.use('/api/flowsalvos', flowSalvoRoutes);
app.use('/api/curtidas', curtidaRoutes);
app.use('/api/comentario/postagem', comentarioPostagemRoutes);
app.use('/api/postagem', postagemComunidadeRoutes);
app.use("/api/filtros", filtrosRoutes);

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
