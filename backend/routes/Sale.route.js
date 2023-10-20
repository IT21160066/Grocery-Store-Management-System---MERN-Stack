const router = require("express").Router();
const Item = require("../models/Item");
const Sale = require("../models/Sale");

router.route("/add").post( async(req,res) =>{

    const itemname= req.body.itemname;
    const supplierId = req.body.supplierId;
    const saleDate = req.body.saleDate;
    const description = req.body.description;
    const quantity  = req.body.quantity;
    const amount  = req.body.amount;
    
    

    // const item = Item.findOne({itemName:itemname})
    const item = await Item.findOne({itemName:itemname})

    console.log(item._id)
    const newSale = new Sale({
        itemId:item._id,
        itemname,
        supplierId,
        saleDate,
        description,
        quantity,
        amount
    })

    newSale.save().then(() =>{
        res.json("Item Added");
    }).catch((err) =>{
        console.log(err);
    })//javaScript promise   
})

router.route("/").get((req,res) => {
    
    Sale.find().then((sale)=>{
        res.json(sale);
    }).catch((err)=>{
        console.log(err);
    })
})
router.route("/update/:id").put(async(req,res) => {
    let saleID = req.params.id;// id eka wenkara gannawa url eken parameter eka ara ganna 
    
    const {itemId,supplierId,saleDate,description,quantity,amount} = req.body;

    const updateItem = new Sale({
        itemId,
        supplierId,
        saleDate,
        description,
        quantity,
        amount
    })

    const updateItm = await Item.findByIdAndUpdate(itemId,{itemId,supplierId,saleDate,description,quantity,amount}).then(()=>{
        res.status(200).send({status:"Sale update"})//json object
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data", error: err.message})//500 -> server error
    })
}) 

router.route("/delete/:id").delete(async(req,res) => {
    let id = req.params.id;
    //console.log("i'm in delete"+id)
    await Sale.findByIdAndDelete(id).then(()=>{
       res.status(200).send({status:"Sale deleted"});
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status:"Error with delete Sale",error:err.message});
    })
})

router.route("/get/:id").get(async (req,res)=>{
    const saleID = req.params.id;
   console.log(saleID);

   await Sale.findById(saleID)
   .then((singleSale)=>{
    res.json(singleSale);
   })
   .catch(()=>{
    res.status(500).send()
   })
})


module.exports = router;

