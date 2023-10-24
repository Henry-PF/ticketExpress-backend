const { Router } = require("express");
const router = Router();
const { createEmpresa, findAll, deleteEmpresa, findId, updateEmpresa } = require("../handlers/empresasHandler");

router.get('/get', findAll);
router.post('/create', createEmpresa);
router.post('/delete/:id', deleteEmpresa);
router.post('/:id', findId);
router.put('/update', updateEmpresa)

module.exports = router;

