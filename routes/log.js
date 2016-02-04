/**
 * Created by Duy.AnhNguyen on 2/4/2016.
 */
var router = require('express').Router();
var Log = require('../models/log');

router.get('/', function(req, res, next) {
    Log.find({ owner: req.user }, function(err, logs) {
        res.json(logs);
    });
});


router.post('/', function(req, res, next) {
    var log = new Log({
       description: req.body.log.description,
        result: req.body.log.result,
        date: req.body.log.date,
        owner: req.user,
        definition: req.body.definition
    });

    log.save(function(err) {
       res.json({
           message: 'saved!',
           log: log
       }) ;
    });
});


router.put('/:id', function(req, res, next) {
   Log.findOne({ _id: req.params.id, owner: req.user }, function(err, log) {
       log.result = req.body.log.result;
       log.description = req.body.log.description;
       log.date = req.body.log.date;
       log.definition = req.body.definition;

       log.save(function(err) {
          res.json({
              message: 'updated!',
              log: log
          }) ;
       });
   }) ;
});

router.delete('/:id', function(req, res, next) {
    Log.findOne({ _id: req.params.id, owner: req.user }, function(err, log) {
       log.remove(function(err) {
           res.json({
              message: 'deleted!',
               log: log
           });
       }) ;
    });
});

module.exports = router;
