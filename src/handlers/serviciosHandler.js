const { crearServicio, obtenerServicios, serviciosID, eliminarServicio, actualizarServicio } = require("../controllers/serviciosControllers");


const handleCrearServicio = async (req, res) => {
  try {
    await crearServicio(req, res); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleServicioId = async (req, res) => {
  try {
    await serviciosID(req, res);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleServicios = async (req, res) => {
  try {
    await obtenerServicios(req, res); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleActualizacionServicio= async (req, res) => {
  try {
    await actualizarServicio(req, res); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleEliminarServicio = async (req, res) => {
  try {
    await eliminarServicio(req, res); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {handleCrearServicio, handleServicioId, handleServicios, handleActualizacionServicio, handleEliminarServicio};
