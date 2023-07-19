const customer = require('../models').customer;
const bcrypt = require('bcryptjs');

module.exports = {
  getByUsername(req, res) {
    return customer
      .findByPk(req.params.username, {
        include: [],
      })
      .then((username) => {
        if (!username) {
          return res.status(404).send({
            status_response: 'Error',
            errors: `Customer With Username ${req.params.username} Not Found`,
          });
        } else {
          return res.status(200).send({
            status_response: 'OK',
            status: username,
          });
        }
      });
  },

  listAllCustomer(req, res) {
    return customer
      .findAll({
        include: [],
        order: [['createdAt', 'DESC']],
      })
      .then((datas) => {
        res.status(200).send({
          status_response: 'OK',
          totalCustomer: datas.length,
          customers: datas.map((data) => {
            return data;
          }),
        });
      })
      .catch((err) => {
        res.status(400).send({
          status_response: 'Bad Request',
          errors: err,
        });
      });
  },

  updateCustomerInformation(req, res) {
    return customer
      .findOne({
        where: {
          username: req.username,
        },
      })
      .then((user) => {
        if (!user) {
          res.status(404).send({
            auth: false,
            messages: 'Error',
            errors: 'Username Not Found.',
          });
          return;
        }

        return user
          .update({
            name: req.body.name || user.name,
            email: req.body.email || user.email,
            password: bcrypt.hashSync(req.body.password, 8) || user.password,
          })
          .then((data) => {
            res.status(200).send({
              status_response: 'OK',
              status: data,
              messages: 'Update Successfully!',
            });
          })
          .catch((err) => {
            res.status(500).send({
              auth: false,
              messages: 'Error',
              errros: err,
            });
          });
      });
  },

  deleteCustomer(req, res) {
    return customer
      .findByPk(req.params.username)
      .then((user) => {
        if (!user) {
          res.status(404).send({
            auth: false,
            messages: 'Error',
            errors: 'Username Not Found',
          });
          return;
        } else if (req.params.username !== req.username) {
          res.status(400).send({
            auth: false,
            messages: 'Error',
            errors: 'Different Username, Cant Delete!',
          });
          return;
        }

        return user
          .destroy()
          .then(() => {
            res.status(200).send({
              status_response: 'OK',
              messages: 'Delete Completed',
            });
          })
          .catch((err) => {
            res.status(400).send({
              status_response: 'Error',
              messages: 'Cant delete',
              errors: err,
            });
          });
      })
      .catch((err) => {
        res.status(500).send({
          status_response: 'Bad Request',
          errors: err,
        });
      });
  },
};
