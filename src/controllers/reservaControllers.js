const Reserva = require('../db.js').reserva



const crearReserva = async (req, res) => {
  try {
    const { origen, destino, partida, regreso, precio, viajeIda, cantidadPasajeros } = req.body; 
    const nuevaReserva = await Reserva.create({ origen, destino, partida, regreso, precio, viajeIda, cantidadPasajeros }); 
    res.status(201).json(nuevaReserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al crear la reserva" });
  }
}



const reservaXid = async (req, res) => {
  const reservaId = req.params.id;
  try {
    // Lógica para obtener una reserva por su ID
    const reserva = await Reserva.findByPk(reservaId);
    if (!reserva) {
      res.status(404).json({ error: "La reserva no fue encontrada" });
    } else {
      res.status(200).json(reserva);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al obtener la reserva" });
  }
};

const reservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll();
    res.json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al obtener las reservas" });
  }
}

const actualizarReserva = async (req, res) => {
  try {
    // Lógica para actualizar una reserva por su ID
    const reserva = await Reserva.findByPk(req.params.id);
    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }
    // Debes utilizar req.body para acceder a los nuevos datos de la reserva
    await reserva.update(req.body);
    res.json(reserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al actualizar la reserva" });
  }
}

const eliminarReserva = async (req, res) => {
  try {
    // Lógica para eliminar una reserva por su ID
    const reserva = await Reserva.findByPk(req.params.id);
    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }
    await reserva.destroy();
    res.json({ message: "Reserva eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al eliminar la reserva" });
  }
}

module.exports = { crearReserva , reservaXid, reservas, actualizarReserva, eliminarReserva};
