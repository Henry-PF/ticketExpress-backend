const { Router } = require("express");
const router = Router();
const { handleCrearReserva, handleReservaId, handleReservas, handleActualizacionReserva, handleEliminarReserva } = require("../handlers/reservaHandler");

router.post("/", handleCrearReserva); 
router.get("/:id", handleReservaId); 
router.get("/", handleReservas);
router.put("/:id", handleActualizacionReserva);
router.delete("/:id", handleEliminarReserva);

module.exports = router