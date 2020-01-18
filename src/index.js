const express = require('express');
const bodyParser = require('body-parser');
const emailSenderRoute = require('./router/emailSender');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(emailSenderRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Server started at:', port);
});