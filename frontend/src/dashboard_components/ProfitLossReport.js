import React from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom"
import '../CSS/allAssets.css';
import {saveAs} from 'file-saver';

export default function ProfitLossReport(){

    const [date] = React.useState(new Date().toJSON().slice(0, 10))
    const [month1, setMonth] = React.useState('');

    const today = new Date();

    let month = today.getMonth() + 1;

    let yearAndMonth = today.getFullYear()+'-'+month

    console.log(yearAndMonth.slice(0, 10)+' igsgijn');

    const navigate = useNavigate();


    //calculating total sales amount
    React.useEffect(()=>{
        function getSales() {
            axios.get("http://localhost:8071/sale/").then((res)=>{
                setSales(res.data)
            }).catch((err)=>{
                console.log(err)
            });
        }
        getSales();
    },[]);

    const [sales, setSales] = React.useState([{}]);
    var totalSaleAmount = 0;

    sales.filter((thing)=>{
            return month1 == '' ?thing: thing.saleDate.includes(month1);
    }).forEach(sale=>{
        totalSaleAmount = totalSaleAmount + sale.amount;
    })

    console.log(totalSaleAmount);

    //calculating purchases amount
    React.useEffect(()=>{
        function getPurchases() {
            axios.get("http://localhost:8071/purchaseItems/").then((res)=>{
                setPurchases(res.data)
                //console.log(res.data)
            }).catch((err)=>{
                console.log(err)
            });
        }
        getPurchases();
    },[]);

    const [purchases, setPurchases] = React.useState([{}]);
    var totalPurchases = 0;

    purchases.filter((thing)=>{
            return month1 == '' ?thing: thing.Date.includes(month1);
    }).forEach(purchase=>{
        totalPurchases = totalPurchases + purchase.total_amount;
    })

    console.log(totalPurchases + "= total purchases");

    //calculating the total revenue and expenses
    React.useEffect(()=>{
        function getRevenueExpenses() {
            axios.get("http://localhost:8071/revenueExpense/").then((res)=>{
                setRevenueExpenses(res.data);
                console.log(res.data)
            }).catch((err)=>{
                console.log(err)
            });
        }
        getRevenueExpenses();
    },[]);

    const [RevenueExpenses, setRevenueExpenses] =React.useState([{}]);
    
    var totalOtherRevenue = 0;
    var totalOtherExpenses = 0;

    RevenueExpenses.filter((thing)=>{
        return month1 == '' ?thing: thing.date.includes(month1);
    }).forEach(RevenueExpense=>{
        if (RevenueExpense.reType === 'Revenue') {
            totalOtherRevenue = totalOtherRevenue + RevenueExpense.value;
          } else if (RevenueExpense.reType === 'Expense') {
            totalOtherExpenses = totalOtherExpenses + RevenueExpense.value;
          }
    })

    console.log(totalOtherRevenue);
    console.log(totalOtherExpenses);

    //calculating totolRevenue and totalExpense
    var totalRevenue = totalSaleAmount + totalOtherRevenue;
    var totalExpense = totalPurchases + totalOtherExpenses;

    //calculating profit
    var profit = totalRevenue - totalExpense;


    const reoprtData = {
        profit:profit,
        totalSaleAmount:totalSaleAmount,
        totalOtherRevenue:totalOtherRevenue,
        totalRevenue:totalRevenue,
        totalExpense:totalExpense,
        totalOtherExpenses:totalOtherExpenses,
        totalPurchases:totalPurchases
    }

    console.log("reportData"+JSON.stringify(reoprtData))

    function createAndDownLoadPdf(){

        console.log(reoprtData)
        axios.post('http://localhost:8071/finance_pdf/create-pdf',reoprtData)
        .then(() => axios.get('http://localhost:8071/finance_pdf/fetch-pdf', {responseType:'blob'}))
        .then((res)=>{

            console.log(res.data)
            const pdfBlob = new Blob([res.data], {type:'application/pdf'})

            saveAs(pdfBlob, 'newPdf.pdf')
        })
    }

    return(
        <div className='myContainer2'>
            <br/>
            <h2 className='profitOrLossH'>Profit / Loss Report</h2><br/>
            {/* <p className='reportGeneratedDate'>Report Generated Date : {date}</p> */}
            <div className='profitReportSortByOprionsDiv'>
            
                <div>
                    <p class="sortBy">Sort by month</p>
                    <input class="sortByM" type='month' name='month' onChange={(e)=>setMonth(e.target.value)}/>
                </div>
                <div className='sortByDateDivInProfitReport'>
                    <p className="sortByDate">Sort by date</p>
                    <input type="date" className="sortByDateProfitReport" onChange={(e)=>setMonth(e.target.value)}/>
                </div>
            </div>

            <form className='assetsForm'>
                <div className='reportContainerProfit'>
                    <div className='profitThisMonth'>
                        <div class="mb-3">
                            <label for="totalSales" class="form-label">Total Sales</label>
                            <input type="number" class="form-control" id="totalRevenue"  value={totalSaleAmount} disabled/>
                        </div>

                        <div class="mb-3">
                            <label for="totalOtherRevenue" class="form-label">Total Other Revenues</label>
                            <input type="text" class="form-control" id="totalOtherRevenue" value={totalOtherRevenue} disabled/>
                        </div>

                        <div class="mb-3">
                            <label for="totalRevenue" class="form-label">Total Revenue</label>
                            <input type="text" class="form-control" id="totalRevenue" value={totalRevenue} disabled/>
                        </div>

                        <div class="mb-3">
                            <label for="totalPerchases" class="form-label">Total Purchases</label>
                            <input type="text" class="form-control" id="totalPerchases" value={totalPurchases} disabled/>
                        </div>

                        <div class="mb-3">
                            <label for="totalOtherExpenses" class="form-label">Total Other Expenses</label>
                            <input type="text" class="form-control" id="totalOtherExpenses" value={totalOtherExpenses} disabled/>
                        </div>

                        <div class="mb-3">
                            <label for="totalExpenses" class="form-label">Total Expenses</label>
                            <input type="text" class="form-control" id="totalExpenses" value={totalExpense} disabled/>
                        </div>

                        <div class="mb-3">
                            <label for="Profit" class="form-label">Profit / Loss</label>
                            <input type="text" class="form-control" id="Profit" value={profit} disabled/>
                        </div>
                    </div>

                </div>

                <center><button class="btn btn-primary" onClick={() =>navigate('/dashboard/calcProf')}>Back</button></center>
                <center><button type='button' className='add_sale_btn' onClick={createAndDownLoadPdf}>Print Report</button></center>

            </form>            

        </div>
    )
}