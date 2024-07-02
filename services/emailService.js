require('dotenv').config();
const nodemailer = require('nodemailer');
const mailgun = require('mailgun-js');

// Nodemailer için transport ayarları
const transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

class EmailSender{
    static async sendEmail(req, res, email, link){

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'You are invited!',
            text: `Please click the following link to accept the invitation: ${link}`,
        };

        await transporter.sendMail(mailOptions);
    }
}

module.exports = EmailSender


// const DOMAIN = 'tourserve.com'; 
// const mg = mailgun({ apiKey: 'ed8bbf8521c5f315ba21f8261cd43814-623e10c8-9c0d4bf3', domain: DOMAIN });

// Send Email with Mailgun
// const data = {
//     from: 'ragim1753@gmail.com', 
//     to: guideEmail,
//     subject: 'You are invited!',
//     text: `Please click on the following link to accept the invitation: ${invitationLink}`
// };

// mg.messages().send(data, (error, body) => {
//     if (error) {
//         console.error(error);
//         return res.status(500).send('Error sending invitation');
//     }
//     console.log(body);
//     res.send('Invitation sent!');
// });