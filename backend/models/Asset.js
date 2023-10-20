const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const assetsSchema = new Schema({

    name : {
        type : String,
        required: true
    },
    description : {
        type : String,
        required: true
    },
    value : {
        type: Number,
        required: true
    },
    dateOfPurchase : {
        type : String,
        required: true
    }
})

const Asset = mongoose.model("Asset", assetsSchema);

module.exports = Asset;