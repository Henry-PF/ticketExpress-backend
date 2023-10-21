const { crearReserva, reservaXid, reservas, actualizarReserva, eliminarReserva } = require("../controllers/reservaControllers");

const handleCrearReserva = async (req, res) => {
  try {
    await crearReserva(req, res); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleReservaId = async (req, res) => {
  try {
    await reservaXid(req, res); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleReservas = async (req, res) => {
  try {
    await reservas(req, res); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleActualizacionReserva = async (req, res) => {
  try {
    await actualizarReserva(req, res); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleEliminarReserva = async (req, res) => {
  try {
    await eliminarReserva(req, res); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {handleCrearReserva, handleReservaId, handleReservas, handleActualizacionReserva, handleEliminarReserva};
