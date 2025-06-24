const Partido = require('../models/partido.model');
const db = require('../config/database');

exports.addPartido = (req, res) => {
  const { fecha, hora, lugar, idUsuario } = req.body;

  // Validaciones básicas
  if (!fecha || !hora || !lugar || !idUsuario) {
    return res
      .status(400)
      .json({ error: 'fecha, hora, lugar e idUsuario son obligatorios' });
  }

  // Verificar que el usuario tiene el rol de entrenador
  const query = `
    SELECT Id_Usuario
    FROM usuario
    WHERE Id_Usuario = ? AND Id_Rol = 1`;  // 1 es para el rol de "Entrenador"
  
  db.query(query, [idUsuario], (err, results) => {
    if (err) return res.status(500).json({ error: err });

    if (results.length === 0) {
      return res.status(404).json({ error: 'El usuario no es un entrenador válido.' });
    }

    // Verificar si el Id_Usuario está en la tabla `entrenador`
    const checkEntrenadorQuery = `
      SELECT Id_Entrenador
      FROM entrenador
      WHERE Id_Entrenador = ?`;

    db.query(checkEntrenadorQuery, [idUsuario], (err, results) => {
      if (err) return res.status(500).json({ error: err });

      // Si no existe el entrenador en la tabla, insertamos
      if (results.length === 0) {
        const insertEntrenadorQuery = `
          INSERT INTO entrenador (Id_Entrenador)
          VALUES (?)`;

        db.query(insertEntrenadorQuery, [idUsuario], (err, result) => {
          if (err) return res.status(500).json({ error: err });

          // Ahora que el entrenador ha sido insertado, creamos el partido
          createPartido();
        });
      } else {
        // Si el entrenador ya existe, creamos el partido directamente
        createPartido();
      }
    });
  });

  // Función que crea el partido
  function createPartido() {
    const createQuery = `
      INSERT INTO partido (Fecha, Hora, Lugar, Id_Entrenador)
      VALUES (?, ?, ?, ?)`;

    db.query(createQuery, [fecha, hora, lugar, idUsuario], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({
        idPartido: result.insertId,
        fecha,
        hora,
        lugar,
        idEntrenador: idUsuario
      });
    });
  }
};
