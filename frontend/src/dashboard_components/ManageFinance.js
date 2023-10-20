import React,{useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom"
import '../CSS/allAssets.css';
import '../CSS/ManageFinance.css';

export default function ManageFinance(){
    const navigate = useNavigate();

    return(
        <div className="myContainer4">
            <center>
                <div className="navigateBtns">
                    <button onClick={() =>navigate('/dashboard/addAssets')}>Add Asset</button><br/><br/>
                    <button onClick={() =>navigate('/dashboard/allAssets')}>All Asset</button><br/><br/>
                    <button onClick={() =>navigate('/dashboard/calcProf')}>Calculate Profit</button><br/><br/>
                    <button onClick={() =>navigate('/dashboard/addRevenueOrExpenses')}>Add revenue / expense</button><br/><br/>
                    <button onClick={() =>navigate('/dashboard/ieHistory')}>Income expense history</button>
                </div>
            </center>
            
        </div>
        
    )
}