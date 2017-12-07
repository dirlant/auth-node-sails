/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

	login: function(req, res) {
			passport.authenticate('local', function(err, user, info) {
					if ((err) || (!user)) {
							return res.send({
									message: info.message,
									mensaje_log: info.log,
									user: user,
									log: 'AuthController.js - line 1 aprox',
							});
					}
					req.logIn(user, function(err) {
							if (err) res.send(err);
							return res.send({
									message: info.message,
									mensaje_log: info.log,
									user: user,
									log: 'AuthController.js - line 1 aprox',
							});
					});

			})(req, res);
	},
};
