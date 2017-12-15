/**
 * Passport
 *
 * @description :: Estrategias para dar autorización a la aplicación
 *
 */

var passport = require('passport');
var jwt = require('jwt-simple');
var passportJWT = require('passport-jwt');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var jwt_options = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : 'pharol'
}


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/*
* JWT Strategy
*/

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

/*
* Google Strategy
*/

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: '358329299064-j30ftufmeu5ja8264d84ff92bak01os2.apps.googleusercontent.com',
    clientSecret: 'IOn0pqrwZ5IzMLh1hpRQgZsx',
    callbackURL: "http://localhost:1337/auth/google/callback"
  },(accessToken, refreshToken, profile, cb) => {
    //console.log(profile);
    User.findOrCreate(
      { google_id: profile.id} ,
      {google_id: profile.id, username: profile.displayName }
    ).exec((error, user) => {
      //console.log(user);
      return cb(error, user);
    });
  }
));
