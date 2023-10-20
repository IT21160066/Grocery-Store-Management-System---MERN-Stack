const router = require("express").Router();

let notice= require("../models/Notice");

router.route("/add").post((req,res)=>{
     
    const name =req.body.name;
    const image = req.body.image;
    const date = req.body.date;

    const newNotice = new notice({
        name,
        image,
        date
    })

    newNotice.save().then(()=>{
        res.json("Notice added")
    }).catch((err)=>{
        console.log(err);
    })

})

router.route("/").get((req,res)=>{
       
    notice.find().then((notice)=>{
         res.json(notice)
    }).catch((err)=>{
        console.log(err)
    })
})


router.route("/update/:id").put(async(req,res) =>{
    let noticeId = req.params.id;
    const name =req.body.name;
    const image = req.body.image;
    const date = req.body.date;
    
  // console.log(reply)

    const updatenotice = {
       name,
       image,
       date
    }

    const update = await notice.findByIdAndUpdate(noticeId, updatenotice).then(()=>{
        res.status(200).send({status :"Notice Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status :"error with updating data", error:err.message});
    })

    
})
router.route("/delete/:id").delete(async(req,res)=>{
    let noticeId = req.params.id;

    await notice.findByIdAndDelete(noticeId).then(()=>{
        res.status(200).send({status :"Notice deleted"});
}).catch((err)=>{
    console.log(err.message);
    res.status(500).send({status:"error with delete feedback",error:err.message});
  })

})

router.route("/get/:id").get(async(req,res)=>{
    let noticeId=req.params.id;
    const not=await notice.findById(noticeId).then((notice)=>{
        res.status(200).send({status :"Notice fetched",notice})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get feedback",error:err.message});
    })
})
module.exports = router;