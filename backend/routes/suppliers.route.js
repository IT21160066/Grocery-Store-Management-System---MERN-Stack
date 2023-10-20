const router = require("express").Router();
const generateToken = require("../utils/generateToken");
// const { default: User } = require("../../frontend/src/User");
const  Supplier = require("../models/Supplier");
const express = require('express')
// const {validate} = require("../models/Supplier")
const Cloudinary = require('../utils/Cloudinary')

router.route("/add").post(async(req,res) =>{

    try{
        const supplier_type= req.body.supplier_type;
    const manufacturing = req.body.manufacturing;
    const product_type = req.body.product_type;
    const product_attribute= req.body.product_attribute;
    const company_name = req.body.company_name;
    const company_address  = req.body.company_address;
    const personal_name= req.body.personal_name;
    const personal_address = req.body.personal_address;
    const email = req.body.email;
    const contact_number= req.body.contact_number;
    const password = req.body.password;
    const re_password  = req.body.re_password;
    const _id = req.body._id;
    const supplierPic = req.body.supplierPic;
   

    const result = await Cloudinary.uploader.upload(supplierPic,{
        folder:'supllierProfilePics'
    })
        
    const newSupplier = new Supplier({
        supplier_type,
        manufacturing,
        product_type,
        product_attribute,
        company_name,
        company_address,
        personal_name,
        personal_address,
        email,
        contact_number,
        password,
        re_password,
        _id,
        supplierPic:{
            public_id:result.public_id,
            url:result.secure_url
        }
   
    })

    console.log(newSupplier)

    const supplierExists = await Supplier.findOne({email});
    

    if(supplierExists){
        res.status(400).json({message:"already exists"})
        // throw new Error('User Already Exists');
    }
    newSupplier.save().then(() =>{
        res.json("supplier Added");
    }).catch((err) =>{
        console.log(err)
    })//javaScript promise 

    }catch(error){
        
    }
    
      
})

router.route("/login").post(async(req,res)=>{
    try{
        const email1 = req.body.email;
        const password = req.body.password
         
        // console.log(email1)
    
        const supplier = await Supplier.findOne({email:email1})

        // console.log(supplier)
        

        if(supplier!=null){
            res.status(200).json({supplier:supplier, status:200})
        }else{
            res.status(404).json({message:error.message, status:404})
        }

    }catch(error){
        res.status(400).json({message:error.message, status:400})
    }
    
    
    // if(!supplier){

    //     return res.json({status:404,data:"User Invalid"});  
    // }else{
    //     if (email == supplier.email){
    //         return res.json({status:200 , data:supplier });
    //         // if (res.status(200)) {
    //         //     return res.json({status: "ok", data: customer });
    //         // }else {
    //         //     return res.json({error: "error"});
    //         // }     
    //     }else{
    //         return res.json({status:404 , data: "password invalid"});
    //     }
    // }
    // try{
    // //     const {email,password}=req.body;
        
    //     const newSupplier = await supplier.findOne({email:email,password:password})
    //     res.status(200).json({data:newSupplier,message:'property created successfully '});
    // }catch(error){
    //     res.status(200).json({message:error.message})
    // }
})



router.route("/log").post(async(req,res) =>{

    const {
        supplier_type,
        manufacturing,
        product_type,
        product_attribute,
        company_name,
        company_address,
        personal_name,
        personal_address,
        email,
        contact_number,
        password,
        re_password,
        _id,
     

    } = req.body;

     const newSupplier = await Supplier.findOne({email});

    if(newSupplier && (await newSupplier.matchPassword(password))){
                 res.json({
                 supplier_type:newSupplier.supplier_type,
                 manufacturing:newSupplier.manufacturing,
                 product_type:newSupplier.product_type,
                 product_attribute:newSupplier.product_attribute,
                 company_name:newSupplier.company_name,
                 company_address:newSupplier.company_address,
                 personal_name:newSupplier.personal_name,
                 personal_address:newSupplier.personal_address,
                 email:newSupplier.email,
                 contact_number:newSupplier.contact_number,
                 password:newSupplier.password,
                 re_password:newSupplier.re_password,
                 _id:newSupplier._id
                //  token:generateToken(newSupplier._id),
               
                 });
             }else{
                 res.status(400);
                 throw new Error("Invalid Email or Password!");
             } 
})

router.route("/").get((req,res) => {
    
    Supplier.find().then((supplier)=>{
        res.json(supplier);
    }).catch((err)=>{
        console.log(err);
    })
})
router.route("/update/:id").put(async(req,res) => {
    let supplierID = req.params.id;// id eka wenkara gannawa url eken parameter eka ara ganna 
    
    const {company_name,company_address,email,contact_number,personal_name, personal_address} = req.body;

    const updateSupplier = ({
        company_name,
        company_address,
        email,
        contact_number,
        personal_name,
        personal_address

    })

    // console.log(updateSupplier)

    const Update = await Supplier.findByIdAndUpdate(supplierID,updateSupplier).then(()=>{
        res.status(200).send({status:"Item update"})//json object
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data", error: err.message})//500 -> server error
    })
}) 

router.route("/delete/:id").delete(async(req,res) => {
    let id = req.params.id;
    //console.log("i'm in delete"+id)
    await Supplier.findByIdAndDelete(id).then(()=>{
       res.status(200).send({status:"Item deleted"});
    }).catch((err)=>{
        console.log(err)
        res.status(500).send({status:"Error with delete item",error:err.message});
    })
})

router.route("/get/:id").get(async (req,res)=>{
    const supplierID = req.params.id;
   console.log(supplierID);

   await Supplier.findById(supplierID)
   .then((suppliers)=>{
    res.json(suppliers);
   })
   .catch(()=>{
    res.status(500).send()
   })
})

module.exports = router;

