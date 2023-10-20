const { Router } = require("express");
const router = Router();
const { createBus, findAll, deleteBus, findId, updateBus } = require("../handlers/busesHandler");

router.get('/get_buses', findAll);
router.post('/create_bus', createBus);
router.post('/delete_bus/:id', deleteBus);
router.post('/:id', findId);
router.put('/update_bus', updateBus)

module.exports = router;

