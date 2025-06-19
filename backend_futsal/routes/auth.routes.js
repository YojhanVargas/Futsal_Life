const express = require('express');
const router = express.Router();

// 1. controlador que contiene la lógica de registro y login.
const authController = require('../controllers/auth.controller');

// 2. Define la ruta para el registro.
//    Cuando el frontend envíe una petición POST a '/api/auth/register',
//    se ejecutará la función 'registrar' del controlador.
router.post('/register', authController.registrar);
// 3. Define la ruta para el inicio de sesión.
//    Cuando el frontend envíe una petición POST a '/api/auth/login',
//    se ejecutará la función 'login' del controlador.
router.post('/login', authController.login);

// 4. Exporta el router para que tu archivo principal (server.js) pueda usar estas rutas.
module.exports = router;