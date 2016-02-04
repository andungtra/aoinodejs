/**
 * Created by Duy.AnhNguyen on 2/4/2016.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    passhash: { type: String, required: true },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
