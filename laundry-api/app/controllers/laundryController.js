const laundry = require('../models').laundry;
const db = require('../models/index');
const Status = require('../models').status;
const Op = db.Sequelize.Op;

module.exports = {
    createLaundry(req, res) {
        return laundry.findOne({
            where: {
                customerUsername: req.username
            }
        }).then(user => {
            if ( !user ) {
                laundry.create({
                    customerUsername: req.username,
                    estimate: req.body.estimate,
                    qty: req.body.qty
                }).then(data => {
                    Status.findAll({
                        where: {
                            status: {
                                [Op.or]: req.body.laundryStatus
                            }
                        }
                    }).then(stat => {
                        data.setStatuses(stat).then(() => {
                            res.status(200).send({
                                auth: true,
                                customerUsername: req.username,
                                messages: 'Create Laundry Successfully!'
                            })  
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
            }
            else {
                res.status(400).send({
                    auth: false,
                    messages: 'Bad Request',
                    errors: 'Your last Laundry not yet Completed'
                })
            }

        }).catch(err => {
            res.status(500).send({
                auth: false,
                messages: 'Error',
                errors: {err}
            })
        })
        
    },

    listLaundry(req, res) {
        return laundry.findOne({
            where: {
                customerUsername: req.params.customerUsername
            }
        }).then(user => {
            if ( !user ) {
                res.status(404).send({
                    status_response: 'Bad Request',
                    messages: 'Username Not Found'
                })
                return
            }
            
            res.status(200).send({
                status_reponse: 'OK',
                laundry: user
            });
        }).catch(() => {
            res.status(404).send({
                status_response: 'Bad Request',
                messages: 'Username Not Found'
            })
        })
    },

    listAllLaundry(req, res) {
        return laundry.findAll({
            include: [],
            order: [
                ['createdAt', 'DESC']
            ]
        }).then(datas => {
            console.log(`>>> ${datas} <<<`)
            res.status(200).send({
                status_reponse: 'OK',
                totalLaundry: datas.length,
                laundry: datas.map(data => {
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

    updateLaundryInformation(req, res) {
        return laundry.findOne({
            where: {
                customerUsername: req.username
            }
        }).then(user => {
            if ( !user ) {
                res.status(404).send({
                    status_response: 'Not Found',
                    errors: 'Username Not Found'
                })
                return
            }

            return user.update({
                estimate: req.body.estimate || user.estimate,
                berat: req.body.berat || user.berat
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
                status_reponse: 'Error',
                errors: {err}
            })
        })
    },
    
    deleteLaundry(req, res) {
        return laundry.findOne({
            where: {
                customerUsername: req.username
            }
        }).then(user => {
            if ( !user ) {
                res.status(404).send({
                    auth: false,
                    messages: 'Error',
                    errors: 'Username Not Found'
                })
                return
            }

            return user.destroy()
            .then(() => {
                res.status(200).send({
                    status_reponse: 'OK',
                    messages: 'Laundry has been Deleted'
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