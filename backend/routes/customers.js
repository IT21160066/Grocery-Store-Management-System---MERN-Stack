const router = require("express").Router();
let Customer = require("../models/Customer");

const jwt=require =("jsnwebtoken");
const JWT_SECRET= "ttuohthglnlg3u5nnlnalerjrlblpirfsmmffmsgprjpz;"

router.route("/add").post((req,res)=>{//insert
    
    const name = req.body.name;
    const userName = req.body.userName;
    const email = req.body.email;
    const address = req.body.address;
    const phoneNo = Number(req.body.phoneNo);
    const password = req.body.password;
    const conPassword = req.body.conPassword;

    const newCustomer = new Customer({
        name,
        userName,
        email,
        address,
        phoneNo,
        password,
        conPassword
    })

    newCustomer.save().then(()=>{
        res.json("Customer Added");
    }).catch((err)=>{
        console.log(err);
    })
})



router.route("/").get((req,res)=>{//retrive

    Customer.find().then((customers)=>{
        res.json(customers);
    }).catch((err)=>{
        console.log(err);
    })
})



router.route("/update/:id").put(async (req,res)=>{//update
    let userId = req.params.id;
    const {name, userName, email, address, phoneNo, password, conPassword} = req.body;//destructure

    console.log(name)
    const updateCustomer = {
        name,
        userName,
        email,
        address,
        phoneNo,
        password,
        conPassword
    }

    const update = await Customer.findByIdAndUpdate(userId, updateCustomer).then(()=>{
        res.status(200).send({status: "Updated Successfully!"});
    }).catch((err) =>{
        console.log(err);
        res.status(500).send({status: "Erro with updating data", error: err.message});
    })
})



router.route("/delete/:id").delete(async (req,res) => {//delete
    let userId = req.params.id;
    
    await Customer.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "User Deleted"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message});
    })
})

router.route("/getCustomer/:id").get(async (req,res)=>{
    const userId = req.params.id;
   console.log(userId);

   await Customer.findById(userId)
   .then((singleCustomer)=>{
    res.json(singleCustomer);
   })
   .catch(()=>{
    res.status(500).send()
   })
})



router.route("/login").post( async (req,res)=>{//insert
    
    const userName = req.body.userName;
    const password = req.body.password;

    // console.log(userName+" "+password)
    // const newLogin = new Login({
    //     name,
    //     password,
    // })

    // newLogin.save().then(()=>{
    //     res.json("Login succcessful");
    // }).catch((err)=>{
    //     console.log(err);
    // })

    const customer = await Customer.findOne({userName});

    if(!customer){
        // return req.json("Customer not found");
        return res.json({status: 404, data: "Username invalid" });
    }else{
        if (password == customer.password){
            return res.json({status:200 , data: customer });
            // if (res.status(200)) {
            //     return res.json({status: "ok", data: customer });
            // }else {
            //     return res.json({error: "error"});
            // }
            
        }else{
            return res.json({status:404 , data: "password invalid"});
        }
    }

    
         
    
})

module.exports = router;