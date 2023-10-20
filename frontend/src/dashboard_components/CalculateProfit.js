import React,{useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom"
import '../CSS/allAssets.css';

export default function CalculateProtit(){

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
        return month1 === '' ?thing: thing.saleDate.includes(month1);
    }).forEach(sale=>{
        totalSaleAmount = totalSaleAmount + sale.amount;
    })

    console.log(totalSaleAmount);

    //calculating purchases amount
    const [purchases, setPurchases] = React.useState([{}]);
    React.useEffect(()=>{
        function getPurchases() {
            axios.get("http://localhost:8071/purchaseItems/").then((res)=>{
                setPurchases(res.data)
                console.log(res.data)
            }).catch((err)=>{
                console.log(err)
            });
        }
        getPurchases();
    },[]);

    console.log(purchases)
    
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
        return month1 === '' ?thing: thing.date.includes(month1);
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

    return(
        <div className="myContainer2">
            <center><h2>Profit / Loss</h2></center>
            <div className="calc_profin_sort_imputs_container">
                <div>
                    <label class="">Sort by month</label>
                    <input class="" type='month' name='month' onChange={(e)=>setMonth(e.target.value)}/>
                </div>
                <div>
                    <label className="">Sort by date</label>
                    <input type="date" className="" onChange={(e)=>setMonth(e.target.value)}/>
                </div>
            </div>
            
            <form className="assetsForm">
                <div class="mb-3">
                    <label for="totalRevenue" class="form-label">Total Revenue</label>
                    <input type="text" class="form-control" id="totalRevenue" value={totalRevenue} disabled/>
                </div>

                <div class="mb-3">
                    <label for="totalExpenses" class="form-label">Total Expenses</label>
                    <input type="text" class="form-control" id="totalExpenses" value={totalExpense} disabled/>
                </div>

                <div class="mb-3">
                    <label for="Profit" class="form-label">Profit / Loss</label>
                    <input type="text" class="form-control" id="Profit" value={profit} disabled/>
                </div>

                <div className="calc_profit_bottom_btns">
                    <button onClick={() =>navigate('/dashboard/profitLossReport')} type="submit" className="calc_options generateReportbtn">Show More Details</button><br/><br/>
                    <button className="calc_options backbtn" onClick={() =>navigate('/dashboard/manageFinance')}>Back</button>
                </div>
            </form>
            <br/>
            <br/>

        </div>
    )

}