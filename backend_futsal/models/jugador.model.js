const db = require('../config/database');

const Jugador = {};

// Tu función original para crear un jugador (no necesita cambios)
Jugador.crear = (jugador, callback) => {
    const query = `
        INSERT INTO jugador (Id_Usuario, Id_Equipo)
        VALUES (?, ?)
    `;
    db.query(query, [jugador.Id_Usuario, jugador.Id_Equipo], callback);
};

// Tu función original para obtener todos (la dejamos por si la usas en otro lado)
Jugador.obtenerTodos = (callback) => {
    const query = `
        SELECT jugador.Id_Jugador, usuario.Nombre, usuario.Apellido, usuario.Correo, equipo.Nombre AS Equipo
        FROM jugador
        JOIN usuario ON jugador.Id_Usuario = usuario.Id_Usuario
        JOIN equipo ON jugador.Id_Equipo = equipo.Id_Equipo
    `;
    db.query(query, callback);
};

// --- NUEVA FUNCIÓN PARA OBTENER LOS DETALLES PARA LA PÁGINA DE LISTADOS ---
// Esta es la función que usará tu jugador.controller.js
Jugador.obtenerTodosConDetalles = (callback) => {
    // Esta consulta une la tabla 'usuario' con la tabla 'categoria'
    // para obtener el nombre de la categoría de cada jugador.
    const query = `
        SELECT 
            u.Id_Usuario,
            u.Nombre,
            u.Apellido,
            u.Correo,
            c.nombre_categoria AS Categoria  -- Asumiendo que tu tabla se llama 'categoria' y la columna 'nombre_categoria'
        FROM 
            usuario u
        LEFT JOIN 
            categoria c ON u.Id_Categoria = c.id_categoria -- Revisa que los nombres de tablas y columnas (Id_Categoria, id_categoria) coincidan con tu BD
        WHERE 
            u.Id_Rol = 2; -- Filtramos para obtener solo a los usuarios con rol de Jugador (Id_Rol = 2)
    `;
    db.query(query, callback);
};


// Tu función original para actualizar (no necesita cambios)
Jugador.actualizar = (id, jugador, callback) => {
    const query = `
        UPDATE jugador
        SET Id_Usuario = ?, Id_Equipo = ?
        WHERE Id_Jugador = ?
    `;
    db.query(query, [jugador.Id_Usuario, jugador.Id_Equipo, id], callback);
};

// Tu función original para eliminar (no necesita cambios)
Jugador.eliminar = (id, callback) => {
    db.query('DELETE FROM jugador WHERE Id_Jugador = ?', [id], callback);
};

// Exportamos todos los métodos, incluyendo el nuevo
module.exports = {
    ...Jugador, // Mantenemos los métodos existentes
    obtenerTodosConDetalles: Jugador.obtenerTodosConDetalles // Y añadimos el nuevo
};