const pool = require('../config/database');

const Mensaje = {};

// ✅ FUNCIÓN para obtener mensajes de un usuario
Mensaje.obtenerPorUsuario = (idUsuario, callback) => {
  pool.query(
    `SELECT 
        m.Id_Mensaje,
        u.Nombre AS Emisor,
        m.Contenido,
        m.FechaEnvio
     FROM mensaje m
     JOIN usuario u ON m.Id_Emisor = u.Id_Usuario
     WHERE m.Id_Receptor = ?
     ORDER BY m.FechaEnvio DESC`,
    [idUsuario],
    callback
  );
};

// ✅ 🔥 FUNCIÓN para enviar mensaje (LA QUE FALTABA)
Mensaje.enviar = (idEmisor, idReceptor, contenido, callback) => {
  const sql = `
    INSERT INTO mensaje (Id_Emisor, Id_Receptor, Contenido, FechaEnvio)
    VALUES (?, ?, ?, NOW())
  `;
  pool.query(sql, [idEmisor, idReceptor, contenido], callback);
};

module.exports = Mensaje;
