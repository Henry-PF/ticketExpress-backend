const axios = require("axios");
const { reserva,datos,pasajeros,boletos,pago_boletos,rutas,buses_rutas,usuarios,pasajeros_reserva,rutas_empresa,empresas,terminales,buses} = require('../db.js');
const { Op } = require("sequelize");
const {sendEmail} = require("../config/mailer.js");
const {createBoletoPDF} = require("../public/index.js");
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
      let dta_User = await usuarios.findOne({where:{id:{[Op.eq]:body.id_user}}});
      if(dta_User){
        let dta_ruta = await rutas.findOne({where:{id:{[Op.eq]:body.id_ruta}}});
          if(dta_ruta){
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
                  username: PAYPAL_API_CLIENT,
                  password: PAYPAL_API_SECRET,
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

            let dtaPaypal=response.data;

            dtaReserva = await reserva.create({
              id_ruta:dta_ruta.id,
              id_user:dta_User.id,
              cantidadPasajeros:dataPasajeros.length ,
              precio:body.monto,
              viajeIdayVuelta:body.viajeIdayVuelta,
              id_statud:1,
              pagada:false,
              refPago:dtaPaypal.id
            })

            if (dtaReserva){
              if (dataPasajeros.length > 0){
                dataPasajeros.forEach(async (element) => {
                  let dataRegis = await datos.findOne({where:{dni:{[Op.eq]:element.dni}}});
                  let idDatos = 0;
                  if(dataRegis){
                    idDatos = dataRegis.dataValues.id;
                  }else{
                    dataRegis = await datos.create({
                      "nombre": element.nombre,
                      "apellido": element.apellido,
                      "correo": element.correo,
                      "dni": element.dni,
                      "cuit": element.cuit,
                      "direccion":element.direccion,
                      "telefono":element.telefono 
                    });
                    idDatos = dataRegis.dataValues.id;
                  }
                  if(element.asiento){
                    let vrfAsiento =await pasajeros.findOne({where:{asiento:{[Op.eq]:element.asiento}}});
                    if (!vrfAsiento) {
                      let dtaPasajero = await pasajeros.create({id_datos:idDatos,asiento:element.asiento,id_statud:1}); 
                      if (dtaPasajero) {
                        await pasajeros_reserva.create({id_pasajero:dtaPasajero.id,id_reserva:dtaReserva.id});
                      }
                    }else{
                      res.status(401).json({message: "asiento no disponible"})
                    }
                  }else{
                    res.status(401).json({message: "pasajero sin asiento asignado"})
                  }
                });
              }
            }
            res.json(response.data); 
          }else{
            res.status(401).json({message: "ruta no encontrada"})
          }
      }else{
        res.status(401).json({message: "usuario no encontrado"})
      }
    }else{
      return res.status(401).json({message: "No data provided"})
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
      attributes: { exclude: ['id','id_ruta','id_statud','usuarioId'] },
      include:[
        {
          attributes: { exclude: ['id', 'id_statud'] },
          model:usuarios,
          include:[{
            model:datos
          }]
        },
        {
          attributes: { exclude: ['id', 'id_statud'] },
          model:rutas,
          include:[{
            model:rutas_empresa,
            include:{
              attributes: { exclude: ['id','id_datos','id_statud'] },
              model:empresas,
              include:{
                attributes: { exclude: ['id'] },
                model:datos
              }
            }
          }]
        },
        {
          model:pasajeros_reserva,
          attributes: { exclude: ['id_pasajero'] },
          include: [
            {
              model:pasajeros,
              attributes: { exclude: ['id_datos', 'id_statud'] },
              include:{
                attributes: { exclude: ['id'] },
                model:datos
              }
            }
          ]}
      ],
      where:{
        refPago:{
          [Op.eq]:token
        }
      }
    });
    if(dtaReserva){
      const response = await axios.post(
        `${PAYPAL_API}v2/checkout/orders/${token}/capture`,
        {},
        {
          auth: {
            username: PAYPAL_API_CLIENT,
            password: PAYPAL_API_SECRET
          },
        }
      );

      let dtaPasajero=dtaReserva.pasajeros_reservas;
      let dtaOrigen = await terminales.findOne({where:{id:{[Op.eq]:dtaReserva.ruta.origen}}});
      let dtaDestino = await terminales.findOne({where:{id:{[Op.eq]:dtaReserva.ruta.destino}}});
      let dtabus = await buses_rutas.findOne({
        include:[{
          attributes: { exclude: ['id','capacidad','id_statud'] },
          model:buses
        }],
        where:{id_ruta:{[Op.eq]:dtaReserva.ruta.rutas_empresas[0].id_ruta}}
      })
      if (response.data.status === "COMPLETED") {
        dtaReserva.pagada = true;
        await dtaReserva.save();
        
        dtaPasajero.forEach(async (element) => {
          let dtaBoleto ={
            id_ruta: dtaReserva.ruta.rutas_empresas[0].id_ruta,
            id_statud: 1,
            id_empresa: dtaReserva.ruta.rutas_empresas[0].id_empresa,
            id_pasajero:element.pasajero.id,
            costo: parseFloat(dtaReserva.precio) / dtaReserva.cantidadPasajeros,
            fecha: new Date().toLocaleString()
          }
          let newBoleto =await boletos.create(dtaBoleto);
          
          if(newBoleto){
            await pago_boletos.create({
              id_boleto:newBoleto.id,
              tipo: "simple",
              fecha:new Date().toLocaleString(),
              ref:token
            });
            let datosPDf ={
              "pasajero":{
                "nombre": element.pasajero.dato.nombre,
                "apellido": element.pasajero.dato.apellido,
                "dni": element.pasajero.dato.dni,
                "direccion": element.pasajero.dato.direccion,
                "telefono": element.pasajero.dato.telefono,
                "correo": element.pasajero.dato.correo
              },
              "ruta":{
                "origen": dtaOrigen.nombre,
                "destino": dtaDestino.nombre,
                "fecha": dtaReserva.ruta.fecha_salida,
                "precio": dtaReserva.ruta.precio,
                "hora_salida": dtaReserva.ruta.hora_salida,
              },
              "bus":{
                "modelo":dtabus.bus.modelo,
                "marca":dtabus.bus.marca,
                "placa":dtabus.bus.placa
              },            
              "empresa":{
                "logoEmpresa": dtaReserva.ruta.rutas_empresas[0].empresa.url_logo,
                "nombre": dtaReserva.ruta.rutas_empresas[0].empresa.dato.nombre,
                "cuit": dtaReserva.ruta.rutas_empresas[0].empresa.dato.cuit,
                "direccion": dtaReserva.ruta.rutas_empresas[0].empresa.dato.direccion,
                "telefono": dtaReserva.ruta.rutas_empresas[0].empresa.dato.telefono
              }
            }
            await createBoletoPDF(element.pasajero.dato.dni,datosPDf); 
          }
        })
        //Enviaremos la notificacion del pago
        await sendEmail(
          dtaReserva.usuario.dato.correo, // Cambia por la dirección de correo a la que deseas enviar la notificación
          "Notificación de Pago",
          "Su pago se a realizado con éxito"
        );
      }
      res.json(response.data)
    }else{
      res.status(401).json({message: "ruta no encontrada"})
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
