import React,{useState} from "react";
import axios from "axios";
import '../CSS/allAssets.css';
import {Link, useNavigate} from "react-router-dom";

export default function AddAsset(){

    const navigate = useNavigate();

    //defining states
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [dateOfPurchase, setDateOfPurchase] = useState("");

    const today = new Date().toISOString().split('T')[0];
    const [maxDate, setMaxDate] = useState(today);

    function sendData(e){
        e.preventDefault();
        
        const newAsset = {
            name,
            description,
            value,
            dateOfPurchase
        }
        axios.post("http://localhost:8071/Asset/add",newAsset).then(()=>{
            alert("Asset added successfully!")
            navigate('/dashboard/allAssets');
        }).catch((err)=>{
            alert(err)
        })
    }

    return(
        <div className="addAssetsForm">
            <br/>
            <center><h2>Add Assets</h2></center>
            
            <form onSubmit={sendData} className="assetsForm">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Asset Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Asset Name" required onChange={(e)=>{//assigning values to states
                        setName(e.target.value);
                    }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Asset Description</label>
                    <input type="text" className="form-control" id="description" placeholder="Enter Asset Description" required onChange={(e)=>{
                        setDescription(e.target.value);
                    }}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="value" className="form-label">Value</label>
                    {/* <input type="number" className="form-control" id="value" placeholder="Enter Value Of The Asset" required onChange={(e)=>{
                        setValue(e.target.value);
                    }} /> */}
                    <input className="form-control" id="value" placeholder="Enter Value Of The Asset" required pattern="[0-9]*" onChange={(e) => {
                        setValue(e.target.value);
                    }}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="dateOfPurchase" className="form-label">Date Of Purchase</label>
                    <input type="date" className="form-control" id="dateOfPurchase" max={maxDate} required onChange={(e)=>{
                        setDateOfPurchase(e.target.value);
                    }}/>
                </div>
                <div className="calc_profit_bottom_btns">
                    <button type="submit" className="calc_options generateReportbtn">Submit</button><br/>
                    <button className="calc_options backbtn" onClick={() =>navigate('/dashboard/manageFinance')}>Back</button>
                </div>
            </form>

            <br/>
        </div>
    )

}