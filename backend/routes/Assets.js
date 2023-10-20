const router = require("express").Router();
let Asset = require("../models/Asset");

//create Asset
//http://localhost:8070/Asset/add
router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const description = req.body.description;
    const value = Number(req.body.value);
    const dateOfPurchase = req.body.dateOfPurchase;

    const newAsset = new Asset({
        name,
        description,
        value,
        dateOfPurchase
    })

    newAsset.save().then(()=>{
        res.json("Asset Added")
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with add user", error: err.message})
    })

})

//fetching data (all Assets)
//http://localhost:8070/Asset/
router.route("/").get((req,res)=>{
    Asset.find().then((Assets)=>{
        res.json(Assets)
    }).catch((err)=>{
        console.log(err)
    })
})

//http://localhost:8070/Asset/update/63f521389c4efb9c15c823f0
//update asset
router.route("/update/:id").put(async(req,res)=>{
    let assetId = req.params.id;//same name used in /update/:xx
    const{name, description, value, dateOfPurchase} = req.body;//destructure

    const updateAsset = {
        name,
        description,
        value,
        dateOfPurchase
    }

    //http://localhost:8070/Asset/delete/63f521389c4efb9c15c823f0
    //updates asset details with updateAsset object's values where id = userId
    const update = await Asset.findByIdAndUpdate(assetId, updateAsset).then(()=>{
        res.status(200).send({status: "Asset Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error in updating data", error: err.message})
    })
})

//delete Asset
router.route("/delete/:id").delete(async(req,res)=>{
    let assetId = req.params.id;

    await Asset.findByIdAndDelete(assetId).then(()=>{
        res.status(200).send({status: "Asset Deleted"})
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).send({status: "Error in Deleting Asset", error: err.message})
    })
})

//fetch data of a single asset
router.route("/get/:id").get(async(req,res)=>{
    let assetId = req.params.id;
    await Asset.findById(assetId).then((ob)=>{
        res.json(ob);
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get asset", error: err.message})
    })
})

module.exports = router;