const nodemailer = require('nodemailer');

async function sendEmail({ from, to, subject, text, html }) {

    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.smtp_port,
        secure: false,
        auth: {
            user: process.env.user,
            password: process.env.pass
        }
    });
    let info = await transporter.sendMail({
        from: `share<${from}>`,
        to: to,
        subject: subject,
        text: text,
        html: html
    });
    console.log(info);

}

module.exports = sendEmail;