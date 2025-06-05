const express = require('express');
const router = express.Router();
const flowSalvoController = require('../controllers/flowsalvoController');
const autenticarToken = require('../middlewares/auth');

router.use(autenticarToken);


router.post('/', flowSalvoController.criar);
router.get('/', flowSalvoController.listar);

router.get('/:id', flowSalvoController.obter);
router.delete('/:id', flowSalvoController.deletar);

module.exports = router;