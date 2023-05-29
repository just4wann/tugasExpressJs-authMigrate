const User = require('../models').User;
const config = require('../config/configBook');
const Roles = config.Roles

module.exports = {
	checkDuplicateUserNameOrEmail(req, res, next) {
		User.findOne({
			where: {
				userId: req.body.userId
			}
		}).then(user => {
			if (user) {
				res.status(400).send({
					auth: false,
					userId: req.body.userId,
					message: "Error",
					errors: "userId is already taken!"
				});
				return;
			}

			User.findOne({
				where: {
					email: req.body.email
				}
			}).then(user => {
				if (user) {
					res.status(400).send({
						auth: false,
						userId: req.body.userId,
						message: "Error",
						errors: "Email is already taken!"
					});
					return;
				}
				next();
			});
		});
	},

	checkRolesExisted(req, res, next) {
		for (let i = 0; i < req.body.roles.length; i++) {	
			if (!Roles.includes(req.body.roles[i].toUpperCase())) {
				res.status(400).send({
					auth: false,
					userId: req.body.userId,
					message: "Error",
					errors: "Does NOT exist Role = " + req.body.roles[i]
				});
				return;
			}
		}
	next();
	}
}