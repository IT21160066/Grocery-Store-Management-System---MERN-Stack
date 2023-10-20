const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const NoticeSchema = new Schema({


    name:{
        type: String,
        required:true
    },

    image:{
        type:String,
        //required:true
    },
    date:{
        type:String,
        required:true
    }
     
})

const Notice = mongoose.model("Notice",NoticeSchema);

module.exports = Notice;