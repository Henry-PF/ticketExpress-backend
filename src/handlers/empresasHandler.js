const { create, getAll, deleteEmpresa, getId, update } = require('../controllers/empresasControllers');

exports.createEmpresa = async (req, res) => {
    let result = {};
    try {
        result = await create(req.body);
        if (result) {
            return res.status(200).json(result);
        }
    } catch (error) {
        console.log(error.message);

        return res.status(500).json({ error: { message: "Error al crear la empresa" } });
    }
}

exports.findAll = async (req, res) => {
    try {
        const result = await getAll();
        if (result.data) {
            return res.status(200).json(result);
        } else {
            return res.status(404).json({ message: "No se encontraron empresaes" });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: { message: "Error al consultar la data de las empresaes" } });
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

exports.updateEmpresa = async (req, res) => {
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

exports.deleteEmpresa = async (req, res) => {
    let result = {};
    try {
        result = await deleteEmpresa(req.body.id);
        if (result) {
            return res.status(200).json(result);
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: { message: "Error al eliminar la empresa." } });
    }
}