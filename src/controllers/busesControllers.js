const { buses, statud } = require('../db')
const { Op } = require('sequelize');

exports.create = async (data) => {
    let dataBus = data;

    try {
        const newBus = await buses.create({
            modelo: dataBus.modelo,
            marca: dataBus.marca,
            placa: dataBus.placa,
            capacidad: dataBus.capacidad,
            id_statud: dataBus.id_statud
        });
        return newBus;
    } catch (error) {
        console.log(error);
    }
}

exports.update = async (data) => {
    try {
        const bus = await buses.findOne({
            where: {
                id: data.id
            }
        });

        if (bus) {
            await bus.update({
                modelo: data.modelo,
                marca: data.marca,
                placa: data.placa,
                capacidad: data.capacidad,
                id_statud: data.id_statud
            });

            return { message: "Autobús actualizado con éxito" };
        } else {
            return { error: "No se encontró el autobús" };
        }
    } catch (error) {
        console.log(error);
        return { error: error.message };
    }
}

exports.getAll = async () => {
    let result = {};
    try {
        const data = await buses.findAll({
            include: [{ model: statud, as: 'statud' }]
        });
        result.data = data;

    } catch (error) {
        console.log(error);
        result.error = error.message;
    }
    return result;
}

exports.deleteBus = async (data) => {
    let result = {};
    try {
        let bus = await buses.findOne({
            where: {
                id: {
                    [Op.eq]: parseInt(data.id)
                }
            }
        });
        if (bus) {
            let updatedBus = await buses.update({ id_statud: parseInt(data.status) }, {
                where: {
                    id: {
                        [Op.eq]: parseInt(data.id)
                    }
                }
            });
            if (updatedBus) {
                result.data = {
                    message: "Bus eliminado con exito"
                };
            }
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
        const data = await buses.findOne({
            include: [{ model: statud, as: 'statud' }],
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