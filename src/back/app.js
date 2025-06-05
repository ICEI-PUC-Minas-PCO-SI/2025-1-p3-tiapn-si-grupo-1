require("dotenv").config();
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

const app = express();

// Habilita CORS para todas as origens
app.use(cors());
/*CORS (Cross-Origin Resource Sharing) é um mecanismo de segurança implementado 
pelos navegadores que controla quais origens (domínios) têm permissão para acessar recursos de um servidor.*/

app.use(express.json());

// Rotas da API

app.use("/api/filtros", filtrosRoutes);
app.use("/api/usuario", usuarioRoutes);
app.use("/api/flow", flowRoutes);
app.use("/api/comentario", comentarioRoutes);
app.use("/flowsalvos", flowSalvoRoutes);
app.use("/curtidas", curtidaRoutes);
app.use("/comentariopostagem", comentarioPostagemRoutes);
app.use("/postagemcomunidade", postagemComunidadeRoutes);

app.get("/", (req, res) => {
  res.send("A API do KnowFlow está rodando 🤩!");
});

sequelize
  .sync({ alter: true }) // mantém sincronizado com as models
  .then(() => {
    console.log("Banco sincronizado com Sequelize");
    app.listen(3000, () => {
      console.log(
        "O servidor do KnowFlow está rodando em http://localhost:3000 🤖"
      );
    });
  })
  .catch((err) => {
    console.error("Erro ao sincronizar o banco:", err);
  });
