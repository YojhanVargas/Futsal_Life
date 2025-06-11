const Jugador = require('../models/jugador.model');

//crear jugador 
const crearJugador = (req, res) => {
    const { Id_Usuario, Id_Equipo } = req.body;
    
    if(!Id_Usuario || !Id_Equipo) {
        return res.status(400).json({ mensaje: 'Id_Usuario e Id_Equipo son obligatorios'});
    }

    Jugador.crear({ Id_Usuario, Id_Equipo}, (err, result) => {
        if (err) return res.status(500).json({ mensaje: 'Error al crear jugador'});
        res.status(201).json({ mensaje: 'Jugador creado correctamente'});
    });
};

//obtener todos los jugadores
const obtenerJugadores = (req, res) => {
    Jugador.obtenerTodos((err, resultados) => {
        if (err) return res.status(500).json({ mensaje: 'Error al obtener jugadores'});
        res.json(resultados);
    });
};

//actualizar jugador
const actualizarJugador = (req, res) => {
    const id = req.params.id;
    const { Id_Usuario, Id_Equipo } = req.body;

    if (!Id_Usuario || !Id_Equipo) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios'});
    }

    Jugador.actualizar(id, { Id_Usuario, Id_Equipo}, (err) => {
        if (err) return res.status(500).json({ mensaje: 'Error al actualizar jugador'});
        res.json({ mensaje: 'Jugador actualizado correctamente'});
    });
};

//Eliminar jugador
const eliminarJugador = (req, res) => {
  const id = req.params.id;

  Jugador.eliminar(id, (err) => {
    if (err) return res.status(500).json({ mensaje: 'Error al eliminar jugador' });
    res.json({ mensaje: 'Jugador eliminado correctamente' });
  });
};

module.exports={
    crearJugador,
    obtenerJugadores,
    actualizarJugador,
    eliminarJugador
};