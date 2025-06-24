const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS
  }
});

exports.enviarCorreoPersonalizado = (req, res) => {
  const { nombreRemitente, destinatario, contenido } = req.body;

  if (!nombreRemitente || !destinatario || !contenido) {
    return res.status(400).json({ error: 'Faltan datos necesarios.' });
  }

  const fecha = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });

  const cuerpo = `De: ${nombreRemitente}\nFecha: ${fecha}\nMensaje: ${contenido}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: destinatario,
    subject: 'Mensaje personal de Futsal Life',
    text: cuerpo
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Error al enviar correo:', error.message);
      return res.status(500).json({ error: 'Error al enviar correo' });
    } else {
      console.log('📧 Correo enviado:', info.response);
      res.json({ success: true, mensaje: 'Correo enviado correctamente' });
    }
  });
};
