/**
 * Created by Duy.AnhNguyen on 2/4/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = new Schema({
    description: String,
    result: String,
    date: { type: Date, default: Date.now },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    definition: { type: Schema.Types.ObjectId, ref: 'Definition' }
});

module.exports = mongoose.model('Log', LogSchema);