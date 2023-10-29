const { crearAsiento, obtenerAsientoID, obtenerAsientos, actualizarAsiento, eliminarAsiento } = require("../controllers/asientosControllers");

const handleCrearAsiento = async (req, res) => {
  try {
    const { nombre, id_buses } = req.body; // Asegúrate de obtener los datos necesarios del cuerpo de la solicitud
    const nuevoAsiento = await crearAsiento(nombre, id_buses); // Llama a la función crearAsiento con los datos
    res.status(201).json({ message: 'Asiento creado con éxito', asiento: nuevoAsiento });
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
    const result = await obtenerAsientos();
    console.log(result.data);
    if (result.data) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "No se encontraron datos de autobuses." });
    }
  } catch (error) {
    res.status(500).json({ error: { message: "Error al consultar la data de los buses." } });
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

module.exports = { handleCrearAsiento, handleAsientoID, handleAsientos, handleActualizacionAsiento, handleEliminarAsiento };
