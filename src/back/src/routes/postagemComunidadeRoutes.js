const express = require('express'); 
const router = express.Router();
const postagemController = require('../controllers/postagemComunidadeController');

router.post('/', postagemController.criar); 
router.get('/', postagemController.listarTodas);

router.get('/:id', postagemController.buscarPorId);
router.put('/:id', postagemController.atualizar); // seria bom auth 'segundo caso'
router.delete('/:id', postagemController.deletar); 

module.exports = router; 