import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import '../CSS/allAssets.css';
import '../CSS/ManageFinance.css';

export default function AllAssets(){

    const [Assets, setAssets] =  React.useState([]);
    const [search, setSearch] = React.useState('');
    const [deletebtn, setdeletebtn] = React.useState(false);

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

    function deleteAsset(id){
        
        axios.delete('http://localhost:8071/Asset/delete/'+id)
            .then(()=>{
                alert("Delete Successfully");
                setdeletebtn((prev)=>!prev)
                const newAssets = Assets.filter( (el)=> el._id != id);
                setAssets(newAssets);
                navigate('/dashboard/allAssets');
            }).catch((err)=>{
                console.log(err);
            });
        //console.log("hello "+id);
    }

    return(

        <div className='myContainer'>
            {/* <div className="navigateBtns">
                <button onClick={() =>navigate('/dashboard/add')}>Add Asset</button>
                <button onClick={() =>navigate('/dashboard/')}>All Asset</button>
                <button onClick={() =>navigate('/dashboard/calcProf')}>Calculate Profit</button>
                <button onClick={() =>navigate('/dashboard/ieHistory')}>Income expense history</button>
            </div> */}
            
            
            <br/>
            <center>
                <h2>All Assets</h2>
            </center>
            <div>
                <input type='text' className='all_assets_search' name= "search-input" placeholder='Search by Name..' onChange={(e) => setSearch(e.target.value)}/>     
            </div>
            <br/>
            <br/>
            {/* id='req_table' */}
            <div  className='table_content'>
                <table className='table_content'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>description</th>
                            <th>Value</th>
                            <th>Date of Perchase</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id='assets_list_table'>
                        {Assets.filter((thing) => {
                            //console.log(thing.name);
                            return search.toLowerCase() == ''  ? thing: thing.name.toLowerCase().includes(search);
                            
                        }).map((thing)=>
                            <tr key = {thing._id}>
                                <td >{thing.name}</td>
                                <td >{thing.description}</td>
                                <td >{thing.value}</td>
                                <td >{thing.dateOfPurchase}</td>
                                <td>
                                    <Link  to ={`/dashboard/updateAssests/${thing._id}`}><button className='editBtn'>Edit</button></Link>
                                    <button className='deleteBtn' onClick={()=>{deleteAsset(thing._id)}}>Delete</button>
                                    {/* <button type="button" class="first btn btn-primary" onclick="alert('confirmed');">clickme</button> */}
                                </td>
                            </tr> )}
                    </tbody>       
                </table>
            </div>
            <br/>
            <br/>
            <br/>
            <div className=''>
                {/* <button type="submit" onClick={() =>navigate('/dashboard/assetsReport')} className="calc_options generateReportbtn">Generate Report</button> */}
                <button type='button' id="backbtnIncalcProf" onClick={() =>navigate('/dashboard/manageFinance')}>Back</button>
            </div>
        </div>
    )
}