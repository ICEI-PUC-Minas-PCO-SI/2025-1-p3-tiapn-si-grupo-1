const express = require('express');
const router = express.Router();
const flowSalvoController = require('../controllers/flowsalvoController');
const auth = require('../middlewares/auth');

router.post('/', flowSalvoController.criar);
router.get('/', flowSalvoController.listar);

router.get('/:id', flowSalvoController.obter);
router.delete('/:id', flowSalvoController.deletar);

module.exports = router;
