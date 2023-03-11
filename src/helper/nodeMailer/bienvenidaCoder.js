require('dotenv').config()

const welcomeMessage = (mail, nombre )=> {
    return {
        from: process.env.MAIL,
        to: mail,
        subject: 'Gracias por unirte a nuestra red de Coders!',
        html: `<html>
            <body>
                <h1 style="text-align: center;">Hola ${nombre}!</h1>
                <p style="text-align: center;">Gracias por unirte a nuestro equipo, aquí tendrás una extensa vitrina para ayudarte en tu carrera como coder</p>
            </body>
          </html>
          `
    }
}

module.exports = welcomeMessage