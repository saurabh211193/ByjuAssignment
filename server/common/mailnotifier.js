const nodemailer = require('nodemailer');
// const config = require('../config/mailer');

const transport = nodemailer.createTransport({
    service: 'SendGrid',
    secure: false,
    port: 25,
    auth: {
        user: 'saurabh93dtu@gmail.com',
        pass: 'saurabh211193'
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendEmail = (from, to, subject, html) => {
    return new Promise((resolve, reject) => {
        transport.sendMail({ from, subject, to, html }, (err, info) => {
            if (err) reject(err);
            resolve(info);
        });
    });
};

const resend = () => {

};


export {
    sendEmail,
    resend,
}
