const Booking = require('../models').booking;

module.exports = {

  getById(req, res) {
    return Booking
      .findByPk(req.params.id, {
        include: [],
      })
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({
            status_response: 'Not Found',
            errors: 'Booking Not Found',
          });
        }
        const status = {
          status_response: 'OK',
          status: doc,
          errors: null
        }
        return res.status(200).send(status);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error
        });
      });
  },

  list(req, res) {
    return Booking
      .findAll({
        limit: 10,
        include: [],
        order: [
          ['createdAt', 'DESC']
        ],
      })
      .then(docs => {
        const bookings = {
          status_response: 'OK',
          count: docs.length,
          bookings: docs.map(doc => {
            return doc
          }),
          errors: null
        }
        res.status(200).send(bookings);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error
        });
      });
  },

  listBookingUser(req, res) {
    return Booking
      .findAll({
        limit: 10,
        include: [],
        where: {
            userName: req.username,
        },
        order: [
          ['createdAt', 'DESC']
        ],
      })
      .then(docs => {
        const bookings = {
          status_response: 'OK',
          count: docs.length,
          bookings: docs.map(doc => {
            return doc
          }),
          errors: null
        }
        res.status(200).send(bookings);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error
        });
      });
  },

  add(req, res) {
    console.log('>>> Melengkapi Datadiri <<<')
    return Booking
      .create({
        userName: req.username,
        jadwalKeberangkatan: req.body.jadwalKeberangkatan,
        jadwalKepulangan: req.body.jadwalKepulangan,
        kendaraanId: req.body.kendaraanId,
        tujuanId: req.body.tujuanId
      })
      .then((booked) => {
        res.status(200).send({
          status_response: 'Booking successfully!',
          status: booked,
          errors: null
        })
      })
      .catch((error) => {
        res.status(500).send({
          status_response: 'Bad Request',
          errors: `${error}`
        });
      });
  },

  update(req, res) {
    return Booking
      .findByPk(req.params.id, {})
      .then(booking => {
        if (!booking) {
          return res.status(404).send({
            status_response: 'Bad Request',
            errors: 'Booking Not Found',
          });
        }

        if (booking.userName !== req.username) {
          return res.status(403).send({
            status_response: "Bad Request",
            errors: "Different UserName",
          });
        }

        return booking
          .update({
            jadwalKeberangkatan: req.body.jadwalKeberangkatan || booking.jadwalKeberangkatan,
            jadwalKepulangan: req.body.jadwalKepulangan || booking.jadwalKepulangan,
            kendaraanId: req.body.kendaraanId || booking.kendaraanId,
            tujuanId: req.body.tujuanId || booking.tujuanId
          })
          .then((doc) => {
            const booking = {
              status_response: 'OK',
              status: doc,
              errors: null
            }
            return res.status(200).send(booking);
          })
          .catch((error) => {
            res.status(400).send({
              status_response: 'Bad Request',
              errors: error
            });
          });
      })
      .catch((error) => {
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error
        });
      });
  },

  delete(req, res) {
    return Booking
      .findByPk(req.params.id)
      .then(booking => {
        if (!booking) {
          return res.status(400).send({
            status_response: 'Bad Request',
            errors: 'Status Not Found',
          });
        }

        if (booking.userName !== req.username) {
          return res.status(403).send({
            status_response: "Bad Request",
            errors: "Different User Id",
          });
        }

        return booking
          .destroy()
          .then(() => res.status(204).send({
            status_response: 'No Content',
            errors: null,
          }))
          .catch((error) => {
            res.status(400).send({
              status_response: 'Bad Request',
              errors: error
            });
          });
      })
      .catch((error) => {
        res.status(400).send({
          status_response: 'Bad Request',
          errors: error
        });
      });
  },
}