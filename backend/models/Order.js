const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Employee = require ("../models/Employee");

const orderSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    date: {
        type: String,
        required: true
    },

    storeName: {
        type: String
    },

    deliveryPersonName: {
        type : String
    },
    // deliveryPersonId:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:"Employee"
    // }
})

const Order = mongoose.model("Order",orderSchema);
module.exports = Order;