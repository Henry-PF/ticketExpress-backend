const { reserva,datos,pasajeros,boletos,rutas,buses_rutas,usuarios,pasajeros_reserva} = require('../db.js');
const PDFDocument = require('pdfkit');
const fs = require("fs");
var path = require('path');




exports.createBoletoPDF = async (dni,data)=>{
    try {
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(path.join(__dirname,'boletos',`boleto_${dni}.pdf`)));
        doc
        .image(path.join(__dirname,'img',`logo.png`), {fit: [250, 125],align: 'left',valign: 'center'})
        .image(path.join(__dirname,'img',`logo.png`), {fit: [250, 125],align: 'right',valign: 'center'})
        .fontSize(24) 
        .text("Boleto de bus", 300, 100)
        .fontSize(16) 
        .text("Datos del pasajero: ", 250, 320)
        .fontSize(12) 
        .text("Nombre: ", 250, 350)
        .text("Apellido: ", 250, 360)
        .text("Dni: ", 250,370)
        .text("Direccion: ", 250,380)
        .text("Telefono: ", 250,390)
        .fontSize(16) 
        .text("Datos de la ruta: ", 250, 420)
        .fontSize(16) 
        .text("Datos del Bus: ", 250, 520)
        .end();
    } catch (error) {
        console.log(error)
    }
}
