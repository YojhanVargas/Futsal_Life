const db = require('../config/database');

const Usuario = {
    crear: (usuario, callback) => {
        const query = `
        INSERT INTO usuario (Nombre, Apellido, Correo, Contraseña, Id_Rol, Telefono_Celular, Direccion)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(query, [
            usuario.Nombre,
            usuario.Apellido,
            usuario.Correo,
            usuario.Telefono_Celular,
            usuario.Direccion,
            usuario.Contraseña,
            usuario.Id_Rol
           ], callback); 
    },

    buscarPorCorreo: (correo, callback) => {
        db.query('SELECT * FROM usuario WHERE Correo = ?', [correo], callback);
    }
};

module.exports= Usuario;