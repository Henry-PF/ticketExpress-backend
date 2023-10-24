const { Router } = require("express");
const router = Router();
const { RutaUpdate, RutaCreate, RutagetAll, RutagetId, RutagetOne, RutaDelete, RutaFiltro } = require("../handlers/rutasHandler");
const { validateToken } = require("../middlewares/validateToken");


router.post("/", RutaCreate);
router.post("/update", RutaUpdate);
router.post("/getOne", RutagetOne);
router.post("/delete", RutaDelete);
router.get("/getAll", RutagetAll);
router.get('/filter', RutaFiltro);
router.get("/:id", RutagetId);



module.exports = router;