const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Registro e inicio de sesión
router.post('/register', authController.registrar);
router.post('/login', authController.login);

// Recuperación de contraseña
router.post('/recuperar-password', authController.recuperarPassword); // ✅ Versión que envía correo con botón azul/blanco
// router.post('/forgot-password', authController.forgotPassword); // Alternativa si prefieres otro nombre

// Restablecer contraseña usando token
router.post('/reset-password/:token', authController.resetPassword);

module.exports = router