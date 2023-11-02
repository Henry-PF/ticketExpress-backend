const { Router } = require("express");
const { handleCrearAsiento, handleAsientoID, handleAsientos, handleActualizacionAsiento, handleEliminarAsiento } = require("../handlers/asientosHandlers");
// const rutas = require("../models/rutas.js");
const router = Router();

router.post("/", handleCrearAsiento);

router.get("/:id", handleAsientoID);

router.get("/", handleAsientos);

router.put("/:id", handleActualizacionAsiento);

router.delete("/:id", handleEliminarAsiento);



module.exports = router;
