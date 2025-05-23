const { Flow, Usuario, Comentario } = require('../models');

const flowController = {
  
  // Listar todos os flows (exibido no feed)
  async listar(req, res) {
    try {
      const flows = await Flow.findAll({
        include: {
          model: Usuario,
          attributes: ['id', 'nome']
        },
        order: [['criado_em', 'DESC']]
      });
      res.json(flows);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar flows', detalhes: error.message });
    }
  },

  // Obter detalhes de um flow específico
  async obter(req, res) {
    try {
      const flow = await Flow.findByPk(req.params.id, {
        include: [
          {
            model: Usuario,
            attributes: ['id', 'nome', 'email']
          },
          {
            model: Comentario,
            include: { model: Usuario, attributes: ['id', 'nome'] },
            order: [['criado_em', 'ASC']]
          }
        ]
      });

      if (!flow) {
        return res.status(404).json({ erro: 'Flow não encontrado' });
      }

      res.json(flow);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar flow', detalhes: error.message });
    }
  },

  // Criar um novo flow
  async criar(req, res) {
    try {
      const { titulo, descricao, conteudo_nos, conteudo_conexoes, categoria, tags, status } = req.body;

      const novoFlow = await Flow.create({
        titulo,
        descricao,
        conteudo_nos,
        conteudo_conexoes,
        categoria,
        tags,
        status,
        criado_por: req.usuarioId
      });

      res.status(201).json(novoFlow);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao criar flow', detalhes: error.message });
    }
  },

  // Atualizar um flow existente (somente quem criou)
  async atualizar(req, res) {
    try {
      const flow = await Flow.findByPk(req.params.id);

      if (!flow) {
        return res.status(404).json({ erro: 'Flow não encontrado' });
      }

      if (flow.criado_por !== req.usuarioId) {
        return res.status(403).json({ erro: 'Permissão negada' });
      }

      const { titulo, descricao, conteudo_nos, conteudo_conexoes, categoria, tags, status } = req.body;

      await flow.update({
        titulo,
        descricao,
        conteudo_nos,
        conteudo_conexoes,
        categoria,
        tags,
        status
      });

      res.json({ mensagem: 'Flow atualizado com sucesso' });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao atualizar flow', detalhes: error.message });
    }
  },

  // Deletar um flow
  async deletar(req, res) {
    try {
      const flow = await Flow.findByPk(req.params.id);

      if (!flow) {
        return res.status(404).json({ erro: 'Flow não encontrado' });
      }

      if (flow.criado_por !== req.usuarioId) {
        return res.status(403).json({ erro: 'Permissão negada' });
      }

      await flow.destroy();
      res.json({ mensagem: 'Flow deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao deletar flow', detalhes: error.message });
    }
  }
};

module.exports = flowController;
