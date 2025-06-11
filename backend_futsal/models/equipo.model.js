const db = require('../config/database');

const Equipo = {
    crear: (equipo, callback) => {
        const query = `
        INSERT INTO equipo (Nombre, Categoria)
        Values (?, ?)
        `;
        db.query(query, [equipo.Nombre, equipo.Categoria], callback);
    },

    obtenerTodos: (callback) => {
        db.query('SELECT * FROM equipo', callback);
    },

    actualizar: (idEquipo, equipo, callback) => {
        const query = `
        UPDATE equipo
        SET Nombre = ?, Categoria = ?
        WHERE Id_Equipo = ?
        `;
        db.query(query, [equipo.Nombre, equipo.Categoria, idEquipo], callback);
    },

    eliminar: (idEquipo, callback) => {
        db.query('DELETE FROM equipo WHERE Id_Equipo = ?', [idEquipo], callback);
    }
};

module.exports = Equipo;