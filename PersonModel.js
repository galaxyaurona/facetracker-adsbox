var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;
var PersonModel = new Schema({ 
    personID: Number, 
    startTime: Date,
    endTime: Date,
    smileProb: SchemaTypes.Double,
})
// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Person', PersonModel);