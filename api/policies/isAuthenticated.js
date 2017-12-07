module.exports = function(req, res, next) {
   if (req.isAuthenticated()) {
        return next();
    }
    else{
        return res.json({"error": "no tiene autorizacion"});
    }
};
