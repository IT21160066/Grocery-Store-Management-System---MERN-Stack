import React,{useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom"
import '../CSS/otherRevenue.css';

export default function AddRevenueOrExpenses(){

    const navigate = useNavigate();

    //defining states
    //const [date, setDate] = useState("");
    //const [date, setDate] = useState(new Date().toISOString());
    //const [date, setDate] = useState(new Date().toLocaleDateString());
    const [date, setDate] = React.useState(new Date().toJSON().slice(0, 10))
    const [name, setName] = useState("");
    const [reType, setreType] = useState("");
    const [value, setValue] = useState("");

    function sendData(e){
        e.preventDefault();
        
        const newRevenueExpense = {
            date,
            name,
            reType,
            value
        }
        
        axios.post("http://localhost:8071/revenueExpense/add",newRevenueExpense).then(()=>{
            alert("Revenue / Expense added successfully!")
            navigate('/dashboard/ieHistory');
        }).catch((err)=>{
            alert(err)
        })
    }

    return(
        <div class="myContainer3">
            <br/>
            <center><h2>Add other revenue & expense</h2></center>
            <br/>

            <form className="assetsForm" onSubmit={sendData}>
                <div class="assestForm_input_container">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter Revenue / Expense Name" required onChange={(e)=>{//assigning values to states
                        setName(e.target.value);
                    }}/>
                </div>

                <div class="mb-3">
                    <label for="value" class="form-label">Value</label>
                    <input type="text" class="form-control" id="value" placeholder="Enter Revenue / Expense amount" required onChange={(e)=>{//assigning values to states
                        setValue(e.target.value);
                    }}/>
                </div>

                <div class="mb-3 text_box_container">
                    <div className="radiobtn">
                        <input type="radio" class="form-label" id="revenue" name="reType" value="Revenue" checked={reType === "Revenue"} pattern="[0-9]*" required onChange={(e)=>{//assigning values to states
                        setreType(e.target.value);
                    }}/> 
                        <label for="revenue" class="form-label">Revenue</label>
                    </div>
                    
                    <div className="radiobtn">
                        <input type="radio" class="form-label" name="reType" id="expense" value="Expense" checked={reType === "Expense"} required onChange={(e)=>{//assigning values to states
                        setreType(e.target.value);
                    }}/> 
                        <label for="expense" class="form-label">Expense</label>
                        <input class="dateHidden" id="date" type="date" value={date} disabled hidden/>
                    </div>

                    <br/>
                    
                </div>

                <center>
                    <button type="submit" class="addOtherRev">+ Add other Revenue / Expense</button><br/><br/>
                    <center><button class="back" onClick={() =>navigate('/dashboard/manageFinance')}>Back</button></center>
                </center>
                
            </form>
            <br/>

        </div>

       
    )

}