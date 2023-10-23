const { create, getAll, update, deleteCity, getId } = require("../controllers/ciudadesControllers");

exports.createCity = async (req, res) => {
    let result = {};
    try {
        result = await create(req);
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: { message: "Error al registrar la ciudad." } });
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

exports.updateCity = async (req, res) => {
    try {
        console.log(req.body);
        const result = await update(req.body);
        if (result.error) {
            return res.status(400).json({ error: result.error });
        }
        res.status(200).json({ message: "Ciudad actualizada con éxito" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al actualizar la Ciudad." });
    }
}

exports.deleteCity = async (req, res) => {
    try {
        const result = await deleteCity(req.params.id);
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