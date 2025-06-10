const express = require('express');
const router = express.Router();
const flowSalvoController = require('../controllers/flowsalvoController');
const autenticarToken = require('../middlewares/auth');

router.use(autenticarToken);


router.post('/', flowSalvoController.criar);
router.get('/', flowSalvoController.listar);

router.get('/:usuario_id/:flow_id', flowSalvoController.obter);
router.delete('/:usuario_id/:flow_id', flowSalvoController.deletar);

module.exports = router;