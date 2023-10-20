const mongoose = require('mongoose');
const Item = require("../models/Item");

const Schema = mongoose.Schema;

const SaleSchema = new Schema({
    itemId : {type : mongoose.Schema.Types.ObjectId, ref: 'Item'},
    itemname:{type : String, required : true},
    supplierId : {type : String, required : true},
    saleDate : {type : String, required : true},
    description : {type : String },
    quantity : {type : String , required : true},
    amount : {type : Number, required : true},
})

const Sale = mongoose.model("Sale",SaleSchema)//para 1 table name, whch schema

module.exports = Sale; 