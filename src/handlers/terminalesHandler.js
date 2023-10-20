const { create, getAll, deleteTerminal, getId, update, getOne } = require('../controllers/terminalesControllers');

exports.createTerminal = async (req, res) => {
    let result = {};
    try {
        result = await create(req);
        if (result) {
            return res.status(200).json(result);
        }
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({ error: { message: "Error al crear la terminal" } });
    }
}

exports.findAll = async (req, res) => {
    try {
        const result = await getAll();
        if (result.data) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: "No se encontraron terminales" });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: { message: "Error al consultar la data de las terminales" } });
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
        console.log(error.message);
        return res.status(500).json({ error: { message: "Error al consultar la base de datos" } });
    }
}
exports.getOne = async (req, res) => {
    let result = {};
    try {
        result = await getOne(req.nombre);
        if (result) {
           return res.status(200).json(result);
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: { message: "No se pudo encontrar la terminal"} });
    }
}

exports.updateTerminal = async (req, res) => {
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

exports.deleteTerminal = async (req, res) => {
    let result = {};
    try {
        result = await deleteTerminal(req.body.id);
        if (result) {
            return res.status(200).json(result);
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: { message: "Error al eliminar el bus." } });
    }
}