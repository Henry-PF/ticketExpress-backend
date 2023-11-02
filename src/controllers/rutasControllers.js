const { ciudades, provincias, rutas, rutas_empresa, terminales, empresa,buses_rutas} = require("../db");
const { Op } = require("sequelize");

exports.create = async (req, res) => {
    let result = {};
    let datos = req;
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
                /*let dataEmpresa = await empresa.findOne({
                    where: {
                        id: {
                            [Op.eq]: datos.empresa
                        }
                    }
                });
                if(dataEmpresa){
                  
                }else{
                    result.error   = true;
                    result.message = "No se encontro Empresa";
                }*/
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
                    await buses_rutas.create({"id_ruta":newRuta.id,"id_buses":datos.id_buses});
                    result.data = newRuta;
                    result.message = "Ruta registrado con éxito";
                } else {
                    result.error = true;
                    result.message = "Error al crear la Ruta";
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

exports.update = async (datos, id) => {
    let result = {};
    try {

        let dataRutas = await rutas.update(datos, {
            where: { id: { [Op.eq]: id } }
        })
        if (dataRutas) {
            result.data = dataRutas;
            result.error = false;
            result.message = "Registro editado con éxito";
        } else {
            result.error = true;
            result.message = "No hay rutas registradas";
        }
    } catch (error) {

        console.log('Error', error);
    }
    return result;
}
exports.getAll = async () => {
    let result = {};
    try {

        let dataRutas = await rutas.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{ model: terminales }]
        })
        if (dataRutas) {
            result.data = dataRutas;
            result.error = false;
            result.message = "Consulta realizada con éxito";
        } else {
            result.error = true;
            result.message = "No hay rutas registradas";
        }
    } catch (error) {

        console.log('Error', error);
    }
    return result;
}
exports.getOne = async (where) => {
    let result = {};
    try {

        let dataRutas = await rutas.findOne({
            where: where,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{ model: terminales }]
        })
        if (dataRutas) {
            result.data = dataRutas;
            result.error = false;
            result.message = "Consulta realizada con éxito";
        } else {
            result.error = true;
            result.message = "No hay rutas registradas";
        }
    } catch (error) {

        console.log('Error', error);
    }
    return result;
}
exports.deleteRuta = async (id) => {
    let result = {};
    try {

        let dataRutas = await rutas.update({ id_statud: "8" }, {
            where: { id: { [Op.eq]: id } }
        })
        if (dataRutas) {
            result.data = dataRutas;
            result.error = false;
            result.message = "Registro eliminado con éxito";
        } else {
            result.error = true;
            result.message = "No hay rutas registradas";
        }
    } catch (error) {

        console.log('Error', error);
    }
    return result;
}

exports.getId = async (id) => {
    let result = {};
    try {

        let dataRutas = await rutas.findOne({
            where: { id: { [Op.eq]: id } },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{ model: terminales }]
        })
        if (dataRutas) {
            result.data = dataRutas;
            result.error = false;
            result.message = "Consulta realizada con éxito";
        } else {
            result.error = true;
            result.message = "No hay rutas registradas";
        }
    } catch (error) {

        console.log('Error', error);
    }
    return result;
}

exports.filterRoute = async (data) => {
    console.log('Controlers', data);
    let result = {};
    try {

        let dataRutas = await rutas.findAll({
            where: {
                origen: { [Op.eq]: data.dataOrigen },
                destino: { [Op.eq]: data.dataDestino },
                fecha_salida: { [Op.eq]: data.fecha_salida },
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{ model: terminales }]
        })
        if (dataRutas) {
            result.data = dataRutas;
            result.error = false;
            result.message = "Consulta realizada con éxito";
        } else {
            result.error = true;
            result.message = "No hay rutas registradas";
        }
    } catch (error) {

        console.log('Error', error);
    }
    return result;
}