const { Router } = require("express");
const router = Router();
const {login,Register} = require("../handlers/authHandler")

router.post("/login", login);
router.post("/register",Register);

module.exports = router;