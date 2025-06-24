const db = require('../config/database');

const Convocatoria = {
  // Crear convocatoria
  crear: (Id_Partido, Id_Jugador, Respuesta, callback) => {
    const query = `
      INSERT INTO convocatoria (Id_Partido, Id_Jugador, Respuesta)
      VALUES (?, ?, ?)
    `;
    db.query(query, [Id_Partido, Id_Jugador, Respuesta], callback);
  },

  // Obtener convocatorias por partido
  listarPorPartido: (Id_Partido, callback) => {
  const query = `
        SELECT 
      c.Id_Convocatoria,
      c.Id_Partido,
      c.Id_Jugador,
      c.Respuesta,
      CONCAT(u.Nombre, ' ', u.Apellido) AS NombreJugador,
      IFNULL(cat.Nombre_Categoria, 'Sin categoría') AS Categoria,
      p.Fecha AS Fecha
    FROM convocatoria c
    LEFT JOIN jugador j ON c.Id_Jugador = j.Id_Jugador
    LEFT JOIN usuario u ON j.Id_Usuario = u.Id_Usuario
    LEFT JOIN categoria cat ON u.Id_Categoria = cat.Id_Categoria
    LEFT JOIN partido p ON c.Id_Partido = p.Id_Partido
    WHERE c.Id_Partido = 1;

  `;
    db.query(query, [Id_Partido], callback);
  }
};

module.exports = Convocatoria;
