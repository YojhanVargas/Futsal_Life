const Equipo = require('../models/equipo.model');

//crear equipo
const crearEquipo = (req, res) => {
    const { Nombre, Categoria} = req.body;

    if (!Nombre || !Categoria) {
        return res.status(400).json({ mensaje : 'Nombre y categoria son obligatorios'});
    }

    Equipo.crear({ Nombre, Categoria}, (err, result) => {
        if (err) return res.status(500).json({ mensaje: 'Error al crear equipo'})
        res.status(201).json({ mensaje: 'Equipo creado exitosamente'});
    });
};

//obtener todos los equipos
const obtenerEquipos = (req, res) => {
    Equipo.obtenerTodos((err, resultados) => {
        if (err) return res.status(500).json({ mensaje: 'Error al obtener equipos'});
        res.json(resultados);
    });
};

//Actualizar equipo
const actualizarEquipo = (req, res) => {
    const idEquipo = req.params.id;
    const {Nombre, Categoria} = req.body;

    if (!Nombre || !Categoria) {
        return res.status(400).json({ mensaje: 'Nombre y Categoría son obligatorios'});
    }

    Equipo.actualizar(idEquipo, {Nombre, Categoria}, (err) => {
        if (err) return res.status(500).json({ mensaje: 'Error al actualizar equipo'});
        res.json({ mensaje: 'Equipo actualizado exitosamente'});
    });
};

//eliminar equipo
const eliminarEquipo = (req, res) => {
    const idEquipo = req.params.id;

    Equipo.eliminar(idEquipo, (err) => {
        if (err) return res.status(500).json({ mensaje: 'Error al eliminar equipo'});
        res.json({ mensaje: 'Equipo eliminado exitosamente'});
    });
};

module.exports= {
    crearEquipo,
    obtenerEquipos,
    actualizarEquipo,
    eliminarEquipo
};