const customer = require('../models').customer;
const config = require('../config/config');
const STAtus = config.STAtus

module.exports = {
    checkDuplicateUsernameAndEmail(req, res, next) {
        customer.findOne({
            where: {
                username: req.body.username
            }
        }).then(user => {
            if (user) {
                res.status(400).send({
                    auth: false,
                    messages: "Error",
                    errors: 'Username is already taken!'
                })
                return
            }

            customer.findOne({
                where: {
                    email: req.body.email
                }
            }).then(email => {
                if(email) {
                    res.status(400).send({
                        auth: false,
                        messages: 'Error',
                        errors: 'Email is already exist'
                    })
                    return
                }
                
                next();
            })
        })
        
    },

    checkExistedStatus(req, res, next) {
        for ( let i = 0; i < req.body.laundryStatus.length; i++ ) {
            if ( !STAtus.includes(req.body.laundryStatus[i].toUpperCase()) ) {
                res.status(400).send({
                    auth: false,
                    messages: 'Error',
                    errors: 'Status not existed'
                })
                return;
            }
        }
        next();
    }
}