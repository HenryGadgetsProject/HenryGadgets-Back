const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');

//const emailConfig = require('../config');
//Posiblemente pasar a mailtrap

const {
    user,
    pass,
} = process.env;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
            user,
            pass
    }
});

const generarHTML = (archivo, opciones={}) => {

    const html = pug.renderFile(`${__dirname}/emails/${archivo}.pug`, opciones);

    return juice(html);

}

//queda generica para ser utilizada desde cualquier parte de la aplicación

exports.enviar = async (opciones) => {

    const html = generarHTML(opciones.archivo, opciones);
    const text = htmlToText.fromString(html); //deprecated 

    let mailOptions = {
        from: 'esta@tequeremostony.com',
        to: opciones.email,
        subject: opciones.subject,
        text,
        html
    };

    const enviarEmail = util.promisify(transporter.sendMail, transporter);
    return enviarEmail.call(transporter, mailOptions);
}