const Convocatoria = require('../models/convocatoria.model');
const Mensaje = require('../models/mensaje.model');


// Función para crear convocatoria
exports.addConvocatoria = (req, res) => {
  const { idPartido, idJugador, respuesta } = req.body;

  // Validaciones básicas
  if (!idPartido || !idJugador || !respuesta) {
    return res.status(400).json({ error: 'idPartido, idJugador y respuesta son obligatorios' });
  }

  Convocatoria.crear(idPartido, idJugador, respuesta, (err, result) => {
    if (err) {
      console.error('💥 Error al crear convocatoria:', err.message); // Mostramos mensaje en consola
      return res.status(500).json({ error: err.message });
    }

    // Enviar mensaje de notificación
    const contenido = `Has sido convocado al partido con ID ${idPartido}. Ingresa a la plataforma y responde si asistirás.`;
    const idEmisor = 1; // Entrenador o sistema
    
    Mensaje.enviar(idEmisor, idJugador, contenido, (err2) => {
      if (err2) {
        console.error('No se pudo enviar el mensaje:', err2.message);
        // No detenemos la respuesta principal si falla el mensaje
      }
    });

    res.status(201).json({
      idConvocatoria: result.insertId,
      idPartido,
      idJugador,
      respuesta
    });
  });
};

// Función para listar convocatorias por partido
exports.getConvocatorias = (req, res) => {
  const { idPartido } = req.params;

  if (!idPartido) {
    return res.status(400).json({ error: 'idPartido es obligatorio' });
  }

  Convocatoria.listarPorPartido(idPartido, (err, results) => {
    if (err) {
      console.error('💥 Error al listar convocatorias:', err.message); // Mostramos mensaje en consola
      return res.status(500).json({ error: err.message });
    }

    res.json(results);
  });
};
