const express = require('express');
const router = express.Router();
const correoCtrl = require('../controllers/correo.controller');

router.post('/enviar-correo', correoCtrl.enviarCorreoPersonalizado);

module.exports = router;
