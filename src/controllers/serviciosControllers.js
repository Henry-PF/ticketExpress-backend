const servicios = require('../db.js').servicios

const crearServicio = async (req, res) => {
    try {
      const {id, nombre, id_statud} = req.body
   
      const servicio = await servicios.create({id, nombre, id_statud});
      console.log(req.body)
      console.log(servicio)
      return res.status(201).json(servicio);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: "No se pudo crear el servicio." });
    }
  }

const obtenerServicios = async (req, res) => {
    try {
      const servicios = await servicios.findAll();
      return res.status(200).json(servicios);
    } catch (error) {
      return res.status(500).json({ error: "No se pudieron obtener los servicios." });
    }
  }

  const serviciosID =  async (req, res) => {
    const { id } = req.params;
    try {
      const servicio = await servicios.findByPk(id);
      if (!servicio) {
        return res.status(404).json({ error: "Servicio no encontrado." });
      }
      return res.status(200).json(servicio);
    } catch (error) {
      return res.status(500).json({ error: "No se pudo obtener el servicio." });
    }
  }

  const actualizarServicio = async (req, res) => {
    const { id } = req.params;
    try {
      const [updated] = await servicios.update(req.body, {
        where: { id },
      });
      if (updated) {
        const servicio = await Servicio.findByPk(id);
        return res.status(200).json(servicio);
      }
      return res.status(404).json({ error: "Servicio no encontrado." });
    } catch (error) {
      return res.status(500).json({ error: "No se pudo actualizar el servicio." });
    }
  }

  const eliminarServicio = async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await servicios.destroy({
        where: { id },
      });
      if (deleted) {
        return res.status(204).json("Servicio eliminado con éxito.");
      }
      return res.status(404).json({ error: "Servicio no encontrado." });
    } catch (error) {
      return res.status(500).json({ error: "No se pudo eliminar el servicio." });
    }
  }

  module.exports = {crearServicio, obtenerServicios, serviciosID , actualizarServicio , eliminarServicio}