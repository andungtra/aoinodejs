/**
 * Created by Duy.AnhNguyen on 2/4/2016.
 */
var db = require('mongoose');

db.connect('mongodb://root:123456@ds051635.mongolab.com:51635/duynaecommerce', function(err) {
    console.log('Connected to database');
});

module.exports = db;