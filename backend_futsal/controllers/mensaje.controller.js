const Mensaje = require('../models/mensaje.model');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Obtener mensajes internos por usuario
exports.getMensajesPorUsuario = (req, res) => {
  const { idUsuario } = req.params;

  if (!idUsuario) {
    return res.status(400).json({ error: 'idUsuario es obligatorio' });
  }

  Mensaje.obtenerPorUsuario(idUsuario, (err, resultados) => {
    if (err) return res.status(500).json({ error: err });
    res.json(resultados);
  });
};

// Enviar mensaje por correo personalizado con diseño UX/UI
exports.enviarCorreoPersonalizado = (req, res) => {
  const { nombreRemitente, destinatario, contenido } = req.body;

  if (!nombreRemitente || !destinatario || !contenido) {
    return res.status(400).json({ error: 'Faltan datos: nombreRemitente, destinatario o contenido' });
  }

  const fecha = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; background-color: #f9fafe; padding: 24px; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); color: #333;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://cdn-icons-png.flaticon.com/512/861/861512.png" alt="Futsal Life" width="80" style="margin-bottom: 10px;" />
        <h2 style="color: #004080; margin: 0;">Futsal Life</h2>
        <p style="font-size: 14px; color: #777;">Comprometidos con tu formación deportiva</p>
      </div>

      <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />

      <h3 style="color: #1a1a1a; margin-bottom: 10px;">📨 Nuevo mensaje recibido</h3>
      <p><strong>De:</strong> ${nombreRemitente}</p>
      <p><strong>Fecha:</strong> ${fecha}</p>

      <div style="background: #ffffff; padding: 18px; border-radius: 8px; border: 1px solid #dcdcdc; margin-top: 10px; font-size: 15px; line-height: 1.6;">
        ${contenido}
      </div>

      <div style="text-align: center; margin-top: 30px;">
        <a href="https://tusitiofutsallife.com" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px;">Ir a la plataforma</a>
      </div>

      <p style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">Este mensaje fue enviado automáticamente por la plataforma Futsal Life.</p>
    </div>
  `;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"Futsal Life" <${process.env.EMAIL_USER}>`,
    to: destinatario,
    subject: '📩 Nuevo mensaje de Futsal Life',
    html
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Error al enviar correo:', error.message);
      return res.status(500).json({ error: 'Error al enviar correo' });
    }
    console.log('📧 Correo enviado con estilo:', info.response);
    res.status(200).json({ message: 'Correo enviado correctamente', response: info.response });
  });
};
