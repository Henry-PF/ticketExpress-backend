// routes/reserva.js

const express = require("express");
const router = express.Router();
const { Reserva } = require("../db.js"); 
const handleCrearReserva = require("../handlers/reservaHandler.js");


router.use((req, res, next) => {
  console.log("Este es un middleware de ejemplo");
  next();
});

// CREAR RESERVA
// router.post("/", async (req, res) => {
//   try {
//     // Lógica para crear una reserva
//     // Debes utilizar req.body para acceder a los datos enviados en la solicitud POST
//     const nuevaReserva = await Reserva.create(req.body);
//     res.json(nuevaReserva);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Hubo un error al crear la reserva" });
//   }
// });
router.post("/", handleCrearReserva);

// OBTENER RESERVA POR ID
router.get("/:id", async (req, res) => {
  try {
    // Lógica para obtener una reserva por su ID
    const reserva = await Reserva.findByPk(req.params.id);
    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }
    res.json(reserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al obtener la reserva" });
  }
});

// OBTENER TODAS LAS RESERVAS
router.get("/", async (req, res) => {
  try {
    // Lógica para obtener todas las reservas
    const reservas = await Reserva.findAll();
    res.json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al obtener las reservas" });
  }
});

// EDITAR RESERVA POR ID
router.put("/:id", async (req, res) => {
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
});

// ELIMINAR RESERVA POR ID
router.delete("/:id", async (req, res) => {
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
});

module.exports = router;
