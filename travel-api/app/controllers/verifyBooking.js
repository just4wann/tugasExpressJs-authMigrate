const config = require('../config/configBook');
const Cars = config.Cars;
const Destination = config.Destination;
const Booking = require('../models').booking

module.exports = {
    checkCarsExisted(req, res, next) {
        for ( let i = 0; i < req.body.kendaraanId.length; i++ ) {
            if(!Cars.includes(req.body.kendaraanId[i].toUpperCase())) {
                res.status(400).send({
                    auth: false,
                    userName: req.username,
                    message: `Theres no ${req.body.kendaraanId} in our list!`
                })
            }
        }
        next();
    },

    checkDestinationExisted(req, res, next) {
        for ( let i = 0; i < req.body.tujuanId.length; i++ ) {
            if(!Destination.includes(req.body.tujuanId[i].toUpperCase())) {
                res.status(400).send({
                    auth: false,
                    userName: req.username,
                    message: `Theres no ${req.body.tujuanId} in our list!`,
                })
            }
        }
        next();
    },

    checkSimilarDate(req, res, next) {
        console.log(`>>> Check Date <<<`)
        Booking.findAll({
            where: {
                userName: req.username
            }
        }).then(user => {
            if(user.jadwalKeberangkatan === req.body.jadwalKeberangkatan) {
                res.status(400).send({
                    auth: false,
                    userName: req.username,
                    message: 'Date has been booked',
                    errors: `Error ${err}`
                })
            }
            
        })
        next();
    }

}