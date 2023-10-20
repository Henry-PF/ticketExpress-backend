const {create, update, getAll, getId, getOne, deleteRuta} = require("../controllers/rutasControllers");

exports.RutaDelete = async (req, res) => {
    let result = {};
    try {
        result = await deleteRuta(req.body.id);
    } catch (error) {
        return res.status(500).json({ error: { message: "Error al realizar la operacion." } });
    }
}

exports.RutaUpdate = async (req, res) => {
    let result = {};
    try {
        result = await update(req.body.DataUpdate,req.body.id);
    } catch (error) {
        return res.status(500).json({ error: { message: "Error al realizar la operacion." } });
    }
}

exports.RutaCreate = async (req, res) => {
    let result = {};
    try {
        result = await create(req.body);
    } catch (error) {
        return res.status(500).json({ error: { message: "Error al realizar la operacion." } });
    }
}

exports.RutagetAll = async (req, res) => {
    let result = {};
    try {
        result = await getAll();
    } catch (error) {
        return res.status(500).json({ error: { message: "Error al realizar la operacion." } });
    }
}

exports.RutagetId = async (req, res) => {
    let result = {};
    try {
        result = await getId(req.body.id);
    } catch (error) {
        return res.status(500).json({ error: { message: "Error al realizar la operacion." } });
    }
}

exports.RutagetOne = async (req, res) => {
    let result = {};
    try {
        result = await getOne(req.body.where);
    } catch (error) {
        return res.status(500).json({ error: { message: "Error al realizar la operacion." } });
    }
}


