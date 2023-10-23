const { ciudades, provincias, rutas, rutas_empresa, terminales, empresa } = require("../db");
const { Op } = require("sequelize");

exports.create = async (req, res) => {
    let result = "";
    let datos = req;
    console.log('DATOS', datos);
    try {
        let dataTerminalO = await terminales.findOne({
            where: {
                id: {
                    [Op.eq]: datos.origen
                }
            }
        })
        if (dataTerminalO) {
            let dataTerminalD = await terminales.findOne({
                where: {
                    id: {
                        [Op.eq]: datos.destino
                    }
                }
            });
            if (dataTerminalD) {
                let dataEmpresa = await empresa.findOne({
                    where: {
                        id: {
                            [Op.eq]: datos.empresa
                        }
                    }
                });
                if (dataEmpresa) {
                    let DatanewRuta = {
                        "origen": dataTerminalO.id,
                        "destino": dataTerminalD.id,
                        "precio": datos.precio,
                        "fecha_salida": datos.fecha_salida,
                        "hora_llegada": datos.hora_llegada,
                        "hora_salida": datos.hora_salida,
                        "id_statud": datos.statud,
                    }
                    let newRuta = await rutas.create(DatanewRuta);
                    if (newRuta) {
                        // await rutas_empresa.create({ "id_ruta": newRuta.id, "id_empresa": dataEmpresa.id });
                        result.data = newRuta;
                        result.message = "Ruta registrado con éxito";
                    } else {
                        result.error = true;
                        result.message = "Error al crear la Ruta";
                    }
                } else {
                    result.error = true;
                    result.message = "No se encontro Empresa";
                }
            } else {
                result.error = true;
                result.message = "No se encontro Destino";
            }
        } else {
            result.error = true;
            result.message = "No se encontro Origen";
        }
    } catch (error) {
        console.log('Error', error);
    }
    return result;
}
exports.update = async (req, res) => {
    let result = "";
    try {

    } catch (error) {

    }
    return result;
}
exports.getAll = async (req, res) => {
    let result = "";
    try {

    } catch (error) {

    }
    return result;
}
exports.getOne = async (req, res) => {
    let result = "";
    try {

    } catch (error) {

    }
    return result;
}
exports.delete = async (req, res) => {
    let result = "";
    try {

    } catch (error) {

    }
    return result;
}
exports.getId = async (req, res) => {
    let result = "";
    try {

    } catch (error) {

    }
    return result;
}