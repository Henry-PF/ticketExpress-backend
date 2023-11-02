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
        .fontSize(12) 
        .text(data, 300, 100); 
        doc.end();
    } catch (error) {
        console.log(error)
    }
}
