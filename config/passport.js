
var passport = require('passport');
var passportJWT = require("passport-jwt");
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

var jwt_options = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : 'pharol'
}

passport.use(new JwtStrategy(jwt_options, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));
