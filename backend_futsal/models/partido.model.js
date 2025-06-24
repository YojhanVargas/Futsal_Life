const db = require('../config/database');

const Partido = {
  crear: (Fecha, Hora, Lugar, Id_Entrenador, callback) => {
    const query = `
      INSERT INTO partido (Fecha, Hora, Lugar, Id_Entrenador)
      VALUES (?, ?, ?, ?)
    `;
    db.query(query, [Fecha, Hora, Lugar, Id_Entrenador], callback);
  }
};

module.exports = Partido;
