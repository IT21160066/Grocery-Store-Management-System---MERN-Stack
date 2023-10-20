const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const storerequestSchema = new Schema({
    itemName :{
        type:String,
        required: true
    },
    quantity :{
        type : String,
        required: true
    },
    requestDate:{
        type : String,
        required: true
    },
    sRequestOwner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    },
    storeName:{
        type:String,
        
    }
})

const StoreRequest = mongoose.model("StoreRequest",storerequestSchema);
module.exports = StoreRequest;