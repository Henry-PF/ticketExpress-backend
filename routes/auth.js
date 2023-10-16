const { Router } = require("express");
const router = Router();
const {login} = require("../handlers/authHandler")

router.post("/login", login);

module.exports = router;