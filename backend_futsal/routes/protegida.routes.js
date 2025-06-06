const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/auth.middleware');

router.get('/bienvenido', verificarToken, (req, res) => {
    res.json({
        mensaje: `Hola ${req.usuario.nombre}, accediste a una ruta protegida.`,
        datos: req.usuario
    });
});

module.exports = router;