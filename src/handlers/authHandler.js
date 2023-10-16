const { login } = require("../controllers/usersControllers");

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