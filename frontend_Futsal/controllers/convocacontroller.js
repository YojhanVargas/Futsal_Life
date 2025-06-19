// controllers/convoController.js

// --- SIMULACIÓN DE BASE DE DATOS ---
// Estos datos vivirán en el servidor. Eventualmente, los reemplazarás con
// llamadas a una base de datos real (MongoDB, PostgreSQL, MySQL, etc.).
const allPlayers = [
    { id: 1, name: 'Juan Pérez', category: 'Prejuvenil' },
    { id: 2, name: 'Maria López', category: 'Unica' },
    { id: 3, name: 'Carlos Sanchez', category: 'Juvenil' },
    { id: 4, name: 'Ana Martinez', category: 'Iniciacion' },
    { id: 5, name: 'Pedro Gomez', category: 'Juvenil' },
    { id: 6, name: 'Lucia Fernandez', category: 'Prejuvenil' },
    { id: 7, name: 'Jorge Diaz', category: 'Unica' },
    { id: 8, name: 'Sofia Rodriguez', category: 'Iniciacion' }
];

let convocatorias = [
    {
        id: 1,
        rival: 'Tigres FC',
        fecha: '2025-07-26',
        hora: '10:00',
        categoria: 'Juvenil',
        convocados: [3, 5] // IDs de los jugadores convocados
    },
    {
        id: 2,
        rival: 'Leones del Sur',
        fecha: '2025-07-28',
        hora: '14:30',
        categoria: 'Prejuvenil',
        convocados: [1, 6]
    }
];

// --- FUNCIONES DEL CONTROLADOR ---

/**
 * @desc    Obtener todas las convocatorias.
 * @route   GET /api/convocatorias
 * @access  Publico
 */
const getConvocatorias = (req, res) => {
    // Para que el frontend no tenga que buscar los nombres, el backend puede "poblar" los datos.
    const populatedConvocatorias = convocatorias.map(conv => {
        const convocadosDetails = conv.convocados.map(playerId => {
            return allPlayers.find(p => p.id === playerId);
        }).filter(p => p); // Filtrar por si algún ID no es válido

        return { ...conv, convocados: convocadosDetails };
    });

    res.status(200).json(populatedConvocatorias);
};

/**
 * @desc    Obtener todos los jugadores, opcionalmente filtrados por categoría.
 * @route   GET /api/players
 * @route   GET /api/players?category=Juvenil
 * @access  Publico
 */
const getPlayers = (req, res) => {
    const { category } = req.query;

    if (category) {
        const playersInCategory = allPlayers.filter(p => p.category === category);
        return res.status(200).json(playersInCategory);
    }
    
    res.status(200).json(allPlayers);
};

/**
 * @desc    Crear una nueva convocatoria.
 * @route   POST /api/convocatorias
 * @access  Privado (requiere autenticación de entrenador)
 */
const createConvocatoria = (req, res) => {
    const { rival, fecha, hora, categoria, convocados } = req.body;

    // Validación básica
    if (!rival || !fecha || !hora || !categoria || !convocados) {
        return res.status(400).json({ message: 'Por favor, complete todos los campos requeridos.' });
    }

    const newConvocatoria = {
        id: Date.now(), // Usamos un timestamp como ID único simple
        rival,
        fecha,
        hora,
        categoria,
        convocados // El frontend enviará un array de IDs: [1, 5, 8]
    };

    convocatorias.push(newConvocatoria);

    res.status(201).json(newConvocatoria); // 201 = Creado
};

/**
 * @desc    Eliminar una convocatoria.
 * @route   DELETE /api/convocatorias/:id
 * @access  Privado (requiere autenticación de entrenador)
 */
const deleteConvocatoria = (req, res) => {
    const idToDelete = parseInt(req.params.id, 10);
    const initialLength = convocatorias.length;

    convocatorias = convocatorias.filter(conv => conv.id !== idToDelete);

    if (convocatorias.length === initialLength) {
        return res.status(404).json({ message: 'Convocatoria no encontrada.' });
    }
    
    res.status(200).json({ message: 'Convocatoria eliminada exitosamente.' });
};


// Exportamos todas las funciones para que puedan ser usadas en el archivo de rutas.
module.exports = {
    getConvocatorias,
    getPlayers,
    createConvocatoria,
    deleteConvocatoria
};