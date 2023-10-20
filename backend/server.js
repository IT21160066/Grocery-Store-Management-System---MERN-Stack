const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser')
const pdf = require('html-pdf')



require("dotenv").config();


const app = express();
const port = process.env.PORT || 8071;                      //8070 port eka naththam wena danata usable port ekak ganna

app.use(cors());
// app.use(express.json());
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({extended:true, limit:'10mb'}));

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{});

const connection = mongoose.connection;

connection.once("open", () =>{
    console.log("Mongodb Connection Success!");
})

//import all routes
const ItemRouter = require("./routes/Items.route.js");
app.use("/item",ItemRouter);                          //1st parameter req name

const SaleRouter = require('./routes/Sale.route.js');
app.use('/sale',SaleRouter);

const employeeRouter = require('./routes/Employees.js');
app.use('/employee',employeeRouter);

const storeRouter = require('./routes/Store.route.js');
app.use('/store',storeRouter);

const storeRequestRout = require('./routes/storerequests.js');
app.use('/storerequest',storeRequestRout);

const assetRouter = require("./routes/Assets.js");
app.use("/asset", assetRouter);

const revenueExpenseRouter = require("./routes/RevenueExpenses.js");
app.use("/revenueExpense", revenueExpenseRouter);

const feedbackRouter = require("./routes/Feedbacks.js");
app.use("/feedback",feedbackRouter);

const orderRouter = require('./routes/OrderRoute.js');
app.use('/order',orderRouter);

const noticeRouter = require("./routes/Notices.js");
app.use("/notice",noticeRouter);

const customerRouter = require("./routes/customers.js");
app.use("/customer",customerRouter);

const purchaseItemsRoute =  require('./routes/purchaseItems.route.js');
app.use("/purchaseItems",purchaseItemsRoute);

const SupplierRoute = require("./routes/suppliers.route.js");
app.use("/suppliers",SupplierRoute);

const SupplierItemRoute = require("./routes/supplierItem.route.js");
app.use("/SupplierItem",SupplierItemRoute);

const SalesReport = require("./routes/SalesReport.route.js");
app.use("/sales_pdf",SalesReport);

const StockReport = require("./routes/StockReport.route.js");
app.use("/stock_pdf",StockReport);

const StoresReport = require("./routes/StoreReport.route.js");
app.use("/stores_pdf",StoresReport);

const FeedbacksReport = require("./routes/FeedbacksReport.js");
app.use("/Feedback_pdf",FeedbacksReport);

const driversReport = require("./routes/driversReport.js");
app.use("/driver_pdf",driversReport);

const financeReport = require("./routes/FinanceReport.route.js");
app.use("/finance_pdf",financeReport);

const OrdersReport = require("./routes/OrderReport.route.js");
app.use("/orders_pdf",OrdersReport);









const purchaseReport = require("./routes/purchaseReport.js");
app.use("/purchase_pdf",purchaseReport);
const CustomersReport = require("./routes/CustomerReport.route.js");
app.use("/customers_pdf",CustomersReport);

const SuppleiList_pdf = require("./routes/SupplierListPdf.route.js");
app.use("/suppliers_pdf",SuppleiList_pdf);


app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
})
