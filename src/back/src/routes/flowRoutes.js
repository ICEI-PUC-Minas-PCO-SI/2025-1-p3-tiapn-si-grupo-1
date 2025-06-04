const express = require('express');
const router = express.Router();
const flowController = require('../controllers/flowController');
const auth = require('../middlewares/auth');

router.get('/', flowController.listar);
router.get('/:id', flowController.obter);

router.post('/', auth, flowController.criar);
router.put('/:id', auth, flowController.atualizar);
router.delete('/:id', auth, flowController.deletar);

module.exports = router;
