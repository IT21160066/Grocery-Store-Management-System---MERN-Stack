const router = require("express").Router();

let feedback = require("../models/Feedback");

router.route("/add").post((req,res)=>{
     
    const category =req.body.category;
    const feedback_comment = req.body.feedback_comment;
    const reply = req.body.reply;
    const date = req.body.date;
    const customerID = req.body.customerID;
    const customerName = req.body.customerName;
    

    const newFeedback = new feedback({
        customerID,
        customerName,
        category,
        feedback_comment,
        reply,
        date
    })

    newFeedback.save().then(()=>{
        res.json("Feedback added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req,res)=>{
       
    feedback.find().then((feedback)=>{
         res.json(feedback)
    }).catch((err)=>{
        console.log(err)
    })
})


router.route("/update/:id").put(async(req,res) =>{
    let feedbackId = req.params.id;
    const category =req.body.category;
    const feedback_comment = req.body.feedback_comment;
    const reply = req.body.reply;
    const date = req.body.date;

  // console.log(reply)

    const updateFeedback = {
        category,
        feedback_comment,
        reply,
        date
    }

    const update = await feedback.findByIdAndUpdate(feedbackId, updateFeedback).then(()=>{
        res.status(200).send({status :"Feedback Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status :"error with updating data", error:err.message});
    })

    
})
router.route("/delete/:id").delete(async(req,res)=>{
    let feedbackId = req.params.id;

    await feedback.findByIdAndDelete(feedbackId).then(()=>{
        res.status(200).send({status :"Feedback deleted"});
}).catch((err)=>{
    console.log(err.message);
    res.status(500).send({status:"error with delete feedback",error:err.message});
  })

})

router.route("/get/:id").get(async(req,res)=>{
    let feedbackId=req.params.id;
    const fed=await feedback.findById(feedbackId).then((feedback)=>{
        res.status(200).send({status :"Feedback fetched",feedback})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get feedback",error:err.message});
    })
})
module.exports = router;