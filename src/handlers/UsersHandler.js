const { update, findAll, FindID, Delete, findEmail, create } = require("../controllers/usersControllers");

exports.UserCreate = async (req, res) => {
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

exports.UserUpdate = async (req, res) => {
    let result = {};
    try {

    } catch (error) {
        return res.status(500).json({ error: { message: "Error al actualizar el usuario." } });
    }
}

exports.findAll = async (req, res) => {
    let result = {};
    try {
        result = await findAll();
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json({ error: { message: "Error al consultar la data del usuario." } });
    }
}

exports.findId = async (req, res) => {
    let result = {};
    try {
        result = await FindID(req.params.id);
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json({ error: { message: "Error al consultar la base de datos." } });
    }
}

exports.findCorreo = async (req, res) => {
    let result = {};
    try {
        result = await findEmail(req.body);
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json({ error: { message: "Error al consultar la base de datos." } });
    }
}

exports.Userdelete = async (req, res) => {
    let result = {};
    try {
        result = await Delete(req.body.id);
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json({ error: { message: "Error al consultar la base de datos." } });
    }
}