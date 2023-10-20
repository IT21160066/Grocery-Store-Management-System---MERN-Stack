const router = require("express").Router();
let Order = require("../models/Order");
const Employee = require ("../models/Employee");

router.route("/add").post(async(req,res)=>{

    const name = req.body.name;
    const phone = req.body.phone;
    const location = req.body.location;
    const amount = req.body.amount;
    const date = req.body.date;
    const storeName = req.body.storeID;
    const deliveryPersonName = req.body.deliveryPersonName;

    const newOrder = new Order({
        
        name,
        phone,
        location,
        amount,
        date,
        storeName,
        deliveryPersonName,
    })

    //then means if success
    newOrder.save().then(()=>{

        res.json("Order added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{

    Order.find().then((Orders)=>{
        res.json(Orders)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/update/:id").put(async (req,res)=>{

    try{
        let orId = req.params.id;
        const{name,phone,location,amount,date,storeName,deliveryPersonName} = req.body;

        

        // const employee = await Employee.findOne({deliveryPersonName:'Prasanna Weerasinghe'})

        
        const updateOrder = {
        
            name,
            phone,
            location,
            amount,
            date,
            storeName,
            deliveryPersonName,
            // deliveryPersonId:employee._id
        }

        console.log(updateOrder + 'in update router')

        const update = Order.findByIdAndUpdate(orId, updateOrder).then(()=>{

        res.status(200).send({status: "Order updated"})
        
        }).catch((err)=>{

            console.log(err);
            res.status(500).send({status: "error with updating Order", error: err.message});
        })

    }catch(error){
        res.json({message:error})
    }
    
   
})

router.route("/delete/:id").delete(async (req,res)=>{

    let orId = req.params.id;
    await Order.findByIdAndDelete(orId).then(()=>{

        res.status(200).send({status: "Order deleted"});
    }).catch((err)=>{

        console.log(err.message);
        res.status(500).send({status: "error with delete Order", error: err.message})
    })
})

router.route("/get/:id").get(async(req,res)=>{

    let orId = req.params.id;
    await Order.findById(orId) .then((order)=>{
        res.json(order);
    }).catch(()=>{
        res.status(500).send()
    })
})

module.exports = router; 

