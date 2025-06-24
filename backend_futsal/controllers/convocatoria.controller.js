const Convocatoria = require('../models/convocatoria.model');
const Mensaje = require('../models/mensaje.model');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Transporter para enviar correos
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Tu correo remitente
    pass: process.env.EMAIL_PASS   // Tu clave de aplicación (no contraseña normal)
  }
});

// Crear convocatoria, enviar mensaje interno y correo personalizado
exports.addConvocatoria = (req, res) => {
  const { idPartido, idJugador, respuesta, emailDestinatario, mensajePersonalizado } = req.body;

  // Validación de datos requeridos
  if (!idPartido || !idJugador || !respuesta || !emailDestinatario || !mensajePersonalizado) {
    return res.status(400).json({
      error: 'Faltan datos: idPartido, idJugador, respuesta, emailDestinatario o mensajePersonalizado'
    });
  }

  // Crear en base de datos
  Convocatoria.crear(idPartido, idJugador, respuesta, (err, result) => {
    if (err) {
      console.error('💥 Error al crear convocatoria:', err.message);
      return res.status(500).json({ error: err.message });
    }

    const idEmisor = 1; // ID del sistema o entrenador

    // Enviar mensaje interno
    Mensaje.enviar(idEmisor, idJugador, mensajePersonalizado, (err2) => {
      if (err2) {
        console.error('❌ No se pudo enviar el mensaje interno:', err2.message);
      }
    });

    // Enviar correo personalizado
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailDestinatario,
      subject: 'Convocatoria a partido',
      text: mensajePersonalizado
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('❌ Error al enviar correo:', error.message);
      } else {
        console.log('📧 Correo enviado:', info.response);
      }
    });

    // Respuesta final
    res.status(201).json({
      idConvocatoria: result.insertId,
      idPartido,
      idJugador,
      respuesta
    });
  });
};

// Obtener convocatorias por partido
exports.getConvocatorias = (req, res) => {
  const { idPartido } = req.params;

  if (!idPartido) {
    return res.status(400).json({ error: 'idPartido es obligatorio' });
  }

  Convocatoria.listarPorPartido(idPartido, (err, results) => {
    if (err) {
      console.error('💥 Error al listar convocatorias:', err.message);
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
};
