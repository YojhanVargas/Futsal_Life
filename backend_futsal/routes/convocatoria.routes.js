const express = require('express');
const router = express.Router();
const convocatoriaController = require('../controllers/convocatoria.controller');

// Crear una nueva convocatoria + mensaje + correo
router.post('/convocatorias', convocatoriaController.addConvocatoria);

// Obtener convocatorias por partido
router.get('/convocatorias/:idPartido', convocatoriaController.getConvocatorias);

module.exports = router;
