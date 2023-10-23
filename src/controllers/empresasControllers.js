const { empresas } = require("../db");
const { Op } = require("sequelize");

exports.create = async (data) => {
    try {
        const newEmpresa = await empresas.create({
            id_datos: data.id_datos,
            id_statud: data.id_statud
        })

        return newEmpresa;

    } catch (error) {
        return console.log({ "error": error.message });
    }
}
exports.update = async (data) => {
    try {
        const empresa = await empresas.findOne(
            { where: { id: { [Op.eq]: data.id } } }
        );

        if (empresa) {
            await empresas.update({
                id_datos: data.id_datos,
                id_statud: data.id_statud
            })

            return { message: "empresa actualizada con éxito" };
        } else {
            return { error: "No se pudo encontrar la empresa" };
        }
    } catch (error) {
        return console.log({ "error": error.message });
    }
}

exports.getAll = async () => {
    try {
        const data = await empresas.findAll();
        return data
    } catch (error) {
        return console.log({ "error": error.message });
    }
}

exports.deleteEmpresa = async (empresaID) => {
    let result = {};
    try {
        let empresaFound = await empresas.findOne({
            where: {
                id: {
                    [Op.eq]: empresaID
                }
            }
        });
        if (empresaFound) {
            let empresaInactive = await empresas.update({ isactivo: false }, {
                where: {
                    id: {
                        [Op.eq]: empresaID
                    }
                }
            });
            if (empresaInactive) {
                result.data = {
                    message: "empresa eliminada con exito"
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
        const empresaFound = await empresas.findByPk(id)
        if (empresaFound) {
            return empresaFound
        } else {
            return "empresa no encontrada";
        }
    } catch (error) {
        return console.log({ "error": error.message });
    }
} 