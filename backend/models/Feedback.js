const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({

    customerID:{type : mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    customerName:{
        type: String,
        required:true
    },
    category:{
        type: String,
        required:true
    },

    feedback_comment : {
          type : String,
          required: true
    },
    reply :{
         type : String,
        
      },
     date : {
         type : String,
         required : true
     }
})

const Feedback = mongoose.model("Feedback",FeedbackSchema);

module.exports = Feedback;