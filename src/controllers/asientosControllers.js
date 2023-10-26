const Asientos = require('../db.js').asientos; 

const crearAsiento = async (req, res) => {
    try {
      const { nombre, disponibilidad, id_buses, id_rutas } = req.body;
      const nuevoAsiento = await Asientos.create({
        nombre,
        disponibilidad,
        id_buses,
        id_rutas
      });
      res.status(201).json(nuevoAsiento);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Error al crear el asiento' });
    }
  }

  const obtenerAsientoID = async (req, res) => {
    try {
      const id = req.params.id;
      const asiento = await Asientos.findByPk(id);
      if (!asiento) {
        return res.status(404).json({ error: 'Asiento no encontrado' });
      }
      res.json(asiento);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el asiento' });
    }
  }

  const obtenerAsientos = async (req, res) => {
    try {
      const asientos = await Asientos.findAll();
      res.json(asientos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los asientos' });
    }
  }

  const actualizarAsiento = async (req, res) => {
    try {
      const id = req.params.id;
      const { nombre, disponibilidad, id_buses } = req.body;
      const asiento = await Asientos.findByPk(id);
      if (!asiento) {
        return res.status(404).json({ error: 'Asiento no encontrado' });
      }
      asiento.nombre = nombre;
      asiento.disponibilidad = disponibilidad;
      asiento.id_buses = id_buses;
      await asiento.save();
      res.json(asiento);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el asiento' });
    }
  }

  const eliminarAsiento = async (req, res) => {
    try {
      const id = req.params.id;
      const asiento = await Asientos.findByPk(id);
      if (!asiento) {
        return res.status(404).json({ error: 'Asiento no encontrado' });
      }
      await asiento.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el asiento' });
    }
  }

  module.exports = {
    crearAsiento,
    obtenerAsientoID,
    obtenerAsientos,
    actualizarAsiento,
    eliminarAsiento
  }