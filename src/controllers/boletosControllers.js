const  Boletos  = require('../db.js').boletos; 

const crearBoleto = async (req, res) => {
  try {
    const { id_ruta, id_statud, id_empresa, id_pasajero, costo, fecha } = req.body;

    // Validar que ningún campo sea nulo
    if (
      !id_ruta ||
      !id_statud ||
      !id_empresa ||
      !id_pasajero  ||
      !costo||
      !fecha 
    ) {
      return res.status(400).json({ error: 'Todos los campos deben estar presentes y no deben ser nulos' });
    }

    // Validar que el costo sea un número positivo
    const costoNumero = parseFloat(costo);
    if (isNaN(costoNumero) || costoNumero <= 0) {
      return res.status(400).json({ error: 'El costo debe ser un número positivo mayor que cero' });
    }

    const nuevoBoleto = await Boletos.create({
      id_ruta,
      id_statud,
      id_empresa,
      id_pasajero,
      costo: costoNumero, // Guarda el costo como número
      fecha,
    });

    res.status(201).json(nuevoBoleto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el boleto' });
  }
};



const obtenerBoletoID =  async (req, res) => {
    const boletoId = req.params.id;
    try {
      const boleto = await Boletos.findByPk(boletoId);
      if (!boleto) {
        res.status(404).json({ error: 'Boleto no encontrado' });
      } else {
        res.json(boleto);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el boleto' });
    }
  }

const obtenerBoletos = async (req, res) => {
    try {
      const boletos = await Boletos.findAll();
      res.json(boletos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los boletos' });
    }
  }

const actualizarBoleto = async (req, res) => {
    const boletoId = req.params.id;
    try {
      const boleto = await Boletos.findByPk(boletoId);
      if (!boleto) {
        res.status(404).json({ error: 'Boleto no encontrado' });
      } else {
        await boleto.update(req.body);
        res.json(boleto);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el boleto' });
    }
  }

const eliminarBoleto =  async (req, res) => {
    const boletoId = req.params.id;
    try {
      const boleto = await Boletos.findByPk(boletoId);
      if (!boleto) {
        res.status(404).json({ error: 'Boleto no encontrado' });
      } else {
        await boleto.destroy();
        res.json({ message: 'Boleto eliminado correctamente' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el boleto' });
    }
  }

module.exports = {
    crearBoleto,
    obtenerBoletoID,
    obtenerBoletos,
    actualizarBoleto,
    eliminarBoleto
}