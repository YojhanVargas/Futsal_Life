const express = require('express');
const router = express.Router();
const { verificarToken } = require('../middlewares/auth.middleware');
const perfilController = require('../controllers/perfil.controller');
const upload = require('../middlewares/uploads');

// Ver perfil del usuario autenticado
router.get('/', verificarToken, perfilController.obtenerPerfil);

// Actualizar perfil (nombre, dirección, teléfono, correo)
router.put('/', verificarToken, perfilController.actualizarPerfil);
router.post('/foto', verificarToken, upload.single('foto'), perfilController.actualizarFotoPerfil);


module.exports = router;
