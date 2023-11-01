var pdf = require('html-pdf');

exports.createBoleto = async ()=>{
    let contenido = ""
    let divHeader =`<div id="pageHeader" style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">
    <img src="/img/logo.png" width="150" height="27" align="left">
    <p style="color: #666; margin: 0; padding-top: 12px; padding-bottom: 5px; text-align: right; font-family: sans-serif; font-size: .85em">
        Boleto de Bus
    </p>
</div>`
    let divFooter =`<div id="pageFooter" style="border-top: 1px solid #ddd; padding-top: 5px;">
    <p style="color: #666; width: 70%; margin: 0; padding-bottom: 5px; text-align: let; font-family: sans-serif; font-size: .65em; float: left;">ticketExpress - tu mejor aliado</p>
    <p style="color: #666; margin: 0; padding-bottom: 5px; text-align: right; font-family: sans-serif; font-size: .65em">Página {{page}} de {{pages}}</p>
</div>`;

    
    
    try {
        return await pdf.create(contenido, {format: 'Letter', orientation: 'portrait'}).toFile(`../public/boletos/boleto_${dni}.pdf`, function(err, res) {
            if (err) return reject(err);
            resolve(res);
        });
    } catch (error) {
        console.log(error)
    }
   
}
