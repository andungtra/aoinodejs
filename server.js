/**
 * Created by Duy.AnhNguyen on 2/4/2016.
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt    = require('jsonwebtoken');

mongoose.connect('mongodb://root:123456@ds051635.mongolab.com:51635/duynaecommerce', function(err) {
    console.log('Connected to database');
});

var app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.disable('x-powered-by');
app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));

//routes
var userRouter = require('./routes/user');
var sessionRouter = require('./routes/session');
var definitionRouter = require('./routes/definition');
var logRouter = require('./routes/log');

app.use('/api/users', userRouter);
app.use('/api/login', sessionRouter);
app.use('/api/definitions', definitionRouter);
app.use('/api/logs', logRouter);

app.use('/', function(req, res, next) {
    res.send('hello word');
});

app.listen(3000, function (){
   console.log('app is listening on port 3000...');
});