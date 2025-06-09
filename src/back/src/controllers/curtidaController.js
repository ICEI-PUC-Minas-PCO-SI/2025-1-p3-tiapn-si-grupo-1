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

      if (curtidas.length === 0) {
        return res.status(200).json({ mensagem: "Nenhuma curtida encontrada." });
      }

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
            as: 'flow',
            attributes: ["categoria", "criado_em"],
          },
          {
            model: Usuario,
            as: 'usuario',
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
    const { flow_id } = req.body;
    const usuario_id = req.usuarioId;

    try {
      const [curtida, created] = await Curtida.findOrCreate({
        where: { flow_id, usuario_id }
      });

      if (!created) {
        return res.status(409).json({ erro: "Curtida já existe" });
      }

      res.status(201).json(curtida);
    } catch (error) {
      res.status(500).json({ erro: "Erro ao criar curtida", detalhes: error.message });
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
  const { flow_id } = req.body;
  const usuario_id = req.usuarioId;

  try {
    const curtida = await Curtida.findOne({ where: { flow_id, usuario_id } });

    if (!curtida) {
      return res.status(404).json({ erro: "Curtida não encontrada" });
    }

    await curtida.destroy();
    res.json({ mensagem: "Curtida removida com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao remover curtida", detalhes: error.message });
  }
}
};

module.exports = curtidaController;