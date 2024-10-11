const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    try {
        const transporter = nodeMailer.createTransport({
            service: process.env.SMTP_SERVICE,
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_APP_PASS,
            },
            authMethod: 'LOGIN',
        });

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: options.to,
            subject: options.subject,
            html: options.message,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email could not be sent');
    }
};

module.exports = sendEmail;