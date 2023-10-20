const router = require ("express").Router();
let Employee = require ("../models/Employee");

//create
router.route("/add").post((req,res)=>{
    
    const image= req.body.image;
    const name= req.body.name;
    const nic = req.body.nic;
    const phoneNo = Number(req.body.phoneNo);
    const addressNo = req.body.addressNo;
    const street = req.body.street;
    const city = req.body.city;
    const postalCode = Number(req.body.postalCode);
    const email = req.body.email;
    const deliveryType = req.body.deliveryType;
    const vehicleType = req.body.vehicleType;
    const vRegNo= req.body.vRegNo;
    const deliveryArea= req.body.deliveryArea;
    const licenseCopy=req.body.licenseCopy;
    const userName= req.body.userName;
    const password= req.body.password;

    const newEmployee =  new Employee({

        image,
        name,
        nic,
        phoneNo,
        addressNo,
        street,
        city,
        postalCode, 
        email,
        deliveryType,
        vehicleType,
        vRegNo,
        deliveryArea,
        licenseCopy,
        userName,
        password,
    })

    newEmployee.save().then(()=>{
        res.json("Employee Added")
    }).catch((err)=>{
        console.log(err);
    })

})

//display
router.route ("/").get((req,res)=>{

    Employee.find().then((Employees)=>{
        res.json(Employees)
    }).catch ((err)=>{
        console.log(err)
    })

})


//update
router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const {image,name,nic,
        phoneNo,
        address,
        postalCode, 
        email,
        deliveryType,
        vehicleType,
        vRegNo,
        deliveryArea,
        license,
        userName,
        password,
        passwordRe} = req.body;

    const updateEmployee = {
        
        image,
        name,
        nic,
        phoneNo,
        address,
        postalCode, 
        email,
        deliveryType,
        vehicleType,
        vRegNo,
        deliveryArea,
        license,
        userName,
        password,
        passwordRe
    }

    const update = await Employee.findByIdAndUpdate(userId,updateEmployee).then(()=>{
        res.status(200).send({status: "user updated"})
    }).catch ((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data"});
    })
}) 

//delete
router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    
    await Employee.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "user deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user",error:err.message});
    })
})
//display details of one user
router.route("/get/:id").get(async(req,res)=>{
    let userId= req.params.id;
    const user = await Employee.findById(userId).then((employee)=>{
        res.status(200).send({status: "user fetched",employee})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user",error:err.message});
    })
})

router.route("/login").post( async(req,res)=>{
    try{
        const {userName,password} = req.body;

        console.log(userName)

        const driver = await Employee.findOne({userName:userName,password:password})
      
        if(driver != null){
            res.status(200).json({ data: driver,status:200});
        }else{
            res.status(200).json({status:404});
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
    
})


module.exports= router;