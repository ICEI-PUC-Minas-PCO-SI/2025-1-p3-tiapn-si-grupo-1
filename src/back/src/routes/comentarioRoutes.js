const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentarioController');
const auth = require('../middlewares/auth');

router.post('/', auth, comentarioController.comentar);
router.get('/:id', comentarioController.obter);

router.put('/:id', auth, comentarioController.atualizar);
router.delete('/:id', auth, comentarioController.deletar);


module.exports = router;
