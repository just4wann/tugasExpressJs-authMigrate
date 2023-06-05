const registerCheck = require('./registerCheck');
const verifySign = require('./verifySign');
const verifyToken = require('./verifyToken');
const customerController = require('./customerController');
const laundryController = require('./laundryController');
const statusController = require('./statusController')

module.exports = {
    registerCheck,
    verifySign,
    verifyToken,
    customerController,
    laundryController,
    statusController
}