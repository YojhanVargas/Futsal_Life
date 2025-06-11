const express = require('express');
const router = express.Router();
const { verificarToken, soloEntrenadores } = require('../middlewares/auth.middleware');
const jugadorController = require('../controllers/jugador.controller');

router.post('/', verificarToken, soloEntrenadores, jugadorController.crearJugador);
router.get('/', verificarToken, jugadorController.obtenerJugadores);
router.put('/:id', verificarToken, soloEntrenadores, jugadorController.actualizarJugador);
router.delete('/:id', verificarToken, soloEntrenadores, jugadorController.eliminarJugador);

module.exports = router;