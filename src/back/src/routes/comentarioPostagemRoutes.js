const express = require('express');
const router = express.Router();
const comentarioPostagemController = require('../controllers/comentarioPostagemController');
const auth = require('../middlewares/auth');

router.post('/', auth, comentarioPostagemController.comentar); // Create
router.get('/:id', comentarioPostagemController.obter); // Read
router.put('/:id', auth, comentarioPostagemController.atualizar); // Update
router.delete('/:id', auth, comentarioPostagemController.deletar); // Delete
router.get('/postagem/:postagem_id/comentarios', comentarioPostagemController.listar); // listar comentarios
router.get('/postagem/comentarios/:comentario_pai_id/respostas', comentarioPostagemController.listarRespostas); // listar comentarios que sao filhos


module.exports = router;