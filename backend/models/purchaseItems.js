const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchaseItemSchema = new Schema({
    
    Itemname:{type : String},
    total_amount:{type : Number},
    personal_name:{type : String},
    supplierID:{type : mongoose.Schema.Types.ObjectId, ref: 'Supplier'},
    quantity:{type: Number},
    Date:{type:String},
    Price_of_one_pieces:{type:Number},
    scale_category:{typle:String}
})

const SupplierItem = mongoose.model("purchaseItems", purchaseItemSchema)

module.exports = SupplierItem;