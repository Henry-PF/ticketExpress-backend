const { crearAsiento, obtenerAsientoID, obtenerAsientos, actualizarAsiento, eliminarAsiento } = require("../controllers/asientosControllers");



const handleCrearAsiento = async (req, res) => {
  try {
    await crearAsiento(req, res); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleAsientoID = async (req, res) => {
  try {
    await obtenerAsientoID(req, res); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleAsientos = async (req, res) => {
  try {
    await obtenerAsientos(req, res); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleActualizacionAsiento = async (req, res) => {
  try {
    await actualizarAsiento(req, res); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleEliminarAsiento = async (req, res) => {
  try {
    await eliminarAsiento(req, res); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {handleCrearAsiento, handleAsientoID, handleAsientos, handleActualizacionAsiento, handleEliminarAsiento};
