const express = require('express'); 
const router = express.Router();
const postagemController = require('../controllers/postagemComunidadeController');

router.post('/', postagemController.criar); 
router.get('/', postagemController.listarTodas);

router.get('/:id', postagemController.buscarPorId);
router.put('/:id', postagemController.atualizar);
router.delete('/:id', postagemController.deletar);

module.exports = router; 