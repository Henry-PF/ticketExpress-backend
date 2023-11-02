const { reserva,datos,pasajeros,boletos,rutas,buses_rutas,usuarios,pasajeros_reserva} = require('../db.js');
const PDFDocument = require('pdfkit');
const fs = require("fs");
var path = require('path');
const {sendEmailAttachments} = require("../config/mailer.js");

exports.createBoletoPDF = async (dni,data)=>{
    try {
        const doc = new PDFDocument();
        let outputFilename =path.join(__dirname,'boletos',`boleto_${dni}.pdf`);
        const stream = fs.createWriteStream(outputFilename);
        doc.pipe(stream);
        doc.image(path.join(__dirname,'img',`logo.png`), {fit: [100, 125],align: 'left',valign: 'center'})
        doc.fontSize(16)
        doc.text('Boleto de Bus', 100, 100,{ align: 'center' })
        doc.fontSize(16) 
        doc.text("Datos del pasajero: ", 100, 320)
        doc.fontSize(12) 
        doc.text(`Nombre: ${data.pasajero.nombre}`, 100, 350)
        doc.text(`Apellido: ${data.pasajero.apellido}`, 100, 360)
        doc.text(`Dni: ${data.pasajero.dni}`, 100,370)
        doc.text(`Direccion: ${data.pasajero.direccion}`, 100,380)
        doc.text(`Telefono: ${data.pasajero.telefono}`, 100,390)
        doc.fontSize(16) 
        doc.text("Datos de la ruta: ", 100, 420)
        doc.fontSize(12) 
        doc.text(`Origen: ${data.ruta.origen}`,100, 450)
        doc.text(`Destino: ${data.ruta.destino}`,100, 460)
        doc.text(`Fecha: ${data.ruta.fecha}`,100, 470)
        doc.text(`Precio: ${data.ruta.precio}`,100, 480)
        doc.fontSize(16) 
        doc.text("Datos del Bus: ", 100, 520)
        doc.fontSize(12) 
        doc.text(`Modelo: ${data.bus.modelo}`, 100, 550)
        doc.text(`Marca: ${data.bus.marca}`, 100, 560)
        doc.text(`Placa: ${data.bus.placa}`, 100, 570);
        doc.fontSize(16) 
        doc.text("Datos de la empresa: ", 100, 620)
        doc.fontSize(12) 
        doc.text(`nombre: ${data.empresa.nombre}`, 100, 650)
        doc.text(`cuit: ${data.empresa.cuit}`, 100, 660)
        doc.text(`direccion: ${data.empresa.direccion}`, 100, 670);
        doc.text(`telefono: ${data.empresa.telefono}`, 100, 680);

        // Cerrar el flujo de escritura al terminar
        stream.on('finish', () => {
            console.log(`Se ha creado el boleto en ${outputFilename}`);
        });

        // Manejar errores
        doc.on('error', (err) => {
            console.error(`Error al generar el PDF: ${err}`);
        });

        // Finalizar el documento PDF
        doc.end();
        let boletoPDF = {
            filename: `boleto_${dni}.pdf`,
            path: outputFilename
        }
        sendEmailAttachments(data.pasajero.correo,"Boleto de bus","Gracias por tu compra","",boletoPDF);
    } catch (error) {
        console.log(error)
    }
}
