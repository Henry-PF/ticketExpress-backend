const { datos } = require('../db')
const { Op } = require('sequelize');

exports.create = async (data) => {
    let pasajero = data.body;

    try {
        const newPassager = await datos.create({
            nombre: pasajero.nombre,
            apellido: pasajero.apellido,
            correo: pasajero.correo,
            dni: pasajero.dni,
            telefono: pasajero.telefono
        });
        return newPassager;
    } catch (error) {
        console.log(error);
    }
}