require('dotenv').config()

const contactarMessage = (mail, nombre )=> {
    return {
        from: process.env.MAIL,
        to: mail,
        subject: 'solicitud de coder',
        html: `<html>
            <body>
                <h1 style="text-align: center;">Hola ${nombre}!</h1>
                <p style="text-align: center;">Gracias por ponerte en contacto, tu solicitud a sido enviado con exitor</p>
            </body>
          </html>
          `
    }
}

module.exports = contactarMessage