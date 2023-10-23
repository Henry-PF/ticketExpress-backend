const { Router } = require("express");
const router = Router();
const { createTerminal, findAll, deleteTerminal, findId, updateTerminal, getOne } = require("../handlers/terminalesHandler");

router.get('/get', findAll);
router.get('/get_name', getOne);
router.post('/create', createTerminal);
router.post('/delete/:id', deleteTerminal);
router.post('/:id', findId);
router.put('/update', updateTerminal)

module.exports = router;

