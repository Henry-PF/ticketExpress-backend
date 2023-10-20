const { Router } = require("express");
const router = Router();
const {RutaUpdate,RutaCreate,RutagetAll,RutagetId,RutagetOne,RutaDelete} = require("../handlers/rutasHandler");
const {validateToken} = require("../middlewares/validateToken");


router.post("/",validateToken,RutaCreate);
router.post("/update",validateToken,RutaUpdate);
router.post("/getOne",validateToken,RutagetOne);
router.post("/delete",validateToken,RutaDelete);
router.get("/getAll", validateToken,RutagetAll);
router.get("/:id",validateToken,RutagetId);



module.exports = router;