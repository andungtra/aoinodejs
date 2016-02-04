/**
 * Created by Duy.AnhNguyen on 2/4/2016.
 */
var router = require('express').Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var constants = require('../config/constants');

router.post('/', function(req, res, next) {
    //user = { username: 'foo', email: 'blah }
    var user = new User({
        username: req.body.user.username,
        email: req.body.user.email,
        passhash: bcrypt.hashSync(req.body.user.pwd, 10)
    });

    user.save(function(err, newuser){
        if(err) next(err);

        console.log(newuser._id);

        var sessionToken = jwt.sign( { id: newuser._id }, constants.JWT_SECRET, { expiresIn: 86400 });
        res.json({
            user: newuser,
            message: 'success',
            sessionToken: sessionToken
        });
    });
});

module.exports = router;
