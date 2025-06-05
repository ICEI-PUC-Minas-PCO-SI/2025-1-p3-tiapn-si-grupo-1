const {
  ComentarioPostagem,
  Usuario,
  PostagemComunidade,
} = require("../models");

const comentarioPostagemController = {
  //criar comentario postagem
  async comentar(req, res) {
    try {
      const { mensagem, postagem_id } = req.body;

      if (!mensagem || mensagem.trim() === "") {
        return res.status(400).json({ erro: "Comentario vazio" });
      }

      if (!postagem_id) {
        return res.status(400).json({ erro: "postagen_id é obrigatório" });
      }

      const novoComentarioPostagem = await ComentarioPostagem.create({
        mensagem,
        usuario_id: req.usuarioId,
        postagem_id,
      });

      res.status(201).json(novoComentarioPostagem);
    } catch (error) {
      res.status(500).json({
        erro: "Erro ao criar comentário na postagem",
        detalhes: error.message,
      });
    }
  },

  //Obter detalhes de um comentario em uma postagem
  async obter(req, res) {
    try {
      const comentarioPostagem = await ComentarioPostagem.findByPk(
        req.params.id,
        {
          include: [
            {
              model: Usuario,
              as: "usuario",
              attributes: ["id", "nome"],
            },
            {
              model: PostagemComunidade,
              as: "postagemComunidade",
              attributes: ["id", "titulo"],
              include: {
                model: Usuario,
                as: "usuario",
                attributes: ["id", "nome"],
              },
            },
          ],
        }
      );

      if (!comentarioPostagem) {
        return res.status(400).json({ erro: "Comentario não encontrado" });
      }

      res.json(comentarioPostagem);
    } catch (error) {
      res.status(500).json({
        erro: "Erro ao buscar comentário na postagem",
        detalhes: error.message,
      });
    }
  },

  // Atualizar um comentário em uma postagem
  async atualizar(req, res) {
    try {
      const comentarioPostagem = await ComentarioPostagem.findByPk(
        req.params.id
      );

      if (!comentarioPostagem) {
        return res.status(404).json({ erro: "Comentário não existe" });
      }

      if (comentarioPostagem.usuario_id !== req.usuarioId) {
        return res.status(403).json({ erro: "Permissão negada" });
      }
        
      const { mensagem } = req.body;

      if (!mensagem || mensagem.trim() === "") {
        return res.status(400).json({ erro: "Mensagem não pode estar vazia" });
      }

   

      await comentarioPostagem.update({ mensagem });

      res.json({ mensagem: "Comentário atualizado com sucesso" });
    } catch (error) {
      res.status(500).json({
        erro: "Erro ao atualizar o comentário na postagem",
        detalhes: error.message,
      });
    }
  },
  // Deletar um comentário em uma postagem
  async deletar(req, res) {
    try {
      const comentarioPostagem = await ComentarioPostagem.findByPk(
        req.params.id
      );

      if (!comentarioPostagem) {
        return res.status(404).json({ erro: "Comentário não encontrado" });
      }

      if (comentarioPostagem.usuario_id !== req.usuarioId) {
        return res.status(403).json({ erro: "Permissão negada" });
      }

      await comentarioPostagem.destroy();
      res.json({ mensagem: "Comentário deletado com sucesso" });
    } catch (error) {
      res.status(500).json({
        erro: "Erro ao deletar comentário na postagem",
        detalhes: error.message,
      });
    }
  },
};

module.exports = comentarioPostagemController;
