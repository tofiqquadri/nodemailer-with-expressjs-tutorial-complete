const express = require('express');
const router = new express.Router();
const EmailSender = require('../emailSender');

router.post('/sendEmail', async (req, res) => {
    try {

        const emailSender = new EmailSender();

        const {
            firstName,
            lastName,
            subject,
            sendEmailTo
        } = req.body;

        await emailSender.sendTestEmailConfirmation(firstName, lastName, subject, sendEmailTo, (isError, response) => {
            console.log('isError', isError);
            console.log('Response', response);
        });

        res.status(200).send({
            error: false,
            message: 'Email Sent Success'
        });
    } catch (error) {
        res.status(400).send({
            error: true,
            message: error
        });
    }
});

module.exports = router;