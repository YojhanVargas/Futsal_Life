const db = require('../config/database');

const Asistencia = {
  listarPorCategoriaYFecha: (categoria, fecha, callback) => {
    const query = `
      SELECT u.Id_Usuario, u.Nombre, u.Apellido, u.Correo, c.Nombre_Categoria AS Categoria, a.Asistio, a.Fecha
      FROM usuario u
      LEFT JOIN asistencia a ON u.Id_Usuario = a.Id_Usuario AND a.Fecha = ?
      LEFT JOIN categoria c ON u.Id_Categoria = c.Id_Categoria
      WHERE c.Nombre_Categoria = ?
      AND u.Id_Rol = 2
    `;
    db.query(query, [fecha, categoria], callback);
  },

  listarTodosPorFecha: (fecha, callback) => {
    const query = `
      SELECT u.Id_Usuario, u.Nombre, u.Apellido, u.Correo, c.Nombre_Categoria AS Categoria, a.Asistio, a.Fecha
      FROM usuario u
      LEFT JOIN asistencia a ON u.Id_Usuario = a.Id_Usuario AND a.Fecha = ?
      LEFT JOIN categoria c ON u.Id_Categoria = c.Id_Categoria
      WHERE u.Id_Rol = 2
    `;
    db.query(query, [fecha], callback);
  },

  registrarOActualizar: (Id_Usuario, Asistio, Fecha, callback) => {
    const query = `
      INSERT INTO asistencia (Id_Usuario, Asistio, Fecha)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE Asistio = VALUES(Asistio)
    `;
    db.query(query, [Id_Usuario, Asistio, Fecha], callback);
  }
};

module.exports = Asistencia;
