const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');
const db = require('../config/database');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Registrar nuevo usuario
const registrar = async (req, res) => {
  const { Nombre, Apellido, Correo, Direccion, Telefono, Contraseña, Id_Rol, Id_Categoria } = req.body;

  if (!Nombre || !Apellido || !Correo || !Direccion || !Telefono || !Contraseña || !Id_Rol) {
    return res.status(400).json({ mensaje: 'Todos los campos básicos son obligatorios' });
  }

  if ((Id_Rol === '2' || Id_Rol === '3') && !Id_Categoria) {
    return res.status(400).json({ mensaje: 'La categoría es obligatoria para jugadores y acudientes.' });
  }

  Usuario.buscarPorCorreo(Correo, async (err, resultados) => {
    if (err) return res.status(500).json({ mensaje: 'Error al verificar el correo en la base de datos' });
    if (resultados.length > 0) return res.status(409).json({ mensaje: 'El correo electrónico ya está registrado' });

    try {
      const hashedPassword = await bcrypt.hash(Contraseña, 10);
      const categoriaParaInsertar = (Id_Rol === '2' || Id_Rol === '3') ? Id_Categoria : null;

      const queryUsuario = `
        INSERT INTO usuario (Nombre, Apellido, Correo, Contraseña, Id_Rol, Id_Categoria)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      db.query(queryUsuario, [Nombre, Apellido, Correo, hashedPassword, Id_Rol, categoriaParaInsertar], (err, resultUsuario) => {
        if (err) return res.status(500).json({ mensaje: 'Error interno al registrar el usuario' });

        const Id_Usuario = resultUsuario.insertId;

        const queryPerfil = `
          INSERT INTO perfil (Nombre, Direccion, Telefono, Id_Usuario)
          VALUES (?, ?, ?, ?)
        `;

        db.query(queryPerfil, [Nombre, Direccion, Telefono, Id_Usuario], (err) => {
          if (err) return res.status(500).json({ mensaje: 'Error interno al crear el perfil del usuario' });
          res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
        });
      });
    } catch (error) {
      console.error('Error de servidor:', error);
      res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  });
};

// Login
const login = (req, res) => {
  const { Correo, Contraseña } = req.body;

  if (!Correo || !Contraseña) {
    return res.status(400).json({ mensaje: 'Correo y contraseña son requeridos' });
  }

  Usuario.buscarPorCorreo(Correo, async (err, resultados) => {
    if (err || resultados.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    const usuario = resultados[0];
    const passwordValida = await bcrypt.compare(Contraseña, usuario.Contraseña);

    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
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

// Recuperar contraseña
const recuperarPassword = async (req, res) => {
  const { correo } = req.body;

  if (!correo) {
    return res.status(400).json({ mensaje: 'El correo es requerido' });
  }

  Usuario.buscarPorCorreo(correo, async (err, resultados) => {
    if (err || resultados.length === 0) {
      return res.status(404).json({ mensaje: 'Correo no encontrado' });
    }

    const usuario = resultados[0];
    const token = jwt.sign(
      { id: usuario.Id_Usuario, correo: usuario.Correo },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false // Soporta certificados autofirmados
      }
    });

    try {
      await transporter.sendMail({
        from: '"Escuela Futsal Life" <soporte@futsallife.com>',
        to: correo,
        subject: "⚽ Restablece tu contraseña - Futsal Life",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #eaf4ff; padding: 20px; border-radius: 8px;">
            <div style="text-align: center;">
              <img src="https://cdn-icons-png.flaticon.com/512/861/861512.png" alt="Futsal Life" width="80" style="margin-bottom: 20px;" />
            </div>      
            <h2 style="color: #004080;">¡Recupera el control de tu cuenta!</h2>
            <p>Hola,</p>
            <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta en <strong>Futsal Life</strong>. Si no realizaste esta solicitud, puedes ignorar este mensaje.</p>
            <p>De lo contrario, haz clic en el siguiente botón para crear una nueva contraseña:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Restablecer Contraseña</a>
            </div>
            <p>O copia y pega este enlace en tu navegador:</p>
            <p style="word-break: break-all;"><a href="${resetLink}">${resetLink}</a></p>
            <p style="font-size: 0.9em; color: #555;">Este enlace caduca en 1 hora por tu seguridad.</p>
            <hr />
            <p style="font-size: 0.8em; text-align: center; color: #888;">⚽ Escuela Futsal Life - Comprometidos con tu formación deportiva</p>
          </div>
        `
      });

      res.json({ mensaje: 'Correo enviado con éxito. Revisa tu bandeja de entrada.' });
    } catch (error) {
      console.error('Error al enviar correo:', error);
      res.status(500).json({ mensaje: 'No se pudo enviar el correo' });
    }
  });
};

// Restablecer contraseña con token
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { nuevaPassword } = req.body;

  if (!token || !nuevaPassword) {
    return res.status(400).json({ mensaje: 'Token y nueva contraseña son requeridos' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const correo = decoded.correo;
    const hash = await bcrypt.hash(nuevaPassword, 10);

    db.query('UPDATE usuario SET Contraseña = ? WHERE Correo = ?', [hash, correo], (error) => {
      if (error) {
        console.error('Error al actualizar contraseña:', error);
        return res.status(500).json({ mensaje: 'Error al actualizar la contraseña' });
      }

      res.json({ mensaje: 'Contraseña actualizada correctamente' });
    });
  } catch (error) {
    console.error('Error con token:', error);
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};

module.exports = {
  registrar,
  login,
  recuperarPassword,
  resetPassword
};