
var jwt = require('jwt-simple');
var opts = {}
opts.secretOrKey = 'secret';
module.exports = function(req, res, next) {
  /*
   if (req.isAuthenticated()) {
        return next();
    }
    else{
        return res.json({"msg": "Unhautorized"});
    }
  */


  if(!req.headers.authorization) {
    return res
      .status(403)
      .send({message: "Tu petición no tiene cabecera de autorización"});
  }

  var token = req.headers.authorization.split(" ")[1];
  console.log(token);
  var payload = jwt.decode(token, opts.secretOrKey);
  console.log(payload.sub);
  req.user = payload.sub;
  next();
};
