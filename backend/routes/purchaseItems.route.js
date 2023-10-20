const express = require('express')
const router = express.Router();

const purchaseItems = require("../models/purchaseItems");
const Item = require("../models/Item");


router.route("/add").post( async(req,res)=>{
    const Itemname=req.body.Itemname
    const total_amount=Number(req.body.total_amount)
    const personal_name=req.body.personal_name
    const quantity= Number(req.body.quantity)
    const Date = req.body.Date
    const Price_of_one_pieces = Number(req.body.Price_of_one_pieces)
    const scale_category = req.body.scale_category
    const supplierID = req.body.supplierID

        
    const item = await Item.findOne({itemName:Itemname})

    if(item){
        // console.log(item)
        
        item.totalQuantity = item.totalQuantity + quantity
        await item.save({item});
        // console.log(item.totalQuantity + quantity+"add")
    }

    console.log(Itemname + "AWSDASASFAF")
    const newPurchaseItems = new purchaseItems({
        Itemname,
        total_amount,
        personal_name,
        Price_of_one_pieces,
        scale_category,
        quantity,
        Date,
        supplierID
    })

    newPurchaseItems.save().then(()=>{
        res.json("purchase added");
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res) => {
    
    purchaseItems.find().then((purchaseItems)=>{
        res.json(purchaseItems);
    }).catch((err)=>{
        console.log(err);
    })
}
)

module.exports = router;