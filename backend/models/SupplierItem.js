const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierItemSchema = new Schema({
    
    Itemname:{type : String},
    Price_of_one_pieces:{type : Number},
    stock:{type : Number},
    supplierItemPic:{
            public_id:{
                type:String
            },
            url:{
                type:String
            }
    },
    supplierID:{
        type:mongoose.Schema.Types.ObjectId, ref: 'Supplier'
    }
})

const SupplierItem = mongoose.model("SupplierItem",supplierItemSchema)

module.exports = SupplierItem;