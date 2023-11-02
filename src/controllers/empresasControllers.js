const { empresas,datos } = require("../db");
const { Op } = require("sequelize");
const {cloudinary} = require("../config/cloudinary");
exports.create = async (data) => {
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
        if(datosEmpresas){
            const newEmpresa = await empresas.create({
                id_datos: datosEmpresas.id,
                id_statud: "1"
            })
            if(newEmpresa){
                return { message: "empresa creada con éxito" };
            }else{
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