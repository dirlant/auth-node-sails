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
var bcrypt = require('bcrypt');

var jwt_options = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : 'pharol'
}



module.exports = {

	login: function (req, res)	{

		if (req.param('email') && req.param('password')) {

				var email = req.param('email');
				var password = req.param('password')

				User.findOne({ email: email }).exec(function(err, user) {
					if(err)
						return res.json({ server: err });

					if (!user)
          	return res.json({ msg: 'invalid email!' });


					bcrypt.compare(password, user.password, function (err, pass) {
						if (!pass)
							return res.json({ msg: 'invalid password!' });

						var payload = {
	              id: user.id,
	          };

						var token = jwt.encode(payload, jwt_options.secretOrKey);

						return res.json({ token: token });

		      });

				});

    } else {
      res.send({ msg: 'user & password required!' });
    }
	},

  /*
  * Auth Google
  */
  google: function(req, res) {
      console.log('step1');
      passport.authenticate('google', {
        scope : ['profile']
      })(req, res);
  },

  googleCallback: function(req,res){
    passport.authenticate('google', (req, user) => {
      console.log(user.id);
      var payload = {
          id: user.id,
      };

      var token = jwt.encode(payload, jwt_options.secretOrKey);

      return res.json({ token: token });

    })(req, res);
  },


  logout: function(req,res){
    req.logout();
    res.send('logout');
  },
};
