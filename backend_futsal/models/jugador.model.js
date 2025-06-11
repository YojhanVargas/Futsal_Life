const db = require('../config/database');
const { crear, actualizar, eliminar } = require('./equipo.model');

const Jugador = {
    crear: (jugador, callback) => {
        const query = `
        INSERT INTO jugador (Id_Usuario, Id_Equipo)
        VALUES (?, ?)
        `;
        db.query(query, [jugador.Id_Usuario, jugador.Id_Equipo], callback);
    },

    obtenerTodos: (callback) => {
        const query = `
        SELECT jugador.Id_Jugador, usuario.Nombre, usuario.Apellido, usuario.Correo, equipo.Nombre AS Equipo
        FROM jugador
        JOIN usuario ON jugador.Id_Usuario = usuario.Id_Usuario
        JOIN equipo ON jugador.Id_Equipo = equipo.Id_Equipo
        `;
        db.query(query, callback);
    },

    actualizar: (id, jugador, callback) => {
        const query = `
        UPDATE jugador
        SET Id_Usuario = ?, Id_Equipo = ?
        WHERE Id_Jugador = ?
        `;
        db.query(query, [jugador.Id_Usuario, jugador.Id_Equipo, id], callback);
    },

    eliminar: (id, callback) => {
        db.query('DELETE FROM jugador WHERE Id_Jugador = ?', [id], callback);
    }
};

module.exports = Jugador;