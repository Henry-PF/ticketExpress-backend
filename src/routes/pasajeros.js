const { Router } = require("express");
const router = Router();
const { createPassajer } = require("../handlers/pasajerosHandler");

router.post('/', createPassajer);

module.exports = router;