const { Curtida, Usuario, Flow } = require("../models");

const curtidaController = {
  async listar(req, res) {
    try {
      const curtidas = await Curtida.findAll({
        include: [
          {
            model: Flow,
            as: "flow",
            attributes: ["id", "titulo"], // mostra só isso do Flow
          },
          {
            model: Usuario,
            as: "usuario",
            attributes: ["id", "nome"],
          },
        ],
        order: [["criado_em", "ASC"]],
      });

      if (curtidas.length === 0) {
        return res
          .status(200)
          .json({ mensagem: "Nenhuma curtida encontrada." });
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
      const { usuario_id, flow_id } = req.params;

      if (!usuario_id || !flow_id) {
        return res
          .status(400)
          .json({ erro: "usuario_id e flow_id são obrigatórios" });
      }

      const curtida = await Curtida.findOne({
        where: { usuario_id, flow_id },
        include: [
          {
            model: Flow,
            as: "flow",
            attributes: ["id", "titulo"],
          },
          {
            model: Usuario,
            as: "usuario",
            attributes: ["id", "nome"],
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
    const { flow_id, post_id } = req.body;
    const usuario_id = req.usuarioId;

    if(!flow_id && !post_id) {
      res.status(400).json({erro: "flow_id ou post_id vazio."});
    }

    try {
      const whereClause = {usuario_id};
      if (flow_id) whereClause.flow_id = flow_id;
      if (post_id) whereClause.post_id = post_id;

      const [curtida, created] = await Curtida.findOrCreate({
        where: whereClause,
      });

      if (!created) {
        res.status(409).json({ erro: "Curtida já existe" });
      }

      res.status(201).json({
        mensagem: "Curtida registrada",
        curtida,
      });
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
    const { flow_id } = req.params;
    const usuario_id = req.usuarioId;

    try {
      const curtida = await Curtida.findOne({ where: { flow_id, usuario_id } });

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
  /**
 * Lista todas as curtidas associadas a um flow específico.
 *
 * @async
 * @function listarCurtidasPorFlow
 * @param {Object} req - Objeto de requisição Express.
 * @param {Object} req.params - Parâmetros da URL.
 * @param {string|number} req.params.flow_id - ID do flow cujas curtidas serão listadas.
 * @param {Object} res - Objeto de resposta Express.
 * @returns {Object} Retorna um objeto JSON com a lista de curtidas e o total,
 *                   ou uma mensagem informando que nenhuma curtida foi encontrada.
 *
 * @example
 * // GET /curtidas/flow/1
 * {
 *   "total": 3,
 *   "curtidas": [
 *     {
 *       "id": 1,
 *       "flow_id": 1,
 *       "usuario_id": 4,
 *       "flow": { "id": 1, "titulo": "Título A" },
 *       "usuario": { "id": 4, "nome": "João" }
 *     }
 *   ]
 * }
 */
  async listarCurtidasPorFlow(req, res) {
    const { flow_id } = req.params;

    try {
      const curtidas = await Curtida.findAll({
        where: { flow_id },
        include: [
          {
            model: Flow,
            as: "flow",
            attributes: ["id", "titulo"],
          },
          {
            model: Usuario,
            as: "usuario",
            attributes: ["id", "nome"],
          },
        ],
        order: [["criado_em", "ASC"]],
      });

      if (curtidas.length === 0) {
        return res
          .status(200)
          .json({ mensagem: "Nenhuma curtida encontrada para esse flow." });
      }
      res.json({
        total: curtidas.length,
        curtidas,
      });
    } catch (error) {
      res
        .status(500)
        .json({ erro: "Erro ao listar curtidas", detalhes: error.message });
    }
  },
};

module.exports = curtidaController;
