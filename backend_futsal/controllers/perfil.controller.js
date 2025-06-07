const Perfil = require('../models/perfil.model');
const db = require('../config/database');

// Obtener perfil del usuario autenticado
const obtenerPerfil = (req, res) => {
  const Id_Usuario = req.usuario.id;

  Perfil.obtenerPorUsuario(Id_Usuario, (err, resultados) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener el perfil' });
    if (resultados.length === 0) {
      return res.status(404).json({ mensaje: 'Perfil no encontrado' });
    }
    res.json(resultados[0]);
  });
};

// Actualizar perfil + correo
const actualizarPerfil = (req, res) => {
  const { Nombre, Direccion, Telefono, Correo } = req.body;
  const Id_Usuario = req.usuario.id;

  console.log('Datos que llegan para actualizar perfil:', { Nombre, Direccion, Telefono, Id_Usuario });
  
  if (!Nombre || !Direccion || !Telefono || !Correo) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  // Verificar si el nuevo correo ya existe en otro usuario
  db.query('SELECT * FROM usuario WHERE Correo = ? AND Id_Usuario != ?', [Correo, Id_Usuario], (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error al verificar el correo' });
    if (results.length > 0) {
      return res.status(409).json({ mensaje: 'El correo ya está en uso por otro usuario' });
    }

    // Actualizar correo
    db.query('UPDATE usuario SET Correo = ?, Nombre = ? WHERE Id_Usuario = ?', [Correo, Nombre, Id_Usuario], (err) => {
      if (err) return res.status(500).json({ mensaje: 'Error al actualizar el correo' });

      // Actualizar perfil
      Perfil.actualizar({ Nombre, Direccion, Telefono, Id_Usuario }, (err) => {
        if (err) return res.status(500).json({ mensaje: 'Error al actualizar el perfil' });
        res.json({ mensaje: 'Perfil y correo actualizados correctamente' });
      });
    });
  });
};

module.exports = {
  obtenerPerfil,
  actualizarPerfil
};
