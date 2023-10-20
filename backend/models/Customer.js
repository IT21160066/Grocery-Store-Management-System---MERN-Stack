const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    name : {
        type : String,
        required: true
    },
    userName : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    address : {
        type : String,
        required: true
    },
    phoneNo : {
        type : Number,
        required: true
    },
    password : {
        type : String,
        required: true
    },
    conPassword : {
        type : String,
        required: true
    },

})

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;