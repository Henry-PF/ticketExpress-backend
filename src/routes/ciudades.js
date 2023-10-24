const { Router } = require('express');
const { createCity, getAll, updateCity, deleteCity, getId } = require('../handlers/ciudadesHandler');

const router = Router();

router.get('/get_cities', getAll);
router.post('/create_city', createCity);
router.post('/:id', getId);
router.put('/update_city', updateCity);
router.delete('/:id', deleteCity);

module.exports = router;