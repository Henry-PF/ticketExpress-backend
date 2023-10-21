const { Reserva } = require("../models/reserva"); 

const crearReserva = async (req, res) => {
  try {
   
    const nuevaReserva = await Reserva.create(req.body);
    res.status(201).json(nuevaReserva); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al crear la reserva" });
  }
}

module.exports = { crearReserva };
