const Asientos = require('../db.js').asientos;

const crearAsiento = async (nombre) => {
  try {
    const nuevoAsiento = await Asientos.create({
      nombre: nombre.toString(), // Asegúrate de que sea una cadena
      disponibilidad: true, // Añade cualquier valor por defecto que necesites
      id_buses: 1, // Añade el ID del autobús
    });
    return nuevoAsiento;
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear el asiento');
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

const obtenerAsientos = async () => {
  let result = {};
  try {
    const data = await Asientos.findAll();
    result.data = data;

  } catch (error) {
    console.log(error);
    result.error = error.message;
  }
  return result;
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