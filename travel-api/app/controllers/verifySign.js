const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models').User
const config = require('../config/configBook');
const Role = require('../models').Role
const db = require('../models')
const Op = db.Sequelize.Op;

module.exports = {
	signup(req, res) {
		console.log('>>> Processing SignUp <<<')
		return User.create({
				userId: req.body.userId,
				name: req.body.name,
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, 8),
			}).then(user => {
				console.log('>>> Checking Role <<<')
				Role.findAll({
					where: {
						name: {
							[Op.or]: req.body.roles
						}
					}
				}).then(roles => {
					console.log('>>> Setting User Role <<<')
					user.setRoles(roles).then(() => {
						res.status(200).send({
							auth: true,
							userId: req.body.userId,
							message: "User registered successfully!",
							errors: null,
						});
					});
				}).catch(err => {
					res.status(500).send({
						auth: false,
						message: "Error",
						errors: `Error while create an account ${err}`
					});
				});
			}).catch(err => {
				res.status(500).send({
					auth: false,
					userId: req.body.userId,
					message: "Error",
					errors: `Cannot create account! ${err}`
				});
			})
	},

	signin(req, res) {
		return User
			.findOne({
				where: {
					userId: req.body.userId
				}
			}).then(user => {
				if (!user) {
					return res.status(404).send({
						auth: false,
						userId: req.body.userId,
						accessToken: null,
						message: "Error",
						errors: "userId Not Found."
					});
				}

				var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
				if (!passwordIsValid) {
					return res.status(401).send({
						auth: false,
						userId: req.body.userId,
						accessToken: null,
						message: "Error",
						errors: "Invalid Password!"
					});
				}

				var token = 'Bearer ' + jwt.sign({
					userId: user.userId
				}, config.secret, {
					expiresIn: 86400 //24h expired
				});

				res.status(200).send({
					auth: true,
					userId: req.body.userId,
					accessToken: token,
					message: "SignIn success!",
					errors: null
				});
			}).catch(err => {
				res.status(500).send({
					auth: false,
					userId: req.body.userId,
					accessToken: null,
					message: `Error ${err}`
				});
			});
	}
}