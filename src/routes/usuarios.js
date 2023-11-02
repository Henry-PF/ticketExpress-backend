const { Router } = require("express");
const router = Router();
const { findAll, findId, Userdelete, findCorreo, UserCreate, UserUpdate } = require("../handlers/UsersHandler");
const { validateToken } = require("../middlewares/validateToken")

router.post("/", UserCreate);
router.post("/getUserCorreo", findCorreo);
router.put("/update_user", UserUpdate);
router.get("/getAll", findAll);
router.get("/:id", findId);
router.post("/delete", Userdelete);


module.exports = router;