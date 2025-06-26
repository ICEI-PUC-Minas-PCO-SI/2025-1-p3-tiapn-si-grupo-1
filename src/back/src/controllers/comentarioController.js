const { Comentario, Usuario, Flow } = require("../models");

const comentarioController = {
  // Usado para criar um comentário
  async comentar(req, res) {
    try {
      const { mensagem, flow_id } = req.body;

      if (!mensagem || mensagem.trim() === "") {
        return res.status(400).json({ erro: "Comentário vazio" });
      }

      if (!flow_id) {
        return res.status(400).json({ erro: "flow_id é obrigatório" });
      }

      const novoComentario = await Comentario.create({
        mensagem,
        usuario_id: req.usuarioId,
        flow_id,
      });

      res.status(201).json(novoComentario);
    } catch (error) {
      res.status(500).json({
        erro: "Erro ao criar comentário",
        detalhes: error.message,
      });
    }
  },

  // Obtem detalhes de um comentário
  async obter(req, res) {
    try {
      const comentario = await Comentario.findByPk(req.params.id, {
        include: [
          {
            model: Usuario,
            as: 'usuario',
            attributes: ["id", "nome"],
          },
          {
            model: Flow,
            as: 'flow',
            attributes: ["id", "titulo"],
            include: {
              model: Usuario,
              as: 'usuario',
              attributes: ["id", "nome"],
            },
          },
        ],
      });

      if (!comentario) {
        return res.status(404).json({ erro: "Comentário não encontrado" });
      }

      res.json(comentario);
    } catch (error) {
      res.status(500).json({
        erro: "Erro ao buscar comentário",
        detalhes: error.message,
      });
    }
  },

  // Atualizar um comentário
  async atualizar(req, res) {
    try {
      const comentario = await Comentario.findByPk(req.params.id);

      if (!comentario) {
        return res.status(404).json({ erro: "Comentário não existe" });
      }

      if (comentario.usuario_id !== req.usuarioId) {
        return res.status(403).json({ erro: "Permissão negada" });
      }

      const { mensagem } = req.body;

      if (!mensagem || mensagem.trim() === "") {
        return res.status(400).json({ erro: "Mensagem não pode estar vazia" });
      }
      

    
      await comentario.update({ mensagem });

      res.json({ mensagem: "Comentário atualizado com sucesso" });
    } catch (error) {
      res.status(500).json({
        erro: "Erro ao atualizar o comentário",
        detalhes: error.message,
      });
    }
  },

  // Deletar um comentário
  async deletar(req, res) {
    try {
      const comentario = await Comentario.findByPk(req.params.id);

      if (!comentario) {
        return res.status(404).json({ erro: "Comentário não encontrado" });
      }

      if (comentario.usuario_id !== req.usuarioId) {
        return res.status(403).json({ erro: "Permissão negada" });
      }

      await comentario.destroy();
      res.json({ mensagem: "Comentário deletado com sucesso" });
    } catch (error) {
      res.status(500).json({
        erro: "Erro ao deletar comentário",
        detalhes: error.message,
      });
    }
  },

  async listar(req, res) {
  try {
    const { flow_id } = req.params;

    if (!flow_id) {
      return res.status(400).json({ erro: 'flow_id é obrigatório' });
    }
    
    const comentarios = await Comentario.findAll({
      where: {
        flow_id,
        comentario_pai_id: null, // somente os comentários raiz
      },
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nome'],
        },
        {
          model: Comentario,
          as: 'respostas',
          include: [
            {
              model: Usuario,
              as: 'usuario',
              attributes: ['id', 'nome'],
            },
          ],
        },
      ],
      order: [
        ['criado_em', 'ASC'],
        [{ model: Comentario, as: 'respostas' }, 'criado_em', 'ASC'],
      ],
    });

    return res.json(comentarios);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro ao listar comentários', detalhes: error.message });
  }
},

async listarRespostas(req, res) {
  try {
    const { comentario_pai_id } = req.params;

    if (!comentario_pai_id) {
      return res.status(400).json({ erro: 'comentario_pai_id é obrigatório' });
    }

    const respostas = await Comentario.findAll({
      where: {
        comentario_pai_id,
      },
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nome'],
        },
        {
          model: Comentario,
          as: 'respostas',
          include: [
            {
              model: Usuario,
              as: 'usuario',
              attributes: ['id', 'nome'],
            },
          ],
        },
      ],
      order: [
        ['criado_em', 'ASC'],
        [{ model: Comentario, as: 'respostas' }, 'criado_em', 'ASC'],
      ],
    });

    return res.json(respostas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      erro: 'Erro ao listar respostas',
      detalhes: error.message,
    });
  }
},

};

module.exports = comentarioController;
