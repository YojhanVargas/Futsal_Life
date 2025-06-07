const db = require('../config/database');

const Usuario = {
    crear: (usuario, callback) => {
        const query = `
        INSERT INTO usuario (Nombre, Apellido, Correo, Direccion, Telefono, Contraseña, Id_Rol)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(query, [
            usuario.Nombre,
            usuario.Apellido,
            usuario.Correo,
            usuario.Direccion,
            usuario.Telefono,
            usuario.Contraseña,
            usuario.Id_Rol
           ], callback); 
    },

    buscarPorCorreo: (correo, callback) => {
        db.query('SELECT * FROM usuario WHERE Correo = ?', [correo], callback);
    }
};

module.exports= Usuario;