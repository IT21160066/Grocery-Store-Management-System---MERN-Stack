const router = require ("express").Router();
let Store = require ("../models/Store");

//create
router.route("/add").post((req,res)=>{
    
    const image= req.body.image;
    const name= req.body.name;
    const nic = Number(req.body.nic);
    const phoneNo = Number(req.body.phoneNo);
    const addressNo = Number(req.body.addressNo);
    const street = req.body.street;
    const city = req.body.city;
    const postalCode = Number(req.body.postalCode);
    const email = req.body.email;
    const userName= req.body.userName;
    const password= req.body.password;

    const newStore =  new Store({

        image,
        name,
        nic,
        phoneNo,
        addressNo,
        street,
        city,
        postalCode, 
        email,
        userName,
        password,
    })

    newStore.save().then(()=>{
        res.json("Store Added")
    }).catch((err)=>{
        console.log(err);
    })

})

//display
router.route ("/").get((req,res)=>{

    Store.find().then((stores)=>{
        res.json(stores)
    }).catch ((err)=>{
        console.log(err)
    })

})


//update
router.route("/update/:id").put(async(req,res)=>{
    let storeID = req.params.id;
    const {
        image,
        name,
        nic,
        phoneNo,
        addressNo,
        street,
        city,
        postalCode, 
        email,
        userName,
        password,} = req.body;

    const updateStore = {
        
        image,
        name,
        nic,
        phoneNo,
        addressNo,
        street,
        city,
        postalCode, 
        email,
        userName,
        password,
    }

    const update = await Store.findByIdAndUpdate(storeID,updateStore).then(()=>{
        res.status(200).send({status: "Store details updated"})
    }).catch ((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data"});
    })
}) 

//delete
router.route("/delete/:id").delete(async(req,res)=>{
    let storeID = req.params.id;
    
    await Store.findByIdAndDelete(storeID).then(()=>{
        res.status(200).send({status: "store deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete store",error:err.message});
    })
})
//display details of one user
router.route("/get/:id").get(async(req,res)=>{
    let storeID= req.params.id;

    const store = await Store.findById(storeID).then((store)=>{
        res.status(200).send({status: "user fetched",store})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get store",error:err.message});
    })
})

router.route("/login").post( async(req,res)=>{
    try{
        const {userName,password} = req.body;

        const store = await Store.findOne({userName:userName,password:password})
        
        if(store != null){
            res.status(200).json({ data: store,status:200});
        }else{
            res.status(200).json({status:404});
        }
        
        
    }catch(error){
        
        res.status(500).json({message: error.message});
    }
    
})


module.exports= router;