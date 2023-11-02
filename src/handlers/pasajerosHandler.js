const { create } = require("../controllers/pasajerosControllers");

exports.createPassajer = async (req, res) => {
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