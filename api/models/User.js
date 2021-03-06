/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 var bcrypt = require('bcrypt');

 module.exports = {

   attributes: {
     username: {
       type: 'string',
       unique: true
     },
     email: {
         type: 'email'
     },
     password: {
       type: 'string',
     },
     google_id: {
       type: 'string',
     },
     facebook_id: {
       type: 'string',
     },
     toJSON: function() {
       var obj = this.toObject();
       //delete obj.password;
       return obj;
     },
   },
   beforeCreate: function(user, cb) {
     sails.log.verbose('beforeCreate', user)
     bcrypt.hash(user.password, 10, function (err, hash) {
       user.password = hash;
       sails.log.verbose('hashed password', user)
       cb();
     });
   }
 };
