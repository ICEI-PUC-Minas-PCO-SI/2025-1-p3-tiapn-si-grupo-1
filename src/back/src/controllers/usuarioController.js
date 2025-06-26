const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");

const usuarioController = {
  async cadastrar(req, res) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res
          .status(400)
          .json({ mensagem: "Preencha todos os campos obrigatórios." });
      }

      const usuarioExistente = await Usuario.findOne({ where: { email } });
      if (usuarioExistente) {
        return res.status(409).json({ mensagem: "E-mail já cadastrado." });
      }

      const senhaHash = await bcrypt.hash(senha, 10);

      const novoUsuario = await Usuario.create({
        nome,
        email,
        senha_hash: senhaHash,
      });

      return res.status(201).json({
        mensagem: "Usuário cadastrado com sucesso!",
        usuario: { id: novoUsuario.id, nome, email },
      });
    } catch (error) {
      console.error("Erro no cadastro:", error);
      return res.status(500).json({ mensagem: "Erro ao cadastrar usuário." });
    }
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;

      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado." });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

      if (!senhaValida) {
        return res.status(401).json({ mensagem: "Senha incorreta." });
      }

      const token = jwt.sign(
        { id: usuario.id, nome: usuario.nome },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res
        .status(200)
        .json({ mensagem: "Login realizado com sucesso.", token });
    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({ mensagem: "Erro ao realizar login." });
    }
  },

  async listarTodos(req, res) {
    try {
      const usuarios = await Usuario.findAll({
        attributes: ["id", "nome", "email", "criado_em"],
      });
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao buscar usuários." });
    }
  },

  async obterUsuarioLogado(req, res) {
    try {
      const usuario = await Usuario.findByPk(req.usuarioId, {
        attributes: ["id", "nome", "email", "criado_em"],
      });

      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado." });
      }

      return res.status(200).json(usuario);
    } catch (error) {
      console.error("Erro ao buscar usuário logado: ", error);
      return res.status(500).json({ erro: "Erro ao buscar dados do usuário." });
    }
  },
};

module.exports = usuarioController;
