const pdfTemplate = require('../models/StoreReport')
const pdf = require('html-pdf')
const router = require("express").Router();


router.route("/create-pdf").post((req,res)=>{
    const store = req.body;
    pdf.create(pdfTemplate(store),{}).toFile(`${__dirname}/result.pdf`,(err)=>{
        if(err){
            // res.send(Promise.reject());
            console.log(err)
            
        }
        console.log('im in create pdf')
            res.send('PDF generated');
    })
})
// router.route("/create-pdf").post((req,res)=>{
//     const sales = req.body;
//     // pdf.create(pdfTemplate(sales),{}).toFile()
//     pdf.create(pdfTemplate(sales),{}).toFile(`${__dirname}/result.pdf`,function(err, res){
//         console.log(res.filename);
//       })
// })

router.route("/fetch-pdf").get((req,res)=>{
    console.log('fetch pdf')
    res.sendFile(`${__dirname}/result.pdf`)
    //res.sendFile('F:/Project/y2_s2_wd_it_01-itp_wd_b04_07/backend/result.pdf')
})

module.exports = router;
