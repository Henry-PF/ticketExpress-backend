const { ciudades, provincias } = require("../db");
const { Op } = require("sequelize");

exports.create = async (data) => {
    let dataProvince = data.body;

    try {
        const newProvince = await provincias.create({
            id: dataProvince.id,
            nombre: dataProvince.nombre,
        });
        return newProvince;
    } catch (error) {
        console.log(error);
    }
}

exports.update = async (data) => {
    try {
        const province = await provincias.findOne({
            where: {
                id: data.id
            }
        });

        if (province) {
            await province.update({
                nombre: data.nombre,

            });
            return { message: "Provincia actualizada con éxito" };
        } else {
            return { error: "No se encontró la Provincia" };
        }
    } catch (error) {
        console.log(error);
        return { error: error.message };
    }
}

exports.getAll = async () => {
    let result = {};
    try {
        const data = await provincias.findAll();
        result.data = data;

    } catch (error) {
        console.log(error);
        result.error = error.message;
    }
    return result;
}

exports.getOne = async (req, res) => { }

exports.deleteProvince = async (id) => {
    console.log('id', id);
    let result = {};
    try {
        let province = await provincias.findOne({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });

        if (province) {
            console.log('Province', province);
            await provincias.destroy({
                where: {
                    id: {
                        [Op.eq]: id
                    }
                }
            });

            result.data = {
                message: "Provincia eliminada con exito"
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
        const data = await provincias.findOne({
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