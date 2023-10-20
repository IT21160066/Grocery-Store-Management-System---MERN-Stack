const express = require('express')
const router = express.Router();
const Cloudinary = require('../utils/Cloudinary')

const SupplierItem = require("../models/SupplierItem");
const Item = require('../models/Item');




router.route("/add").post(async(req,res)=>{
    const Itemname=req.body.Itemname
    const supplierItemPic=req.body.supplierItemPic
    const Price_of_one_pieces=req.body.Price_of_one_pieces
    const stock=req.body.stock
    const supplierID = req.body.supplierID;
    // const supplierItemPic = req.body.supplierItemPic

    const result = await Cloudinary.uploader.upload(supplierItemPic,{
        folder:'supplierItemPic'
    })


    const newSupplierItem = new SupplierItem({
        Itemname,
        Price_of_one_pieces,
        stock,
        supplierID,
        supplierItemPic:{
           public_id:result.public_id,
           url:result.secure_url
        }

    })

    newSupplierItem.save().then(()=>{
        res.json("Item Added");
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res) => {
    
    SupplierItem.find().then((supplierItem)=>{
        res.json(supplierItem);
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/update/:id").put(async(req,res) => {
    
    try{
        let SupplierItemid = req.params.id;// id eka wenkara gannawa url eken parameter eka ara ganna 
    
        const {Itemname, Price_of_one_pieces,stock,supplierItemPic} = req.body;
        console.log("im in cloud")
        const result = await Cloudinary.uploader.upload(supplierItemPic.url,{
            folder:'supplierItemPic'
        })
        
        console.log("after cloud")
        console.log(result.secure_url)
        const updateItem = new SupplierItem({
            Itemname,
            Price_of_one_pieces,
            stock,
            supplierItemPic:{
                public_id: result.public_id,
                url:result.secure_url
            },
        })
        
        const updateItm = await SupplierItem
        .findByIdAndUpdate(
            SupplierItemid,
            {
                Itemname,
                Price_of_one_pieces,
                stock,
                supplierItemPic:{
                    public_id:result.public_id,
                    url:result.secure_url
                }
            })
        .then(()=>{
            res.status(200).send({status:"Item update"})//json object
        }).catch((err)=>{
            console.log(err);
            res.status(500).send({status:"Error with updating data", error: err.message})//500 -> server error
        })

    }catch(err){
        console.log(err);
    }
    
}) 

router.route("/delete/:id").delete(async(req,res) => {
    let id = req.params.id;
    //console.log("i'm in delete"+id)
    await SupplierItem.findByIdAndDelete(id).then(()=>{
       res.status(200).send({status:"Item deleted"});
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status:"Error with delete item",error:err.message});
    })
})

router.route("/get/:id").get(async(req,res)=>{

    let supplierID = req.params.id;

    // console.log(supplierID+"   id from font end")
    // const item = await SupplierItem.findById(supplierID)

    // console.log(item)
    // res.json(item)
    await SupplierItem.findById(supplierID).then((order)=>{
        res.json(order);
        // console.log(order)
    }).catch(()=>{
        res.status(500).send()
    })

})
router.route("/getItemsForSupplier/:id").get(async(req,res)=>{

    let supplierid = req.params.id;

    console.log(supplierid+" in model")

    // console.log(supplierID+"   id from font end")
    // const item = await SupplierItem.findById(supplierID)

    // console.log(item)
    // res.json(item)
    await SupplierItem.find({supplierID:supplierid}) .then((order)=>{
        res.json(order);
        console.log(order)
    }).catch(()=>{
        res.status(500).send()
    })

})
module.exports = router;

