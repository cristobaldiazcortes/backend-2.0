require('dotenv').config()
const nodeMailer = require('nodemailer')

const transporter = nodeMailer.createTransport({
    host: 'smt.office365.com',
    port: 587,
    service: process.env.SERVICE,
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})


const sendingMail = async mailOptions => {
    transporter.sendMail(mailOptions, (err, info) => 
    err ? console.log(err): console.log(`Proceso exitoso ${info.response}`))
}

module.exports = sendingMail