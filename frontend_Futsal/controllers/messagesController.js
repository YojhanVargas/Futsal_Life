const Mensaje = require('../models/mensaje.model');

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
