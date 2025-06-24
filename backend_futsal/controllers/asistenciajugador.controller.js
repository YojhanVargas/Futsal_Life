const db = require('../config/database');

const listarAsistencia = (req, res) => {
  const { categoria, fecha } = req.query;

  if (!fecha) {
    return res.status(400).json({ mensaje: 'La fecha es requerida' });
  }

  let query = `
  SELECT u.Id_Usuario, u.Nombre, u.Apellido, u.Correo, c.Nombre_Categoria AS Categoria, a.Asistio, a.Fecha
  FROM usuario u
  LEFT JOIN asistencia a ON u.Id_Usuario = a.Id_Usuario AND a.Fecha = ?
  LEFT JOIN categoria c ON u.Id_Categoria = c.Id_Categoria
`;
  const params = [fecha];

  if (categoria && categoria !== 'todas') {
    query += ' WHERE c.Nombre_Categoria = ?';
    params.push(categoria);
  }

  db.query(query, params, (err, resultados) => {
    if (err) {
      console.error('❌ Error en consulta asistencia:', err);
      return res.status(500).json({ mensaje: 'Error al obtener asistencias', error: err });
    }

    res.json(resultados);
  });
};

const guardarAsistencia = (req, res) => {
  const asistencias = req.body; // [{ Id_Usuario, Asistio, Fecha }]

  if (!Array.isArray(asistencias) || asistencias.length === 0) {
    return res.status(400).json({ mensaje: "Lista de asistencia inválida" });
  }

  const operaciones = asistencias.map(a => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO asistencia (Id_Usuario, Asistio, Fecha)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE Asistio = VALUES(Asistio)
      `;
      db.query(query, [a.Id_Usuario, a.Asistio, a.Fecha], (err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  });

  Promise.all(operaciones)
    .then(() => res.json({ mensaje: 'Asistencias registradas correctamente' }))
    .catch(error => {
      console.error('❌ Error al guardar asistencia:', error);
      res.status(500).json({ mensaje: "Error al guardar asistencias", error });
    });
};

module.exports = {
  listarAsistencia,
  guardarAsistencia
};