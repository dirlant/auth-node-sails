
var jwt = require('jwt-simple');
var ExtractJwt = require("passport-jwt").ExtractJwt;

var jwt_options = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : 'pharol'
}

module.exports = function(req, res, next) {

  if(!req.headers.authorization) {
    return res
      .status(403)
      .send({msg: "no authorized!"});
  }

  var token = req.headers.authorization.split(" ")[1];
  var payload = jwt.decode(token, jwt_options.secretOrKey);

  next();

};
