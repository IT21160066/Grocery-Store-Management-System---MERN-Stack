const router = require("express").Router();
let RevenueExpense = require("../models/RevenueExpense");

//create RevenueExpense
//http://localhost:8070/revenueExpense/add
router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const date = req.body.date;
    const reType = req.body.reType;
    const value = Number(req.body.value);

    const newRevenueExpense = new RevenueExpense({
        name,
        date,
        reType,
        value
    })

    newRevenueExpense.save().then(()=>{
        res.json("Revenue / Expense Added")
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with adding revenue / expense", error: err.message})
    })

})

//fetching data (all Revenues and Expenses)
//http://localhost:8070/revenueExpense/
router.route("/").get((req,res)=>{
    RevenueExpense.find().then((RevenueExpenses)=>{
        res.json(RevenueExpenses)
    }).catch((err)=>{
        console.log(err)
    })
})

//http://localhost:8070/revenueExpense/update/63f521389c4efb9c15c823f0
//update revenueExpense
router.route("/update/:id").put(async(req,res)=>{
    let RevenueExpenseId = req.params.id;//same name used in /update/:xx
    const{name, date, reType, value} = req.body;//destructure

    const updateRevenueExpense = {
        name,
        date,
        reType,
        value
    }

    //http://localhost:8070/revenueExpense/delete/63f521389c4efb9c15c823f0
    //updates revenue details with updaterevenueExpense object's values where id = userId
    const update = await RevenueExpense.findByIdAndUpdate(RevenueExpenseId, updateRevenueExpense).then(()=>{
        res.status(200).send({status: "Revenue / Expense Updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error in updating data", error: err.message})
    })
})

//delete Asset
router.route("/delete/:id").delete(async(req,res)=>{
    let RevenueExpenseId = req.params.id;

    await RevenueExpense.findByIdAndDelete(RevenueExpenseId).then(()=>{
        res.status(200).send({status: "Revenue / Expense Deleted"})
    }).catch((err)=>{
        console.log(err.message)
        res.status(500).send({status: "Error in Deleting Revenue / Expense", error: err.message})
    })
})

//fetch data of a single asset
http://localhost:8070/revenueExpense/get/642d350d6f9086a91be97423
router.route("/get/:id").get(async(req,res)=>{
    let RevenueExpenseId = req.params.id;
    await RevenueExpense.findById(RevenueExpenseId).then((ob)=>{
        res.json(ob);
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get Revenue / Expense", error: err.message})
    })
})

module.exports = router;