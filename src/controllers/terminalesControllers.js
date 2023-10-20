const { ciudades, terminales } = require("../db");
const { Op } = require("sequelize");

exports.create = async (data) => {
    try {
        const newTerminal = await terminales.create({
            nombre: data.nombre,
            id_ciudad: data.id_ciudad,
            id_statud: data.id_statud
        })

        return newTerminal;

    } catch (error) {
        return console.log({ "error": error.message });
    }
}
exports.update = async (data) => {
    try {
        const terminal = await terminales.findOne(
            { where: { id: { [Op.eq]: data.id } } }
        );

        if (terminal) {
            await terminales.update({
                nombre: data.nombre,
                id_ciudad: data.id_ciudad,
                id_statud: data.id_statud
            })

            return { message: "Terminal actualizado con éxito" };
        } else {
            return { error: "No se pudo encontrar la terminal" };
        }
    } catch (error) {
        return console.log({ "error": error.message });
    }
}

exports.getAll = async () => {
    try {
        const data = await terminales.findAll();
        return data
    } catch (error) {
        return console.log({ "error": error.message });
    }
}
exports.getOne = async (nombre) => {
    try {
        const terminalFound = await terminales.findOne(
            { where: { nombre: { [Op.eq]: nombre } } }
        );
        if(terminalFound){
            return terminalFound
        } else
        
        return "No se pudo encontrar una terminal con ese nombre"

    } catch (error) {

    }
}
exports.deleteTerminal = async (terminalID) => {
    let result = {};
    try {
        let terminalFound = await terminales.findOne({
            where: {
                id: {
                    [Op.eq]: terminalID
                }
            }
        });
        if (terminalFound) {
            let temrinalInactive = await terminales.update({ isactivo: false }, {
                where: {
                    id: {
                        [Op.eq]: terminalID
                    }
                }
            });
            if (temrinalInactive) {
                result.data = {
                    message: "Terminal eliminado con exito"
                };
            }
        }
        return result;
    } catch (error) {
        return console.log({ "error": error.message });
    }
}
exports.getId = async (id) => {
    try {
        const temrinalFound = await terminales.findByPk(id)
        if (temrinalFound) {
            return temrinalFound
          } else {
           return "Terminal no encontrado";
          }
    } catch (error) {
        return console.log({ "error": error.message });
    }
}