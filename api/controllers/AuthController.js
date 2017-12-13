/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
var passportJWT = require("passport-jwt");
var jwt = require('jwt-simple');
var ExtractJwt = require("passport-jwt").ExtractJwt;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';



module.exports = {
	login: function(req, res) {
			passport.authenticate('local', function(err, user, info) {
					if ((err) || (!user)) {
							return res.send({
									msg: info.msg,
									msg_log: info.log,
									user: user,
									log: 'AuthController.js - line 1 aprox',
							});
					}
					req.logIn(user, function(err) {
							if (err) res.send(err);
							return res.send({
									msg: info.msg,
									msg_log: info.log,
									user: user,
									log: 'AuthController.js - line 1 aprox',
							});
					});

			})(req, res);
	},


	auth: function (req, res)	{
		if (req.param('email') && req.param('password')) {
				var email = req.param('email');
				var password = req.param('password')

        var user = User.findOne(function(err, res) {
						console.log(res);
            return 'error'; //res.email === email && res.password === password;
        });

        if (user) {
            var payload = {
                id: user.id
            };
            var token = jwt.encode(payload, opts.secretOrKey);
            res.json({
                token: token
            });
        } else {
            res.send({ status: 401 });
        }
    } else {
        res.send({ status: 401 });
    }
	},





	token: function(req, res) {
			passport.authenticate('local', function(err, user, info) {
					if ((err) || (!user)) {
							return res.send({
									msg: info.msg,
									msg_log: info.log,
									user: user,
									log: 'AuthController.js - line 1 aprox',
							});
					}
					req.logIn(user, function(err) {
							if (err) res.send(err);
							token = jwt.encode(user.id, sails.config.globals.jwt_secret);

							console.log(user);
							return res.send({
									msg: info.msg,
									msg_log: info.log,
									token: token,
									log: 'AuthController.js - line 1 aprox',
							});
					});

			})(req, res);
	},
	logout: function (req, res) {
    delete req.logout();
    res.json({success: true})
  },

};
