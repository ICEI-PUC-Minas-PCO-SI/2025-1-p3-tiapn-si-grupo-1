const { PostagemComunidade, ComentarioPostagem, Usuario } = require("../models");
const auth = require('../middlewares/auth');

const criar = async (req, res) => {
    try {
        if (!req.usuarioId) {
          return res.status(401).json({ erro: "Usuário não autenticado." });
        }
        const novaPostagem = await PostagemComunidade.create({ ...req.body, criado_por: req.usuarioId });
        res.status(201).json(novaPostagem);
    } catch (erro) {
        console.error('Erro ao criar postagem:', erro);
        res.status(500).json({ erro: 'Erro ao criar a postagem.', detalhes: erro.message });
    }
};

const listarTodas = async (req, res) => {
  try {
    const postagens = await PostagemComunidade.findAll({
      include: [
        {
          model: ComentarioPostagem,
          as: 'comentarios',
          include: [
            {
              model: Usuario,
              as: 'usuario',
              attributes: ['id', 'nome', 'email']
            }
          ],
          order: [['criado_em', 'ASC']]
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nome', 'email']
        }
      ]
    });
    res.status(200).json(postagens);
  } catch (erro) {
    console.error('Erro ao listar postagens:', erro);
    res.status(500).json({ erro: 'Erro ao buscar postagens.', detalhes: erro.message });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const postagem = await PostagemComunidade.findByPk(req.params.id, {
      include: [
        {
          model: ComentarioPostagem,
          as: 'comentarios',
          include: [
            {
              model: Usuario,
              as: 'usuario',
              attributes: ['id', 'nome', 'email']
            }
          ],
          order: [['criado_em', 'ASC']]
        },
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nome', 'email']
        }
      ]
    });

    if (!postagem) {
      return res.status(404).json({ erro: 'Postagem não encontrada' });
    }

    res.status(200).json(postagem);
  } catch (erro) {
    console.error('Erro ao buscar postagem:', erro);
    res.status(500).json({ erro: 'Erro ao buscar postagem.', detalhes: erro.message });
  }
};

const atualizar = async (req, res) => {
    try {
        const postagem = await PostagemComunidade.findByPk(req.params.id);
        if (!postagem) {
            return res.status(404).json({ erro: 'Postagem não encontrada.' });
        }
        await postagem.update(req.body);
        res.status(200).json(postagem);
    } catch (erro) {
        console.error('Erro ao atualizar postagem:', erro);
        res.status(500).json({ erro: 'Erro ao atualizar postagem.', detalhes: erro.message });
    }
};

const deletar = async (req, res) => {
    try {
        const postagem = await PostagemComunidade.findByPk(req.params.id);
        if (!postagem) {
            return res.status(404).json({ erro: 'Erro ao excluir postagem.' });
        }
        await postagem.destroy();
        res.status(204).send();
    } catch (erro) {
        console.error('Erro ao deletar postagem:', erro);
        res.status(500).json({ erro: 'Erro ao excluir postagem.', detalhes: erro.message });
    }
};

module.exports = {
    criar,
    listarTodas,
    buscarPorId,
    atualizar,
    deletar
};