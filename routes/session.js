/**
 * Created by Duy.AnhNguyen on 2/4/2016.
 */
var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var constants = require('../config/constants');
var User = require('../models/user');

router.post('/', function(req, res) {
   User.findOne({ username: req.body.user.username }, function(err, user) {
       if(err) {
           return res.json(err);
       }

       if(user) {
           bcrypt.compare(req.body.user.pwd, user.passhash, function(err, matches) {
                if(matches) {
                    var sessionToken = jwt.sign({ id: user._id }, constants.JWT_SECRET, { expiresIn: 86400 } );
                    res.json({
                       user: user,
                        message: 'successfully authed',
                        sessionToken: sessionToken
                    });
                } else {
                    res.json({
                       user: {},
                        message: 'failed to auth',
                        sessionToken: ''
                    });
                }
           });
       } else {
           res.json({
               user: {},
               message: 'failed to auth',
               sessionToken: ''
           });
       }
   }) ;
});

module.exports = router;
