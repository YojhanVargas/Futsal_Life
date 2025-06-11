const express = require('express');
const router = express.Router();
const {verificarToken, soloEntrenadores } = require('../middlewares/auth.middleware');
const equipoController = require('../controllers/equipo.controller');

//proteger todas las rutas con verificarToken
router.post('/', verificarToken, soloEntrenadores, equipoController.crearEquipo);
router.get('/', verificarToken, equipoController.obtenerEquipos);
router.put('/:id', verificarToken, soloEntrenadores, equipoController.actualizarEquipo);
router.delete('/:id', verificarToken, soloEntrenadores, equipoController.eliminarEquipo);

module.exports = router;