const { Router } = require("express");
const router = Router();
const { createProvince, getAll, deleteProvince, getId, updateProvince } = require("../handlers/provinviasHandler");

router.get('/get_province', getAll);
router.post('/create_province', createProvince);
router.post('/:id', getId);
router.put('/update_province', updateProvince);
router.delete('/:id', deleteProvince);

module.exports = router