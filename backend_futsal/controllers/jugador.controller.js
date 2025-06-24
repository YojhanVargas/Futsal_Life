const db = require('../config/database'); // ✅ Importar conexión
const Jugador = require('../models/jugador.model');

// Crear jugador
const crearJugador = (req, res) => {
    const { Id_Usuario, Id_Equipo } = req.body;

    if (!Id_Usuario || !Id_Equipo) {
        return res.status(400).json({ mensaje: 'Id_Usuario e Id_Equipo son obligatorios' });
    }

    Jugador.crear({ Id_Usuario, Id_Equipo }, (err, result) => {
        if (err) return res.status(500).json({ mensaje: 'Error al crear jugador' });
        res.status(201).json({ mensaje: 'Jugador creado correctamente' });
    });
};

// Obtener jugadores con detalles
const obtenerJugadores = (req, res) => {
    const { categoria } = req.query;

    let query = `
        SELECT u.Id_Usuario, u.Nombre, u.Apellido, c.Nombre_Categoria AS Categoria
        FROM jugador j
        JOIN usuario u ON j.Id_Usuario = u.Id_Usuario
        JOIN categoria c ON u.Id_Categoria = c.Id_Categoria
    `;
    const params = [];

    if (categoria) {
        query += ' WHERE LOWER (c.Nombre_Categoria) = LOWER(?)';
        params.push(categoria);
    }

    console.log("Consulta SQL:", query);
    console.log("Parámetros:", params);

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ error: err });

        // 🔁 Formatear los datos para el frontend
        const jugadoresFormateados = results.map(jugador => ({
            id: jugador.Id_Usuario,
            name: `${jugador.Nombre} ${jugador.Apellido}`,
            category: jugador.Categoria
        }));

        res.json(jugadoresFormateados);
    });
};


// Actualizar jugador
const actualizarJugador = (req, res) => {
    const id = req.params.id;
    const { Id_Usuario, Id_Equipo } = req.body;

    if (!Id_Usuario || !Id_Equipo) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    Jugador.actualizar(id, { Id_Usuario, Id_Equipo }, (err) => {
        if (err) return res.status(500).json({ mensaje: 'Error al actualizar jugador' });
        res.json({ mensaje: 'Jugador actualizado correctamente' });
    });
};

// Eliminar jugador
const eliminarJugador = (req, res) => {
    const id = req.params.id;

    Jugador.eliminar(id, (err) => {
        if (err) return res.status(500).json({ mensaje: 'Error al eliminar jugador' });
        res.json({ mensaje: 'Jugador eliminado correctamente' });
    });
};

module.exports = {
    crearJugador,
    obtenerJugadores,
    actualizarJugador,
    eliminarJugador
};
