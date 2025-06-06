const db = require('../config/database');

const perfil = {
    obtenerPorUsuario: (idUsuario, callback) => {
        const query = `
        SELECT p.*, u.correo
        FROM perfil p
        JOIN usuario u ON p.Id_Usuario = u.Id_Usuario
        WHERE p.Id_Usuario = ?
        `;
        db.query(query, [idUsuario], callback);
    },

    actualizar: (perfil, callback) => {
        const query = `
        UPDATE perfil
        SET Nombre = ?, Direccion = ?, Telefono = ?
        WHERE Id_Usuario = ?
        `;
        db.query(query, [
            perfil.Nombre,
            perfil.Direccion,
            perfil.Telefono,
            perfil.Id_Usuario
        ], callback);
    }
};

module.exports= perfil;