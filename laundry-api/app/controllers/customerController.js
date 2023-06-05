const customer = require('../models').customer;
const bcrypt = require('bcryptjs');

module.exports = {
    getByUsername(req, res) {
        return customer.findByPk(
            req.params.username, {
                include: []
            }
        ).then(username => {
            if ( !username ) {
                return res.status(404).send({
                    status_reponse: 'Error',
                    errors: `Customer with Username ${req.params.username} Not Found`
                })
            } else {
                return res.status(200).send({
                    status_reponse: 'OK',
                    status: username
                })
            }
        })
    },

    listAllCustomer(req, res) {
        return customer.findAll({
            include: [],
            order: [
                ['createdAt', 'DESC']
            ]
        }).then(datas => {
            res.status(200).send({
                status_reponse: 'OK',
                totalCustomer: datas.length,
                customers: datas.map(data => {
                    return data
                })
            })
        }).catch(err => {
            res.status(400).send({
                status_response: 'Bad Request',
                errors: err
            })
        })
    },

    updateCustomerInformation(req, res) {
        return customer.findOne({
            where: {
                username: req.username
            }
        }).then(user => {
            if ( !user ) {
                res.status(404).send({
                    auth: false,
                    messages: 'Error',
                    errors: 'Username Not Found.'
                })
                return;
            }

            return user.update({
                name: req.body.name || user.name,
                email: req.body.email || user.email,
                password: bcrypt.hashSync(req.body.password, 8) || user.password
            }).then(data => {
                res.status(200).send({
                    status_reponse: 'OK',
                    status: data,
                    messages: 'Update Successfully!'
                })

            }).catch(err => {
                res.status(400).send({
                    auth: false,
                    messages: 'Bad Request',
                    errors: {err}
                })
            })
        }).catch(err => {
            res.status(500).send({
                auth: false,
                messages: 'Error',
                errors: {err}
            })
        })
    },

    deleteCustomer(req, res) {
        return customer.findByPk(req.params.username)
        .then(user => {
            if ( !user ) {
                res.status(404).send({
                    auth: false,
                    messages: 'Error',
                    errors: 'Username Not Found'
                });
                return;
            }

            else if ( user.username !== req.username ) {
                res.status(400).send({
                    auth: false,
                    messages: 'Error',
                    errors: 'Different Username'
                });
                return;
            }

            return user.destroy()
            .then(() => {
                res.status(200).send({
                    status_reponse: 'OK',
                    messages: 'Username has been Deleted'
                })
            }).catch(err => {
                res.status(400).send({
                    status_reponse: 'Bad Request',
                    errors: {err}
                })
            })
        
        }).catch(err => {
            res.status(500).send({
                status_response: 'Bad Request',
                errors: {err}
            })
        })
    }


}