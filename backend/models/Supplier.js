const mongoose = require('mongoose');
// const bcrypt = require('../utils/generateToken')



// const supplier = require('supplier')



const Schema = mongoose.Schema;

const supplierSchema = new Schema({
    supplier_type: {type :String},
    manufacturing : {type : String},
    product_type : {type : String},
    product_attribute : {type : String},
    company_name : {type : String},
    company_address: {type : String},
    personal_name: {type : String,require : true},
    personal_address : {type :String,require : true},
    email : {type : String,required:true,unique:true},
    contact_number: {type : Number,require : true},
    password : {type : String,require : true},
    re_password : {type : String},
    supplierPic:{
        public_id:{
            type:String,
            // required:true
        },
        url:{
            type:String,
            // required:true
        }
    }
})




const supplier = mongoose.model("Supplier",supplierSchema);

module.exports = supplier; 