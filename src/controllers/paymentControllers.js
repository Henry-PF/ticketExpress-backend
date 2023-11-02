const axios = require("axios");
const { reserva, datos, pasajeros, boletos, rutas, buses_rutas, usuarios, pasajeros_reserva, rutas_empresa, empresas } = require('../db.js');
const { Op } = require("sequelize");
const { sendEmail, sendEmailAttachments } = require("../config/mailer.js");
const { createBoletoPDF } = require("../public/index.js");
const {
  PAYPAL_API,
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
} = require("../config/config.js");

const createOrder = async (req, res) => {
  try {
    let body = req.body;
    let dataPasajeros = body.datosPasajeros;
    if (body) {
      let dta_User = await usuarios.findOne({ where: { id: { [Op.eq]: body.id_user } } });
      if (dta_User) {
        let dtaReserva = await reserva.findOne({
          where: {
            id_user: {
              [Op.eq]: dta_User.id
            },
            id_statud: 1
          }
        });
        if (!dtaReserva) {
          res.status(401).json({ message: "usted posee una reserva activa" })
        } else {
          let dta_ruta = await rutas.findOne({ where: { id: { [Op.eq]: body.id_ruta } } });
          if (dta_ruta) {
            const order = {
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: body.monto,
                  },
                  description: "bus ticket sales application",

                },
              ],
              application_context: {
                payment_method: {
                  payer_selected: "PAYPAL",
                  payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED"
                },
                brand_name: "ticketExpress.com",
                landing_page: "LOGIN",
                user_action: "PAY_NOW",
                shipping_preference: "NO_SHIPPING",
                return_url: "http://localhost:3001/payment/capture-order",
                cancel_url: "http://localhost:3001/payment/cancel-order",
              },
            };

            const params = new URLSearchParams();
            params.append("grant_type", "client_credentials");

            const {
              data: { access_token },
            } = await axios.post(
              "https://api-m.sandbox.paypal.com/v1/oauth2/token",
              params,
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                auth: {
                  username: 'Ab3fo1dJ3hyDSILpbaYvlRDLHO9bVZwV_0fg-Mv0BKGT8xcyd255nu_6IAC3KTx1ll9IIP--QjIJ2_pA',
                  password: 'EI0uHYr_31_coCWAGIFpO6T4_zc86jM_EW_QlqafuxFFOJfi2CZaJqPslJ2e1Mf24XEpSZrkULpzwoJh',
                },
              }
            );
            const response = await axios.post(
              `${PAYPAL_API}v2/checkout/orders`,
              order,
              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
              }
            );

            let dtaPaypal = response.data;

            dtaReserva = await reserva.create({
              id_ruta: dta_ruta.id,
              id_user: dta_User.id,
              cantidadPasajeros: dataPasajeros.length,
              precio: body.monto,
              viajeIdayVuelta: body.viajeIdayVuelta,
              id_statud: 1,
              pagada: false,
              refPago: dtaPaypal.id
            })

            if (dtaReserva) {
              if (dataPasajeros.length > 0) {
                dataPasajeros.forEach(async (element) => {
                  let dataRegis = await datos.findOne({ where: { dni: { [Op.eq]: element.dni } } });
                  let idDatos = 0;
                  if (dataRegis) {
                    idDatos = dataRegis.dataValues.id;
                  } else {
                    dataRegis = await datos.create({
                      "nombre": element.nombre,
                      "apellido": element.apellido,
                      "correo": element.correo,
                      "dni": element.dni,
                      "cuit": element.cuit,
                      "direccion": element.direccion,
                      "telefono": element.telefono
                    });
                    idDatos = dataRegis.dataValues.id;
                  }
                  if (element.asiento) {
                    let vrfAsiento = await pasajeros.findOne({ where: { asiento: { [Op.eq]: element.asiento } } });
                    if (!vrfAsiento) {
                      let dtaPasajero = await pasajeros.create({ id_datos: idDatos, asiento: element.asiento, id_statud: 1 });
                      if (dtaPasajero) {
                        await pasajeros_reserva.create({ id_pasajero: dtaPasajero.id, id_reserva: dtaReserva.id });
                      }
                    } else {
                      res.status(401).json({ message: "asiento no disponible" })
                    }
                  } else {
                    res.status(401).json({ message: "pasajero sin asiento asignado" })
                  }
                });
              }
            }
            res.json(response.data);
          } else {
            res.status(401).json({ message: "ruta no encontrada" })
          }
        }
      } else {
        res.status(401).json({ message: "usuario no encontrado" })
      }
    } else {
      return res.status(401).json({ message: "No data provided" })
    }

  } catch (error) {
    console.log(error);
    res.status(500).send("Something goes wrong");
  }
};

