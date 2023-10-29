const { usuarios, datos, statud } = require("../db");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmail = require('../config/mailer');

exports.create = async (data) => {
    let result = {};
    let dataUser = data.body;
    try {
        if (dataUser.data) {
            let dta = JSON.parse(dataUser.data);
            let dtaPersona = {
                nombre: dta.nombre,
                apellido: dta.apellido,
                correo: dta.correo,
                dni: dta.dni,
                cuit: dta.cuit,
                direccion: dta.direccion,
                telefono: dta.telefono,
                googleId: dta.googleId
            }
            let hashF = await bcrypt.hash(dta.password, 10).then(hash => {
                return hash;
            })
            let dtaUsuario = {
                nick: dta.nick,
                password: hashF,
                id_statud: "1",
                type: "usuario",
            }
            //Verficacion si los datos de la persona ya existe
            const personaExiste = await datos.findOne({ where: { correo: { [Op.eq]: dtaPersona.correo } } })
            if (!personaExiste) {
                data_p = await datos.create(dtaPersona).then(data => {
                    dtaUsuario.id_datos = data.id
                });
            } else {
                dtaUsuario.id_datos = personaExiste.id
            }
            //Crear usuario
            user = await usuarios.create(dtaUsuario);

            if (user) {
                result.data = user;
                result.message = "Usuario registrado con éxito";
                await sendEmail(
                    dtaPersona.correo,
                    "Bienvenido a TicketExpress ✔",
                    "<h1>Bienvenido a SmartPay</h1>",
                    `<p>Hola ${dtaPersona.nombre},</p>
                        <p>Gracias por registrarte en SmartPay, tu billetera virtual. Estamos emocionados de tenerte como parte de nuestra comunidad.</p>
                    <p>
                    A continuación, encontrarás algunos detalles sobre tu cuenta:
                    </p>
                    <ul>
                        <li>Nombre de usuario: </li>
                    </ul>
                    <p>¡Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nuestro equipo de soporte!</p>
                    <p>¡Esperamos que disfrutes de tu experiencia con SmartPay!</p>`
                );
                console.log(sendEmail);
            } else {
                throw new Error("Error al intentar registrar el usuario");
            }

        } else {
            throw new Error("Error faltan datos para proceder con el registro");
        }
    } catch (error) {
        console.log(error.message);
        result.error = error.message;
    }
    console.log(result);
    return result;
}


exports.update = async (data) => {
    let result = {};
    try {

    } catch (error) {
        result.error = error.message;
    }
    return result;
}
exports.findAll = async () => {
    let result = {};
    try {
        await usuarios.findAll({
            attributes: { exclude: ['password', 'id_datos', 'id_statud'] },
            include: [{ model: datos }, { model: statud }]
        }).then((dta) => {
            result.data = dta;
        });

    } catch (error) {
        console.log(error)
        result.error = error.message;
    }
    return result;
}
exports.FindID = async (id) => {
    let result = {};
    try {
        await usuarios.findOne({
            attributes: { exclude: ['password', 'id_datos', 'id_statud'] },
            include: [{ model: datos }, { model: statud }],
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        }).then((dta) => {
            result.data = dta;
        });

    } catch (error) {
        console.log(error)
        result.error = error.message;
    }
    return result;
}

exports.login = async (data) => {
    let result = {};
    try {
        await datos.findOne({
            include: [
                {
                    model: usuarios,
                    include: { model: statud },
                    where: {
                        id_statud: {
                            [Op.eq]: 1
                        }
                    }
                }
            ],
            where: {
                correo: {
                    [Op.eq]: data.correo
                }
            }
        }).then((dta) => {
            console.log('2', dta.usuarios[0]);
            if (dta) {
                if (!bcrypt.compareSync(data.password, dta.usuarios[0].password)) {
                    throw new Error('Contraseña incorrecta');
                } else {
                    const secretKey = "mZ1IWqsOvcTD31fPsDLig8TZ7v8nkTTB";
                    const token = jwt.sign({ userId: dta.usuarios[0].nick.id }, secretKey, {
                        expiresIn: "1h",
                    });
                    result.data = dta;
                    result.token = token;
                }
            } else {
                result.error = "Usuario no registrado";
            }
        });

    } catch (error) {
        console.log(error)
        result.error = error.message;
    }
    return result;
}

exports.Delete = async (id) => {
    let result = {};
    try {
        let dataUser = await usuarios.findOne({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });
        if (dataUser) {
            let dtaN = await usuarios.update({ isactivo: false }, {
                where: {
                    id: {
                        [Op.eq]: id
                    }
                }
            });
            if (dtaN) {
                result.data = {
                    message: "usuario eliminado con exito"
                };
            }
        }
    } catch (error) {
        console.log(error)
        result.error = error.message;
    }
    return result;
}

exports.findEmail = async (data) => {
    let result = {};
    try {
        if (data.email) {
            let dataUser = await datos.findOne({
                where: {
                    correo_electronico: {
                        [Op.eq]: data.email
                    }
                },
                includes: [{ model: usuarios }]
            })
            if (dataUser) {
                result.data = dataUser;
            } else {
                result.error = {
                    message: "usuario no encontrado"
                };
            }
        } else {
            result.error = {
                message: "falta el campo email"
            };
        }
    } catch (error) {
        console.log(error)
        result.error = error.message;
    }
    return result;
}