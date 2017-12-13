/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getUser: function (req, res){
    return res.send({
        msg: 'estas en getUser',
    });
  }

};