const captureOrder = async (req, res) => {
  const { token } = req.query;

  try {
    let dtaReserva = await reserva.findOne({
      attributes: { exclude: ['id', 'id_ruta', 'id_user', 'id_statud', 'usuarioId'] },
      include: [
        {
          attributes: { exclude: ['id', 'id_statud'] },
          model: rutas,
          include: [{
            model: rutas_empresa,
            include: {
              attributes: { exclude: ['id', 'id_datos', 'id_statud'] },
              model: empresas,
              include: {
                attributes: { exclude: ['id'] },
                model: datos
              }
            }
          }]
        },
        {
          model: pasajeros_reserva,
          attributes: { exclude: ['id_pasajero'] },
          include: [
            {
              model: pasajeros,
              attributes: { exclude: ['id_datos', 'id_statud'] },
              include: {
                attributes: { exclude: ['id'] },
                model: datos
              }
            }
          ]
        }
      ],
      where: {
        refPago: {
          [Op.eq]: token
        }
      }
    });
    if (dtaReserva) {
      let dtaPasajero = dtaReserva.pasajeros_reservas;
      let dtaBoletos = []
      dtaPasajero.forEach(async (element) => {
        let dtaBoleto = {
          id_ruta: dtaReserva.ruta.rutas_empresas[0].id_ruta,
          id_statud: 1,
          id_empresa: dtaReserva.ruta.rutas_empresas[0].id_empresa,
          id_pasajero: element.pasajero.id,
          costo: parseFloat(dtaReserva.precio) / dtaReserva.cantidadPasajeros,
          fecha: new Date().toLocaleString()
        }
        let newBoleto = await boletos.create(dtaBoleto);
        if (newBoleto) {
          await createBoletoPDF(element.pasajero.dato.dni, "<h1>hola</h1>");
          // sendEmailAttachments(element.pasajero.dato.correo,"Boleto de bus","","",)
        }
        dtaBoletos.push(dtaBoleto)
      })

      if (dtaReserva) {
        res.json({ "dtaReserva": dtaReserva, "dtaBoleto": dtaBoletos })
      }


      /*const response = await axios.post(
        `${PAYPAL_API}v2/checkout/orders/${token}/capture`,
        {},
        {
          auth: {
            username: 'Ab3fo1dJ3hyDSILpbaYvlRDLHO9bVZwV_0fg-Mv0BKGT8xcyd255nu_6IAC3KTx1ll9IIP--QjIJ2_pA',
            password: 'EI0uHYr_31_coCWAGIFpO6T4_zc86jM_EW_QlqafuxFFOJfi2CZaJqPslJ2e1Mf24XEpSZrkULpzwoJh',
          },
        }
      );
      // Verifico si fue exitosa la captura
      if (response.data.status === "COMPLETED") {
        //dtaReserva.pagada = true;
        //await dtaReserva.save();
        
       attachments: [
          {
            filename: 'mailtrap.png',
            path: __dirname + '/mailtrap.png',
            cid: 'uniq-mailtrap.png' 
          }
        ]
        //Enviaremos la notificacion del pago
        
        sendEmailAttachments
        const emailResult = await sendEmail(
          "tucorreo@gmail.com", // Cambia por la dirección de correo a la que deseas enviar la notificación
          "Notificación de Pago",
          "Has realizado con éxito la compra del siguiente ticket :"
        );
  
        //console.log("Correo enviado: ", emailResult);
      }*/
    } else {
      res.status(401).json({ message: "ruta no encontrada" })
    }


    //res.redirect("http://localhost:3000/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Something goes wrong");
  }
};

const cancelOrder = (req, res) => {
  res.redirect("http://localhost:3000/");
};

module.exports = {
  createOrder,
  captureOrder,
  cancelOrder,
};
