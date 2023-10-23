const { Router } = require("express");
const router = Router();



const { handleCrearServicio, handleServicios, handleServicioId, handleActualizacionServicio, handleEliminarServicio } = require("../handlers/serviciosHandler");

router.post("/", handleCrearServicio);

router.get("/", handleServicios);

router.get("/:id",  handleServicioId);

router.put("/:id", handleActualizacionServicio);

router.delete("/:id", handleEliminarServicio);

module.exports = router;
