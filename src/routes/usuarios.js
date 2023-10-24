const { Router } = require("express");
const router = Router();
const { findAll, findId, Userdelete, findCorreo, UserCreate } = require("../handlers/UsersHandler");
const { validateToken } = require("../middlewares/validateToken")

router.post("/", UserCreate);
router.post("/getUserCorreo", validateToken, findCorreo);
router.get("/getAll", validateToken, findAll);
router.get("/:id", validateToken, findId);
router.post("/delete", validateToken, Userdelete);


module.exports = router;