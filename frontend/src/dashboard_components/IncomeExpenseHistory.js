import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import '../CSS/allAssets.css';

export default function AllIncomesAndExpenses(){

    const [RevenueExpenses, setRevenueExpenses] =  React.useState([]);
    const [search, setSearch] = React.useState('');
    const [deletebtn, setdeletebtn] = React.useState(false);

    const [month1, setMonth] = React.useState('');

    const today = new Date();

    let month = today.getMonth() + 1;

    let yearAndMonth = today.getFullYear()+'-'+month

    const navigate = useNavigate();
    console.log(search);

    React.useEffect(()=>{
        function getRevenueExpenses() {
            axios.get("http://localhost:8071/revenueExpense/").then((res)=>{
                setRevenueExpenses(res.data);//assigning values to Assets state useing setAssets method
            }).catch((err)=>{
                console.log(err)
            });
        }
        getRevenueExpenses();
    },[deletebtn]);

    function deleteRevenueExpenses(id){
        
        axios.delete('http://localhost:8071/revenueExpense/delete/'+id)
            .then(()=>{
                alert("Delete Successfully");
                setdeletebtn((prev)=>!prev)
                navigate('/');
            }).catch((err)=>{
                console.log(err);
            });
    }

    return(
        <div className='myContainer'>
            <br/>
            <center>
                <h2>Income / Expense History</h2>
            </center>

            <input type='text' name= "search-input" placeholder='Search by Name..' onChange={(e) => setSearch(e.target.value)}/>
            <div className='locateSort'>
                <lable className>Sort by date</lable>
                <input type="date"  onChange={(e)=>setMonth(e.target.value)}/>
                <lable className='sortMonth2'>Sort by month</lable>
                <input  type='month' name='month' onChange={(e)=>setMonth(e.target.value)}/>
            </div>
            <br/>
            <br/>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Income / Expense</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {RevenueExpenses.filter((thing) => {
                        return search.toLowerCase() == ''  ? thing: thing.name.toLowerCase().includes(search);
                    }).filter((thing)=>{
                        return month1 === '' ?thing: thing.date.includes(month1);
                    }).map((thing)=>
                        <tr key = {thing._id}>
                            <td >{thing.date}</td>
                            <td >{thing.name}</td>
                            <td >{thing.reType}</td>
                            <td >{thing.value}</td>
                        </tr> )}
                </tbody>       
            </table>

            <center><button class="btn btn-primary" onClick={() =>navigate('/dashboard/manageFinance')}>Back</button></center>
            
            <br/>
            <br/>
            <br/>
            <br/>

        </div>
    )
}