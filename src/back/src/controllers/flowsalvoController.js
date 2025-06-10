const { FlowSalvo, Usuario, Flow } = require('../models');

const flowSalvoController = {
  

  async criar(req, res) {
    try {
      const { usuarioId, flowId } = req.body;
      const novo = await FlowSalvo.create({
        usuario_id: usuarioId,
        flow_id: flowId,
      });
      res.status(201).json(novo);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao salvar flow', detalhes: error.message });
    }
  },


 async listar(req, res) {
  try {
    const { usuario_id } = req.query;
    const filtro = {};

    if (usuario_id) filtro.usuario_id = usuario_id;

    const salvos = await FlowSalvo.findAll({
      where: filtro,
      include: [
        { model: Usuario, as: 'usuario', attributes: ['id', 'nome'] },
        { model: Flow, as: 'flow', attributes: ['id', 'titulo'] }
      ],
      order: [['criado_em', 'DESC']]
    });

    res.json(salvos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar flows salvos', detalhes: error.message });
  }
},

  async obter(req, res) {
    try {
      const { usuario_id, flow_id } = req.params;
      
      if (!usuario_id || !flow_id) {
      return res.status(400).json({ erro: "usuario_id e flow_id são obrigatórios /usuario_id/flow_id" });
      }

      const flowsalvo = await FlowSalvo.findOne({
        where: {usuario_id, flow_id},
        include: [
          { model: Usuario,
            as: 'salvoPor',
            attributes: ['id', 'nome'] },
          { model: Flow,
            as: 'flowsSalvos',
            attributes: ['id', 'titulo', 'criado_em'] }
        ]
      });

      if (!flowsalvo) {
        return res.status(404).json({ erro: 'Flow salvo não encontrado' });
      }

      res.json(flowsalvo);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar flow salvo', detalhes: error.message });
    }
  },

async deletar(req, res) {
    const { usuario_id, flow_id } = req.params;
  
    if (!usuario_id || !flow_id) {
      return res.status(400).json({ erro: "usuario_id e flow_id são obrigatórios /usuario_id/flow_id" });
    }
    try {
      const flowsalvo = await FlowSalvo.findOne({ 
        where: { usuario_id, flow_id },
        include: [
          { model: Usuario,
            as: 'salvoPor',
            attributes: ['nome'] },
          { model: Flow,
            as: 'flowsSalvos',
            attributes: ['id', 'titulo', 'criado_em'] }
        ]
      });

      if (!flowsalvo) {
        return res.status(404).json({ erro: "Flowsalvo não encontrado" });
      }

      await flowsalvo.destroy();
      res.json({ mensagem: "Flowsalvo removido com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ erro: "Erro ao remover flowsalvo", detalhes: error.message });
    }
  },
};

module.exports = flowSalvoController;
