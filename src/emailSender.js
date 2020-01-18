class EmailSender {

    userEmail = 'REPLACE_THIS_WITH_YOUR_EMAIL_ADDRESS';
    password =  'REPLACE_THIS_WITH_YOUR_EMAIL_PASSWORD';

    constructor() {
        const nodemailer = require('nodemailer');
        this.path = require('path');
        this.fs = require('fs').promises;

        this.smtpTransport = nodemailer.createTransport({
            name: 'www.YOUR_DOMAIN_NAME.com',
            host: 'mail.YOUR_DOMAIN_NAME.com',
            service: 'YOUR_DOMAIN_NAME',
            port: 465, // If you have different port for outgoing mails use it
            secure: true, // Set secure to false if your port is different than 465
            auth: {
                user: this.userEmail,
                pass: this.password
            },
            tls: {
                rejectUnauthorized: false
            },
            debug: true,
            logger: true
        });
    }

    async sendEmail(mailOptions, callback) {
        try {
            const result = this.smtpTransport.sendMail(mailOptions);
            callback(false, result);
        } catch (error) {
            callback(true, error);
        }
    }

    async sendTestEmailConfirmation(firstName, lastName, subject, sendEmailTo, callback) {
        const mailOptions = {
            from: this.userEmail,
            to: sendEmailTo,
            replyTo: 'contact@developershive.com',
            subject: subject
        };

        const fileLocation = this.path.join( __dirname, 'templates', 'promotion_mail.html' );

        try {
            
            let html = await this.fs.readFile( fileLocation, 'utf-8' );

            html = html.replace( '[(FIRST_NAME)]', firstName );
            html = html.replace( '[(FIRST_NAME)]', firstName );
            html = html.replace( '[(LAST_NAME)]', lastName );

            mailOptions.html = html;

            await this.sendEmail( mailOptions, (error, data) => {
                callback(error, data);
            });
        } catch (error) {
            callback(true, error);
        }
    }

}

module.exports = EmailSender;