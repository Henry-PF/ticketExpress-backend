const { crearBoleto, obtenerBoletoID, obtenerBoletos, actualizarBoleto, eliminarBoleto } = require("../controllers/boletosControllers");


const handleCrearBoleto = async (req, res) => {
  try {
    await crearBoleto(req, res); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleBoletoID = async (req, res) => {
  try {
    await obtenerBoletoID(req, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleBoletos = async (req, res) => {
  try {
    await obtenerBoletos(req, res); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleActualizacionBoleto= async (req, res) => {
  try {
    await actualizarBoleto(req, res); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleEliminarBoleto = async (req, res) => {
  try {
    await eliminarBoleto(req, res); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {handleCrearBoleto, handleBoletoID, handleBoletos, handleActualizacionBoleto, handleEliminarBoleto};
