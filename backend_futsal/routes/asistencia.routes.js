const express = require('express');
const router = express.Router();
const asistenciaController = require('../controllers/asistencia.controller');

router.get('/', asistenciaController.listarAsistencia); // ?fecha=2025-06-19&categoria=Prejuvenil
router.post('/', asistenciaController.guardarAsistencia); // [{Id_Usuario, Asistio, Fecha}]

module.exports = router;
