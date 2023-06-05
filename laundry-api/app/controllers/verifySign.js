const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const customer = require('../models').customer
const config = require('../config/config')

module.exports = {
    signUp(req, res) {
        return customer.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        }).then(() => {
            res.send({
                auth: true,
                username: req.body.username,
                messages: 'Register successfully!',
                errors: null
            })
        })
    },

    signIn(req, res) {
        return customer.findOne({
            where: {
                username: req.body.username
            }
        }).then(data => {
            if(!data) {
                return res.status(400).send({
                    auth: false,
                    messages: 'Error',
                    errors: 'Username not found!'
                })
            }

            const passwordValid = bcrypt.compareSync(req.body.password, data.password)
            if ( !passwordValid ) {
                return res.status(400).send({
                    auth: false,
                    messages: 'Error',
                    errors: 'Password invalid!'
                })
            }

            const token = 'Barier ' + jwt.sign({
                username: data.username
            }, config.secret, {
                expiresIn: 86400
            });

            res.status(200).send({
                auth: true,
                username: req.body.username,
                accessToken: token,
                messsages: 'SignIn success',
                errors: null
            })
                
        }).catch(err => {
            res.status(500).send({
                auth: false,
                messages: 'Cannot SignIn',
                errors: `${err}`
            })
        })
    }
}