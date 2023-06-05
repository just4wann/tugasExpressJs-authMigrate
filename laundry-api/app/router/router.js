const registerCheckController = require('../controllers').registerCheck;
const verifySignController = require('../controllers').verifySign;
const customerController = require('../controllers').customerController;
const laundryController = require('../controllers').laundryController;
const verifyToken = require('../controllers').verifyToken;
const statusController = require('../controllers').statusController

module.exports = function(app) {
    // Customer Authentication
    app.post('/signup',
        [
            registerCheckController.checkDuplicateUsernameAndEmail
        ],
        verifySignController.signUp
    );

    app.post('/signin', verifySignController.signIn);

    // Customers CRUD
    app.get('/customer/all', 
        [
            verifyToken.verifyToken
        ],
        customerController.listAllCustomer
    );

    app.get('/customer/:username', 
        [
            verifyToken.verifyToken
        ],
        customerController.getByUsername
    );

    app.put('/customer/update',
        [
            verifyToken.verifyToken
        ],
        customerController.updateCustomerInformation
    );

    app.delete('/customer/:username',
        [
            verifyToken.verifyToken,
        ],
        customerController.deleteCustomer
    )

    // laundry CRUD
    app.post('/laundry/create', 
        [
            verifyToken.verifyToken,
            registerCheckController.checkExistedStatus
        ],
        laundryController.createLaundry
    );

    app.get('/laundry/all', 
        [
            verifyToken.verifyToken
        ],
        laundryController.listAllLaundry
    );

    app.get('/laundry/:customerUsername', 
        [
            verifyToken.verifyToken
        ],
        laundryController.listLaundry
    );

    app.put('/laundry/update',
        [
            verifyToken.verifyToken
        ],
        laundryController.updateLaundryInformation
    );

    app.delete('/laundry/:username',
        [
            verifyToken.verifyToken,
        ],
        laundryController.deleteLaundry
    );

    // Status CRUD
    app.get('/status/laundry/all', 
        [
            verifyToken.verifyToken
        ],
        statusController.listAllLaundryStatus
    );

    app.get('/status/laundry/:status', 
        [
            verifyToken.verifyToken
        ],
        statusController.listLaundryByStatus
    );

    app.put('/status/laundry/update', 
        [
            verifyToken.verifyToken,
            registerCheckController.checkExistedStatus
        ],
        statusController.updateStatusLaundry
    );

    app.delete('/status/laundry/delete', 
        [
            verifyToken.verifyToken
        ],
        statusController.deleteLaundryFinished
    );

}