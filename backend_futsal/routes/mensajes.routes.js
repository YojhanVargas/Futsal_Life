const express = require('express');
const router = express.Router();
const mensajeCtrl = require('../controllers/mensaje.controller');

router.get('/mensajes/:idUsuario', mensajeCtrl.getMensajesPorUsuario);

module.exports = router;
