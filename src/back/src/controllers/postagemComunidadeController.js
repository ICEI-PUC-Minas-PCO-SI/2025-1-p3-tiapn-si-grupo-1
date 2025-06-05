const { ComentarioPost, PostagemComunidade } = require('../models');

const criar = async (req, res) => {
    try{
        const novaPostagem = await PostagemComunidade.create(req.body);
        res.status(201).json(novaPostagem);
    }catch (erro){
        res.status(500).json({ erro: 'Erro ao criar a postagem.', detalhes: erro.message});
    }

};
const listarTodas = async (req, res) => {
    try {
        const postagens = await PostagemComunidade.findAll();
        res.status(200).json(postagens);
    }catch (erro){
        res.status(500).json({ erro: 'Erro ao buscar postagens.', detalhes: erro.message});
    }
};
 
const buscarPorId = async (req, res) => {
    try {
        const postagem = await PostagemComunidade.findByPk(req.params.id);
        if (!postagem){
            return res.status(404).json({ erro: 'Postagem não encontrada'}); 
        }
        res.status(200).json(postagem);
    } catch(erro){
        res.status(500).json({erro: 'Erro ao buscar postagem.', detalhes: erro.message});
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
        res.status(500).json({ erro: 'Erro ao atualizar postagem.', detalhes: erro.message });
    }
}; 
const deletar = async(req, res) => {
    try {
        const postagem = await PostagemComunidade.findByPk(req.params.id);
        if(!postagem){
            return res.status(404).json({erro: 'Erro ao excluir postagem.', detalhes: erro.message});
        }
        await postagem.destroy();
        res.status(204).send();
    } catch (erro){
        res.status(500).json({erro: 'Erro ao excluir postagem. ', detalhes: erro.message});
    }
}; 

module.exports = {
    criar, 
    listarTodas, 
    buscarPorId, 
    atualizar, 
    deletar
}; 
