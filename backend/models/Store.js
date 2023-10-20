const mongoose = require ('mongoose');

const Schema= mongoose.Schema;

const storeSchema = new Schema({
    image: {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    nic : {
        type : Number,
        required : true
    },
    phoneNo: {
        type : Number,
        required : true
    },
    addressNo: {
        type : Number,
        required : true
    },
    street: {
        type : String,
        required : true
    },
    city: {
        type : String,
        required : true
    },
    postalCode: {
        type : Number,
        required : true
    },
    email: {
        type : String,
        required : true
    },
    userName: {
        type : String,
        required : true
    },
    password: {
        type : String,
        required : true
    },
    // allRequests : [{type: mongoose.Schema.Types.ObjectId, ref: 'StoreRequest'}],
})

const Store = mongoose.model("Store",storeSchema);

module.exports = Store;