const { ciudades, provincias } = require("../db");
const { Op } = require("sequelize");

exports.create = async (data) => {
    let dataCities = data.body;
    try {
        const newCity = await ciudades.create({
            id: dataCities.id,
            nombre: dataCities.nombre,
            id_provincia: dataCities.id_provincia
        });
        return newCity;
    } catch (error) {
        console.log(error);
    }
}
exports.update = async (data) => {
    try {
        const city = await ciudades.findOne({
            where: {
                id: data.id
            }
        });

        if (city) {
            await city.update({
                nombre: data.nombre,
                id_provincia: data.id_provincia,

            });
            return { message: "Ciudad actualizada con éxito" };
        } else {
            return { error: "No se encontró la Ciudad" };
        }
    } catch (error) {
        console.log(error);
        return { error: error.message };
    }
}

exports.getAll = async () => {
    let result = {};
    try {
        const data = await ciudades.findAll();
        result.data = data;

    } catch (error) {
        console.log(error);
        result.error = error.message;
    }
    return result;
}
exports.getOne = async (req, res) => { }

exports.deleteCity = async (id) => {
    let result = {};
    try {
        let city = await ciudades.findOne({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });

        if (city) {
            await ciudades.destroy({
                where: {
                    id: {
                        [Op.eq]: id
                    }
                }
            });

            result.data = {
                message: "Ciudad eliminada con exito"
            };
        }
    } catch (error) {
        console.log(error)
        result.error = error.message;
    }
    return result;
}

exports.getId = async (id) => {
    let result = {};
    try {
        const data = await ciudades.findOne({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })
        return result.data = data;
    } catch (error) {
        console.log(error)
        result.error = error.message;
    }
    return result;
}