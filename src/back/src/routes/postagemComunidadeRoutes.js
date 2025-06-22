const express = require('express'); 
const router = express.Router();
const postagemController = require('../controllers/postagemComunidadeController');
const auth = require('../middlewares/auth');

router.post('/',auth , postagemController.criar); 
router.get('/', postagemController.listarTodas);

router.get('/:id', postagemController.buscarPorId);
router.put('/:id', auth, postagemController.atualizar);
router.delete('/:id', auth, postagemController.deletar);

module.exports = router; 