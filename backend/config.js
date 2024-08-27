const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    //server
    PORT: process.env.PORT,
    //mongodb
    MONGODB_URL: process.env.MONGODB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    //PayPal
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
};