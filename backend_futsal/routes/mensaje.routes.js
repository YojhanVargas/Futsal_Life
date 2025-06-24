const express = require('express'); 
const router = express.Router();
const mensajeCtrl = require('../controllers/mensaje.controller');

// Obtener mensajes por usuario
router.get('/mensajes/:idUsuario', mensajeCtrl.getMensajesPorUsuario);

// ✅ Enviar correo personalizado
router.post('/mensajes/enviar-correo', mensajeCtrl.enviarCorreoPersonalizado);

module.exports = router;
