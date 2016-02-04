/**
 * Created by Duy.AnhNguyen on 2/4/2016.
 */
var jwt    = require('jsonwebtoken');
var User = require('../models/user');
var constants = require('../config/constants');

module.exports = function(req, res, next){
    var sessionToken = req.headers.authorization;
  if(!req.body.user && sessionToken) {
      console.log(sessionToken);
    jwt.verify(sessionToken, constants.JWT_SECRET, function(err, decoded) {
        console.log(decoded);
        if(err) {
            return res.send(401, 'not authorized');
        }

       if(decoded) {
           User.findOne({ _id: decoded.id }, function(err, user) {
              console.log(user);
              req['user'] = user;
               next();
           });
       } else {
           res.send(401, 'not authorized');
       }
    });
  }  else {
      next();
  }
};
