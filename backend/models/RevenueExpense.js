const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const revenueExpenseSchema = new Schema({

    name : {
        type : String,
        required: true
    },
    date : {
        type : String,
        required: true
    },
    reType : {
        type : String,
        retuired: true
    },
    value : {
        type: Number,
        required: true
    }
})

const RevenueExpense = mongoose.model("RevenueExpense", revenueExpenseSchema);

module.exports = RevenueExpense;