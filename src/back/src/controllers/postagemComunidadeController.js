const { PostagemComunidade, ComentarioPostagem, Usuario } = require("../models");
const auth = require('../middlewares/auth');

const criar = async (req, res) => {
    try{
        const novaPostagem = await PostagemComunidade.create( {...req.body,  criado_por: req.usuarioId} );
       
        res.status(201).json(novaPostagem);
    }catch (erro){
        res.status(500).json({ erro: 'Erro ao criar a postagem.'});
    }

};
const listarTodas = async (req, res) => {
  try {
    const postagens = await PostagemComunidade.findAll({
      include: [
        {
          model: ComentarioPostagem,
          as: 'comentarios', // use o alias correto conforme sua associação
        },
        {
          model: Usuario,
          as: 'usuario', // use o alias correto conforme sua associação
          attributes: ['id', 'nome', 'email'] // opcional: limita os campos retornados
        }
      ]
    });
    res.status(200).json(postagens);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar postagens.'});
  }
};

const buscarPorId = async (req, res) => {
  try {
    const postagem = await PostagemComunidade.findByPk(req.params.id, {
      include: [
        {
          model: ComentarioPostagem,
          as: 'comentarios',
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
    res.status(500).json({ erro: 'Erro ao buscar postagem.'});
  }
}; 

const atualizar = async (req, res) => {
    try {
        const postagem = await PostagemComunidade.findByPk(req.params.id);
        if(!postagem) {
            return res.status(404).json({erro: 'Postagem não encontrada.'});
        }
        await postagem.update(req.body);
        res.status(200).json(postagem);
    }catch (erro){
        res.status(500).json({ erro: 'Erro ao atualizar postagem.' });
    }
}; 
const deletar = async(req, res) => {
    try {
        const postagem = await PostagemComunidade.findByPk(req.params.id);
        if(!postagem){
            return res.status(404).json({erro: 'Erro ao excluir postagem.'});
        }
        await postagem.destroy();
        res.status(204).send();
    } catch (erro){
        res.status(500).json({erro: 'Erro ao excluir postagem. ', detalhes: erro.message});
    }
}; 

PostagemComunidade.hasMany(ComentarioPostagem, { as: 'comentarios', foreignKey: 'postagem_id' });
PostagemComunidade.belongsTo(Usuario, { as: 'usuario', foreignKey: 'criado_por' });

module.exports = {
    criar, 
    listarTodas, 
    buscarPorId, 
    atualizar, 
    deletar
}; 
