const status = require('../models').status
const laundry = require('../models').laundry
const db = require('../models/index');
const Op = db.Sequelize.Op;

module.exports = {
    listAllLaundryStatus(req, res) {
        return laundry.findAll({
            include: status
        }).then(datas => {
            res.status(200).send({
                status_response: 'OK',
                totalLaundry: datas.length,
                statusLaundry: datas
            })
        }).catch(err => {
            res.status(500).send({
                status_response: 'Error',
                errors: `${err}`
            })
        })
    },

    listLaundryByStatus(req, res) {
        return laundry.findAll({
            include: {
                model: status,
                where: {
                    status: req.params.status
                }
            }
        }).then(datas => {
            res.status(200).send({
                status_reponse: 'OK',
                totalLaundry: datas.length,
                statuses: datas
            })
        }).catch(err => {
            res.status(404).send({
                status_response: 'Bad Request',
                errors: `${err}`
            })
        })
    },

    updateStatusLaundry(req, res) {
        return laundry.findOne({
            where: {
                customerUsername: req.username
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
            
            user.removeStatuses([0]).then(stat => {
                return stat
            })
            status.findAll({
                where: {
                    status: {
                        [Op.or]: req.body.laundryStatus
                    }
                }
            }).then(stat => {
                return user.addStatuses(stat).then(data => {
                    console.log(`>>> ${data} <<<`)
                    res.status(200).send({
                        status_reponse: 'OK',
                        status: data,
                        messages: 'Update Status Successfully!'
                    })
                }).catch(err => {
                    res.status(400).send({
                        status_response: 'Error',
                        errors: `${err}`
                    })
                })
            }).catch(err => {
                res.status(403).send({
                    status_response: 'Error',
                    errors: `${err}`
                })
            })
            
        }).catch(err => {
            res.status(500).send({
                status_response: 'Error',
                errors: `${err}`
            })
        })
    },

    deleteLaundryFinished(req, res) {
        return laundry.findOne({
            include: {
                model: status,
                where: {
                    status: 'FINISH'
                }
            }
        }).then(user => {
            if ( !user ) {
                res.status(200).send({
                    status_response: 'OK',
                    messages: 'There`s no Laundry Finished'
                })
                return
            }
            
            return user.destroy().then(() => {
                res.status(200).send({
                    status_response: 'OK',
                    messages: 'One Laundry Finish Has Been Deleted'
                })
            })
            
        }).catch(err => {
            res.status(500).send({
                status_response: 'Error',
                errors: `${err}`
            })
        })
    }


}