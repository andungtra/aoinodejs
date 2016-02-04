/**
 * Created by Duy.AnhNguyen on 2/4/2016.
 */
var router = require('express').Router();
var Definition = require('../models/definition');

// get all definitions by user
router.get('/', function(req, res, next) {
    Definition.find({ owner: req.user }, function(err, definitions) {
        res.json(definitions);
    });
});

// create a new definition
router.post('/', function(req, res, next) {
   var def = new Definition({
       owner: req.user,
       logType: req.body.definition.type,
       description: req.body.definition.description
   }) ;

    def.save(function(err, definition) {
       res.json({
           message: 'saved!',
           definition: definition
       }) ;
    });
});

//update an existion definition
router.put('/:id', function(req, res, next) {
   Definition.findOne({ _id: req.params.id }, function(err, definition) {
       definition.logType = req.body.definition.type;
       definition.description = req.body.definition.description;

       definition.save(function(err, definition){
           res.json({
                message: 'updated!',
               definition: definition
           });
       });
   }) ;
});

//delete a definition
router.delete('/:id', function(req, res, next) {
    Definition.findOne({ _id: req.params.id, owner: req.user }, function(err, definition) {
        definition.remove(function(err){
            res.json({
                message: 'delete!',
                definition: definition
            });
        });
    });
});

module.exports = router;