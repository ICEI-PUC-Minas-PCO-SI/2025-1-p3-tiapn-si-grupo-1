const { Curtida, Usuario, Flow } = require("../models");

const curtidaController = {
  async listar(req, res) {
    try {
      const curtidas = await Curtida.findAll({
        include: [
        {
          model: Flow,
          as: 'flow',
          attributes: ["id", "titulo"], // mostra só isso do Flow
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ["id", "nome"]
        }
      ],
        order: [["criado_em", "ASC"]],
      });
      res.json(curtidas);
    } catch (error) {
      res
        .status(500)
        .json({ erro: "Erro ao listar curtidas", detalhes: error.message });
    }
  },

  async obter(req, res) {
    try {
      const curtida = await Curtida.findByPk(req.params.id, {
        include: [
          {
            model: Flow,
            attributes: ["categoria", "criado_em"],
          },
          {
            model: Usuario,
            attributes: ["nome", "email"],
          },
        ],
      });

      if (!curtida) {
        return res.status(404).json({ erro: "Curtida não encontrada" });
      }

      res.json(curtida);
    } catch (error) {
      res
        .status(500)
        .json({ erro: "Erro ao obter curtida", detalhes: error.message });
    }
  },

  async criar(req, res) {
    try {
      const usuario_id = req.usuario.id; 
      const { flow_id } = req.body;        


      const novaCurtida = await Curtida.create({ usuario_id, flow_id });

      res.status(201).json(novaCurtida);
    } catch (error) {
      res
        .status(500)
        .json({ erro: "Erro ao criar curtida", detalhes: error.message });
    }
  },
  
  // Não utilizado
  async atualizar(req, res) {
    try {
      const curtida = await Curtida.findByPk(req.params.id);
      if (!curtida) {
        return res.status(404).json({ erro: "Curtida não encontrada" });
      }

      await curtida.update(req.body);
      res.json(curtida);
    } catch (error) {
      res
        .status(400)
        .json({ erro: "Erro ao atualizar curtida", detalhes: error.message });
    }
  },

  async remover(req, res) {
    try {
      const curtida = await Curtida.findByPk(req.params.id);
      if (!curtida) {
        return res.status(404).json({ erro: "Curtida não encontrada" });
      }

      await curtida.destroy();
      res.json({ mensagem: "Curtida removida com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ erro: "Erro ao remover curtida", detalhes: error.message });
    }
  },
};

module.exports = curtidaController;