const router = require("express").Router();
const Storerequest = require("../models/Storerequest");

//insert
router.route("/add").post((req,res)=>{
    //body
    const itemName= req.body.itemName;
    const quantity= Number(req.body.quantity) ;
    const requestDate= req.body.requestDate;
    const sRequestOwner= req.body.ownerID;
    const storeName = req.body.storeName;

    const newStorerequest = new Storerequest({
        itemName,
        quantity,
        requestDate,
        sRequestOwner,
        storeName
    })

    newStorerequest.save().then(()=>{
        res.json("request added")
    }).catch((err)=>{
        console.log(err);
    })
})

//display
router.route("/").get((req,res)=>{
    //body
    Storerequest.find().then((storerequests)=>{
        res.json(storerequests)
    }).catch((err)=>{
        console.log(err);
    })

})

//update

//delete
router.route("/delete/:id").delete(async(req,res) => {
    let reqID = req.params.id;

    await Storerequest.findByIdAndDelete(reqID).then(() => {
        res.status(200).send({status:"request deleted"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error with deleting data", error: err.massage});
    })

})

//display only one student's details
router.route("/get/:id").get(async (req,res)=>{

    let reqID = req.params.id;
    console.log(reqID)
    
    const user = await Storerequest.find({sRequestOwner:reqID}).then((storerequest)=>{
        res.status(200).send({status:"request fetched" , storerequest})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error with fetching request", error: err.massage});
    })

})

module.exports = router;