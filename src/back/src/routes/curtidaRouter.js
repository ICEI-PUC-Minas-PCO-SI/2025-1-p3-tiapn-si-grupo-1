const express = require('express');
const router = express.Router();
const curtidaController = require('../controllers/curtidaController');
const autenticarToken = require('../middlewares/auth');

router.use(autenticarToken);

router.post('/', curtidaController.criar);
router.get('/', curtidaController.listar);

router.get('/:id', curtidaController.obter);
router.delete('/:id', curtidaController.remover);

module.exports = router;
