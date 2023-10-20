const pdfTemplate = require('../models/StockReport.model')
const pdf = require('html-pdf')
const router = require("express").Router();


router.route("/create-pdf").post((req,res)=>{
    const items= req.body;
    console.log(items)
    pdf.create(pdfTemplate(items),{}).toFile(`${__dirname}/stockReport.pdf`,(err)=>{
        if(err){
            // res.send(Promise.reject());
            console.log(err)
            
        }
        console.log('im in create pdf')
            res.send('PDF generated');
    })
})


router.route("/fetch-pdf").get((req,res)=>{
    console.log('fetch pdf')
    res.sendFile(`${__dirname}/stockReport.pdf`)
    // res.sendFile('F:/Project/y2_s2_wd_it_01-itp_wd_b04_07/backend/result.pdf')
})

module.exports = router;
