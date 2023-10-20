const router = require("express").Router();
const Item = require("../models/Item");
const Cloudinary = require('../utils/Cloudinary')

router.route("/add").post(async (req,res) =>{

    try{
        const itemName = req.body.itemName;
        const price = Number(req.body.price);
        const category = req.body.category;
        const description = req.body.description;
        const image  = req.body.image;
        const totalQuantity  = Number(req.body.totalQuantity);

        // console.log("image")
        // console.log(image)

        const result = await Cloudinary.uploader.upload(image,{
            folder:'items',
        })

        const newItem = new Item({
            itemName,
            price,
            category,
            description,
            image:{
                public_id: result.public_id,
                url:result.secure_url
            },
            totalQuantity
        })
        // console.log(newItem)

        await newItem.save().then(() =>{
            res.json("Item Added");
        }).catch((err) =>{
            
        })//javaScript promise

    }catch(err){
        console.log(err);
    }

       
})

router.route("/").get((req,res) => {
    
    Item.find().then((item)=>{
        res.json(item);
    }).catch((err)=>{
        console.log(err);
    })
})
router.route("/update/:id").put(async(req,res) => {
    try{

        let itemID = req.params.id;// id eka wenkara gannawa url eken parameter eka ara ganna 
        
        const {itemName,price,category,description,image,totalQuantity} = req.body;

        // console.log('update image')
        // console.log(image)
        const result = await Cloudinary.uploader.upload(image.url,{
            folder:'items',
        })

        
        const updateItem = new Item({
            itemName,
            price,
            category,
            description,
            image:{
                public_id: result.public_id,
                url:result.secure_url
            },
            totalQuantity
        })

        const updateItm = await Item.findByIdAndUpdate(itemID,{itemName,price,category,description,image:{public_id: result.public_id,
            url:result.secure_url},totalQuantity})
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
    await Item.findByIdAndDelete(id).then(()=>{
       res.status(200).send({status:"Item deleted"});
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status:"Error with delete item",error:err.message});
    })
})

router.route("/get/:id").get(async (req,res)=>{
    const itemID = req.params.id;
   console.log(itemID);

   await Item.findById(itemID)
   .then((singleItem)=>{
    res.json(singleItem);
   })
   .catch(()=>{
    res.status(500).send()
   })
})

module.exports = router;

