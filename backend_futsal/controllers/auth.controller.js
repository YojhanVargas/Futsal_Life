const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model'); // Asegúrate de que la ruta a tu modelo sea correcta
const db = require('../config/database'); // Asegúrate de que la ruta a tu config de BD sea correcta
require('dotenv').config();

/**
 * Función para registrar un nuevo usuario.
 * Guarda los datos básicos en la tabla 'usuario', el perfil en 'perfil'
 * y el Id_Categoria (si aplica) en la misma tabla 'usuario'.
 */
const registrar = async (req, res) => {
    // Recibe todos los campos del frontend. Id_Categoria puede ser undefined.
    const { Nombre, Apellido, Correo, Direccion, Telefono, Contraseña, Id_Rol, Id_Categoria } = req.body;

    // Validación de campos básicos
    if (!Nombre || !Apellido || !Correo || !Direccion || !Telefono || !Contraseña || !Id_Rol) {
        return res.status(400).json({ mensaje: 'Todos los campos básicos son obligatorios' });
    }
    
    // Validación de categoría para roles que la requieren
    if ((Id_Rol === '2' || Id_Rol === '3') && !Id_Categoria) {
        return res.status(400).json({ mensaje: 'La categoría es obligatoria para jugadores y acudientes.' });
    }

    // Comprobar si el correo ya existe
    Usuario.buscarPorCorreo(Correo, async (err, resultados) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al verificar el correo en la base de datos' });
        }
        if (resultados.length > 0) {
            return res.status(409).json({ mensaje: 'El correo electrónico ya está registrado' });
        }

        try {
            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(Contraseña, 10);
            
            // Prepara el Id_Categoria: será el valor recibido o NULL si no aplica
            const categoriaParaInsertar = (Id_Rol === '2' || Id_Rol === '3') ? Id_Categoria : null;

            // Consulta para insertar el nuevo usuario con todos sus datos
            const queryUsuario = `
                INSERT INTO usuario (Nombre, Apellido, Correo, Contraseña, Id_Rol, Id_Categoria)
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            db.query(queryUsuario, [Nombre, Apellido, Correo, hashedPassword, Id_Rol, categoriaParaInsertar], (err, resultUsuario) => {
                if (err) {
                    console.error('Error al registrar usuario:', err);
                    return res.status(500).json({ mensaje: 'Error interno al registrar el usuario' });
                }

                const Id_Usuario = resultUsuario.insertId;

                // Crear el perfil asociado al usuario
                const queryPerfil = `
                    INSERT INTO perfil (Nombre, Direccion, Telefono, Id_Usuario)
                    VALUES (?, ?, ?, ?)
                `;

                db.query(queryPerfil, [Nombre, Direccion, Telefono, Id_Usuario], (err) => {
                    if (err) {
                        console.error('Error al crear el perfil:', err);
                        return res.status(500).json({ mensaje: 'Error interno al crear el perfil del usuario' });
                    }
                    
                    // Si todo ha ido bien, se envía la respuesta de éxito
                    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
                });
            });
        } catch (error) {
            console.error('Error de servidor:', error);
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    });
};

/**
 * Función para iniciar sesión.
 */
const login = (req, res) => {
    const { Correo, Contraseña } = req.body;

    if (!Correo || !Contraseña) {
        return res.status(400).json({ mensaje: 'Correo y contraseña son requeridos' });
    }

    Usuario.buscarPorCorreo(Correo, async (err, resultados) => {
        if (err || resultados.length === 0) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

        const usuario = resultados[0];
        const passwordValida = await bcrypt.compare(Contraseña, usuario.Contraseña);

        if (!passwordValida) {
            return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({
            id: usuario.Id_Usuario,
            rol: usuario.Id_Rol,
            nombre: usuario.Nombre
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            mensaje: 'Inicio de sesión exitoso',
            token,
            usuario: {
                id: usuario.Id_Usuario,
                nombre: usuario.Nombre,
                rol: usuario.Id_Rol
            }
        });
    });
};

module.exports = {
    registrar,
    login
};
