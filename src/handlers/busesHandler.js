const { create, getAll, deleteBus, getId, update } = require('../controllers/busesControllers');

exports.createBus = async (req, res) => {
    let result = {};
    try {
        result = await create(req);
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: { message: "Error al registrar el usuario." } });
    }
}

exports.findAll = async (req, res) => {
    try {
        const result = await getAll();
        if (result.data) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "No se encontraron datos de autobuses." });
        }
    } catch (error) {
        res.status(500).json({ error: { message: "Error al consultar la data de los buses." } });
    }
};

exports.findId = async (req, res) => {
    let result = {};
    try {
        result = await getId(req.params.id);
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json({ error: { message: "Error al consultar la base de datos." } });
    }
}

exports.updateBus = async (req, res) => {
    let result = {};
    try {
        result = await update(req.body);
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json({ error: { message: "Error al actualizar los datos." } });
    }
}

exports.deleteBus = async (req, res) => {
    let result = {};
    try {
        result = await deleteBus(req.body.id);
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json({ error: { message: "Error al eliminar el bus." } });
    }
}