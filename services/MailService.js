const nodemailer = require('nodemailer');
const emailConfig = require('../config').email;
const transporter = nodemailer.createTransport(emailConfig);
const debug = require('debug')('src:mailer');

class MailService {
    async sendResetToken(email, token) {
        console.log(token, email);
        const mailOptions = {
            from: 'test@example.com',
            to: email,
            subject: 'Reset token',
            html: `<b>Your reset token is ${token}</b>` // todo
        };
        try {
            const info = await transporter.sendMail(mailOptions);
            debug(info);
        } catch (err) {
            debug(err);
        }
    }
}

module.exports = MailService;
