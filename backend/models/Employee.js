const mongoose = require ('mongoose');

const Schema= mongoose.Schema;

const employeeSchema = new Schema({
    image: {
        type : String,
        // required : true
      
    },
    name : {
        type : String,
        required : true
    },
    nic : {
        type : String,
        required : true
    },
    phoneNo: {
        type : Number,
        required : true
    },
    addressNo: {
        type : String,
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
    deliveryType: {
        type : String,
        required : true
    },
    vehicleType: {
        type : String,
        required : true
    },
    vRegNo: {
        type : String,
        required : true
    },
    deliveryArea: {
        type : String,
        required : true
    },
    licenseCopy: {
        type : String,
        // required : true
    },
    userName: {
        type : String,
        required : true
    },
    password: {
        type : String,
        required : true
    },
})

const Employee = mongoose.model("Employee",employeeSchema);

module.exports = Employee;