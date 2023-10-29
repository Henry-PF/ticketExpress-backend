const { login, create, forgoPassword} = require("../controllers/usersControllers");

exports.login = async (req, res) => {
    let result = {};
    try {
        result = await login(req.body);
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: { message: "Error al intentar ingresar al sistema." } });
    }
}

exports.Register = async (req, res) => {
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

exports.forgoPassword = async (req, res) => {
    let result = {};
    try {
        result = await forgoPassword(req);
        if (result) {
            res.status(200).json(result);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: { message: "Error al recuperar la clave." } });
    }
}