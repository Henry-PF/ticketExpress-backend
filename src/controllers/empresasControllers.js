const { empresas, datos, statud } = require("../db");
const { Op } = require("sequelize");
const { cloudinary } = require("../config/cloudinary");
exports.create = async (data) => {
    console.log(data);
    try {
        let imgs = data.files;
        Object.keys(imgs).forEach((img) => {
            const extension = imgs[img].mimetype.split("/")[1];
            const validExtensions = ["png", "jpg", "jpeg"];
            if (!validExtensions.includes(extension)) {
                return res.status(400).send("extesion de archivos no valida");
            }
        })
        const imglogo = await cloudinary.v2.uploader.upload(imgs["logo"].tempFilePath);
        const datosEmpresas = datos.create({
            nombre: data.nombre,
            direccion: data.direccion,
            telefono: data.telefono,
            correo: data.correo,
            cuit: data.cuit,
            url_logo: imglogo.secure_url
        });

        if (datosEmpresas) {
            const newEmpresa = await empresas.create({
                id_datos: datosEmpresas.id,
                id_statud: "1"
            })
            if (newEmpresa) {
                return { message: "empresa creada con éxito" };
            } else {
                return { error: "No se pudo crear la empresa" };
            }
        }
        return newEmpresa;
    } catch (error) {
        return console.log({ "error": error.message });
    }
}

exports.update = async (data) => {
    try {
        const empresa = await empresas.findOne(
            { where: { id_datos: { [Op.eq]: data.id } } }
        );
        if (empresa) {
            await empresas.update({
                id_statud: data.id_statud
            }, {
                where: { id: empresa.id }
            });

            const dato = await datos.findOne({
                where: {
                    id: {
                        [Op.eq]: empresa.id_datos
                    }
                }
            });
            if (dato) {
                await datos.update({
                    nombre: data.nombre,
                    direccion: data.direccion,
                    correo: data.correo,
                    telefono: data.telefono,
                    cuit: data.cuit,
                }, {
                    where: { id: dato.id }
                });
            }

            return { message: "Datos actualizados con éxito" };
        } else {
            return { error: "No se pudo encontrar la empresa" };
        }
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}

exports.getAll = async () => {
    let result = {};
    try {
        const data = await empresas.findAll({
            include: [
                { model: datos, as: 'dato' },
                { model: statud, as: 'statud' }
            ]
        });
        result.data = data;

    } catch (error) {
        console.log(error);
        result.error = error.message;
    }
    return result;
}

exports.deleteEmpresa = async (data) => {
    console.log(data);
    let result = {};
    try {
        let empresaFound = await empresas.findOne({
            where: {
                id: {
                    [Op.eq]: parseInt(data.id)
                }
            }
        });
        if (empresaFound) {
            let empresaInactive = await empresas.update({ id_statud: parseInt(data.status) }, {
                where: {
                    id: {
                        [Op.eq]: parseInt(data.id)
                    }
                }
            });
            console.log(empresaInactive);
            if (empresaInactive) {
                result.data = {
                    message: "empresa eliminada con exito"
                };
            }
        }
        return result;
    } catch (error) {
        console.error(error);
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