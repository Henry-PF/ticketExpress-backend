const { create, getAll, deleteProvince, getId, update } = require("../controllers/provinciasControllers");

exports.createProvince = async (req, res) => {
    let result = {};
    try {
        result = await create(req);
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: { message: "Error crear la Provincia." } });
    }
}

exports.getAll = async (req, res) => {
    try {
        const result = await getAll();
        if (result.data) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "No se encontraron datos." });
        }
    } catch (error) {
        res.status(500).json({ error: { message: "Error al consultar la datos." } });
    }
};

exports.deleteProvince = async (req, res) => {
    try {
        const result = await deleteProvince(req.params.id);
        if (result.data) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: "No se encontraron datos." });
        }
    } catch (error) {
        res.status(500).json({ error: { message: "Error al consultar la datos." } });
    }
};

exports.getId = async (req, res) => {
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

exports.updateProvince = async (req, res) => {
    try {
        console.log(req.body);
        const result = await update(req.body);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        res.status(200).json({ message: "Provincia actualizada con éxito" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al actualizar la provincia." });
    }
}