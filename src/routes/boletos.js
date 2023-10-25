const express = require('express');
const router = express.Router();
const { handleCrearBoleto, handleBoletos, handleBoletoID, handleActualizacionBoleto, handleEliminarBoleto } = require('../handlers/boletosHandlers');

router.post('/crear-boleto', handleCrearBoleto);
router.get('/', handleBoletos);
router.get('/:id',handleBoletoID);
router.put('/:id',handleActualizacionBoleto );
router.delete('/:id', handleEliminarBoleto);
  
module.exports = router;