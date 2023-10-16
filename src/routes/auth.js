const { Router } = require("express");
const router = Router();
const {login} = require("../handlers/authHandler")

router.post("/login", login);
router.post("/register",UserCreate);

module.exports = router;