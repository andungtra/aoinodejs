/**
 * Created by Duy.AnhNguyen on 2/4/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DefinitionSchema = new Schema({
    logType: String,
    description: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Definition', DefinitionSchema);
