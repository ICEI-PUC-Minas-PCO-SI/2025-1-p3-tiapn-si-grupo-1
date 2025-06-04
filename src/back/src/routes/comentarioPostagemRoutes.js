const express = require('express');
const router = express.Router();
const comentarioPostagemController = require('../controllers/comentarioPostagemController');
const auth = require('../middlewares/auth');

router.post('/', auth, comentarioPostagemController.comentar);

router.get('/:id', comentarioPostagemController.obter);
router.put('/:id', auth, comentarioPostagemController.atualizar);
router.delete('/:id', auth, comentarioPostagemController.deletar);


module.exports = router;
