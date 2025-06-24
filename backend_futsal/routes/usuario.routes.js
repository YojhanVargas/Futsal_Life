const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

router.put('/:id', usuarioController.actualizarUsuario);

module.exports = router;
