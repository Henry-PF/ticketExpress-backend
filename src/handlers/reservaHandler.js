const { crearReserva } = require("../controllers/reservaControllers");

const handleCrearReserva = async (req, res) => {
  try {
    await crearReserva(req, res); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = handleCrearReserva;
