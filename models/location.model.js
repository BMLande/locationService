
// IMPORT DEPENDENCIES
const mongoose = require('mongoose');
const Schema = mongoose.Schema


var locationSchema = new Schema({
    loc: {
        name: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        styleUrl : {
            type: String,
            require: true
        },
        type: { type: String },
        coordinates: []
    }
});

// add index
locationSchema.index({ "loc": "2dsphere" });

// create model
const Polygon = mongoose.model('outlet_locations', locationSchema);

//export model
module.exports = Polygon;