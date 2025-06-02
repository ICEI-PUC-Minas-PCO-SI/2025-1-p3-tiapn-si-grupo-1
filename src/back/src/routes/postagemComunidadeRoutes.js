const express = require('express'); 
const router = express.Router();
const postagemController = require('../controllers/postagemComunidadeController');

router.post('/postagem', postagemController.criar); 
router.get('/postagem', postagemController.listarTodas);
router.get('/postagem/:id', postagemController.buscarPorId);
router.put('/postagem/:id', postagemController.atualizar);
router.delete('/postagem/:id', postagemController.deletar);

module.exports = router; 