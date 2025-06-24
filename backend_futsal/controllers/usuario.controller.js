// controllers/usuario.controller.js
const db = require('../config/database');

const actualizarUsuario = (req, res) => {
  const { Id_Usuario, Nombre, Apellido, Correo, Categoria } = req.body;

  if (!Id_Usuario || !Nombre || !Correo || !Categoria) {
    return res.status(400).json({ mensaje: 'Faltan datos requeridos' });
  }

  const query = `
    UPDATE usuario
    SET Nombre = ?, Correo = ?, Id_Categoria = (
      SELECT Id_Categoria FROM categoria WHERE Nombre_Categoria = ?
    )
    WHERE Id_Usuario = ?
  `;

  db.query(query, [Nombre, Correo, Categoria, Id_Usuario], (err, result) => {
    if (err) {
      console.error('Error al actualizar usuario:', err);
      return res.status(500).json({ mensaje: 'Error al actualizar usuario', error: err });
    }

    res.json({ mensaje: 'Usuario actualizado correctamente' });
  });
};

module.exports = {
  actualizarUsuario
};
