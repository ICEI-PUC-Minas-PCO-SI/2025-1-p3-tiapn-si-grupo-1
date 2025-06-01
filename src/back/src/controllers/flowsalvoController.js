const { FlowSalvo, Usuario, Flow } = require('../models');

const flowSalvoController = {
  

  async criar(req, res) {
    try {
      const { usuarioId, flowId } = req.body;
      const novo = await FlowSalvo.create({ usuarioId, flowId });
      res.status(201).json(novo);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao salvar flow', detalhes: error.message });
    }
  },


  async listar(req, res) {
    try {
      const salvos = await FlowSalvo.findAll({
        include: [
          { model: Usuario, attributes: ['id', 'nome'] },
          { model: Flow, attributes: ['id', 'titulo'] }
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
      const { id } = req.params;
      const salvo = await FlowSalvo.findByPk(id, {
        include: [
          { model: Usuario, attributes: ['id', 'nome'] },
          { model: Flow, attributes: ['id', 'titulo'] }
        ]
      });

      if (!salvo) {
        return res.status(404).json({ erro: 'Flow salvo não encontrado' });
      }

      res.json(salvo);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar flow salvo', detalhes: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const deletado = await FlowSalvo.destroy({ where: { id } });

      if (deletado === 0) {
        return res.status(404).json({ erro: 'Flow salvo não encontrado' });
      }

      res.json({ mensagem: 'Flow salvo deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao deletar flow salvo', detalhes: error.message });
    }
  }
};

module.exports = flowSalvoController;
