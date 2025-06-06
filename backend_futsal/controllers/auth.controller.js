const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');
const db = require('../config/database');
require('dotenv').config();

const registrar = async (req, res) => {
  const { Nombre, Apellido, Correo, Direccion, Telefono, Contraseña, Id_Rol } = req.body;

  if (!Nombre || !Apellido || !Correo || !Direccion || !Telefono || !Contraseña) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  Usuario.buscarPorCorreo(Correo, async (err, resultados) => {
    if (resultados.length > 0) {
      return res.status(409).json({ mensaje: 'El correo ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(Contraseña, 10);

    Usuario.crear({ Nombre, Apellido, Correo, Direccion, Telefono, Contraseña: hashedPassword, Id_Rol }, (err, result) => {
      if (err) return res.status(500).json({ mensaje: 'Error al registrar usuario' });
      res.status(201).json({ mensaje: 'Registro exitoso' });
    });
  });
};

const login = (req, res) => {
  const { Correo, Contraseña } = req.body;

  if (!Correo || !Contraseña) {
    return res.status(400).json({ mensaje: 'Correo y contraseña son requeridos' });
  }

  Usuario.buscarPorCorreo(Correo, async (err, resultados) => {
    if (resultados.length === 0) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    const usuario = resultados[0];
    const passwordValida = await bcrypt.compare(Contraseña, usuario.Contraseña);

    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    const token = jwt.sign({
      id: usuario.Id_Usuario,
      rol: usuario.Id_Rol,
      nombre: usuario.Nombre
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id: usuario.Id_Usuario,
        nombre: usuario.Nombre,
        rol: usuario.Id_Rol
      }
    });
  });
};

module.exports = {
  registrar,
  login
};
