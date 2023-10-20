import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import '../CSS/allAssets.css';

export default function AssetsReport(){

    const [Assets, setAssets] =  React.useState([]);
    const [search, setSearch] = React.useState('');
    const [deletebtn, setdeletebtn] = React.useState(false);

    var totalAssets = 0;

    Assets.forEach(Asset=>{
        totalAssets = totalAssets + Asset.value;
    })

    console.log(totalAssets)

    const navigate = useNavigate();
    console.log(search);

    React.useEffect(()=>{
        function getAssets() {
            axios.get("http://localhost:8071/Asset/").then((res)=>{
                setAssets(res.data);//assigning values to Assets state useing setAssets method
            }).catch((err)=>{
                console.log(err)
            });
        }
        getAssets();
    },[deletebtn]);

    return(
        <div className='myContainer'>
            <br/>
            <center><h2>Assets Report</h2></center>
            <br/>
            <br/>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>description</th>
                        <th>Value</th>
                        <th>Date of Perchase</th>
                    </tr>
                </thead>
                <tbody>
                    {Assets.filter((thing) => {
                        //console.log(thing.name);
                        return search.toLowerCase() == ''  ? thing: thing.name.toLowerCase().includes(search);
                        
                    }).map((thing)=>
                        <tr key = {thing._id}>
                            <td >{thing.name}</td>
                            <td >{thing.description}</td>
                            <td >{thing.value}</td>
                            <td >{thing.dateOfPurchase}</td>
                        </tr> )}
                </tbody>
               
            </table>
            <div className='totalAssetsDev'>
                <h5 className='totalValueOfAssets'>Total value of assets : </h5> 
                <input type="number" id="totalValueOfAssets" value={totalAssets} disabled/>  
            </div>
            
            <br/>
            <br/>
            <br/>
            <br/>
            
        </div>
    )
}