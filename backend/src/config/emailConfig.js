const config = require('./config')
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:config.EMAIL,
        pass:config.EMAIL_PASSWORD
    }
})
module.exports = transporter;