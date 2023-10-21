// routes/reserva.js

const express = require("express");
const router = express.Router();
const { Reserva } = require("../db.js"); 
const { handleCrearReserva, handleReservaId, handleReservas, handleActualizacionReserva, handleEliminarReserva } = require("../handlers/reservaHandler.js");

router.use((req, res, next) => {
  console.log("Este es un middleware de ejemplo");
  next();
});

router.post("/", handleCrearReserva); 
router.get("/:id", handleReservaId); 
router.get("/", handleReservas);
router.put("/:id", handleActualizacionReserva);

// ELIMINAR RESERVA POR ID
router.delete("/:id", handleEliminarReserva);

module.exports = router;
