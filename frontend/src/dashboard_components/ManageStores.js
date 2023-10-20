import React from 'react';
import axios from 'axios';
import '../CSS/manageStore.css'
import { Link, useNavigate } from "react-router-dom";
// import Animal from '../background.json';
import Lottie from "lottie-react";
import {saveAs} from 'file-saver';


export default function AllStores(){
    const [stores, setStores] = React.useState([]);
    const [search, setSearch] = React.useState('');

    const [deletebtn, setdeletebtn] = React.useState(false);

    const navigate = useNavigate();
    console.log(stores);

    React.useEffect(() =>{
        function fetchAllData(){
            axios.get('http://localhost:8071/store/')
            .then((res)=>{
                setStores(res.data)
                console.log(res.data)
            }).catch((err)=>{
                console.log(err);
            });
        }
        fetchAllData();
    },[deletebtn]);

    function deleteStore(id){
        
        axios.delete('http://localhost:8071/store/delete/'+id)
            .then(()=>{
                // alert("Delete Successfully");
                // setdeletebtn((prev)=>!prev)

                const newrecords = stores.filter( (el)=> el._id != id);
                setStores(newrecords);

                // navigate('/');
            }).catch((err)=>{
                console.log(err);
            });
        //console.log("hello "+id);
    }

    function createAndDownLoadPdf(){

        // console.log(storesArray)
        axios.post('http://localhost:8071/stores_pdf/create-pdf',stores)
        .then(() => axios.get('http://localhost:8071/stores_pdf/fetch-pdf', {responseType:'blob'}))
        .then((res)=>{

            console.log(res.data)
            const pdfBlob = new Blob([res.data], {type:'application/pdf'})

            saveAs(pdfBlob, 'newPdf.pdf')
        })
    }
    return(  
        <div className='manage_stores_container'>
            {/* <div className='animation'>
                <Lottie animationData={Animal}/>
            </div> */}
            <div className='store_req_options'>
                <input type='text' name= "search-input" className='manageStore_searchbar' placeholder='Search by UserName..'onChange={(e)=> setSearch(e.target.value)}/>
                <span>No of stores : {stores.length}</span>
                <button className='add_sale_btn' onClick={createAndDownLoadPdf}>Generate Report</button>
            </div>
            
            {/* id='manage_store_table' */}
            <table className='table_content'>
                <thead>
                    <tr>
                        <th>UserName</th>   
                        <th>Image</th>
                        <th>Full Name</th>
                        <th>NIC</th>
                        <th>Contact Number</th>
                        <th>Address No</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>Postal Code</th>
                        <th>Email</th>
                        <th>option</th>
                    </tr>
                </thead>
                <tbody>
                    {stores.filter((thing) => {
                        // console.log(thing)
                        // return thing
                        return search.toLowerCase() == ''?thing: thing.userName.toLowerCase().includes(search)
                    }).map((thing)=>
                        <tr key = {thing._id}>
                            <td className='table_data'>{thing.userName}</td>
                            <td className='table_data'><img id='supplier_profile_img' src={thing.image} alt = "Profile Picture"/></td>
                            <td className='table_data'>{thing.name}</td>
                            <td className='table_data'>{thing.nic}</td>
                            <td className='table_data'>{thing.phoneNo}</td>
                            <td className='table_data'>{thing.addressNo}</td>
                            <td className='table_data'>{thing.street}</td>
                            <td className='table_data'>{thing.city}</td>
                            <td className='table_data'>{thing.postalCode}</td>
                            <td className='table_data'>{thing.email}</td>

                            <td className='table_data btns'>
                                <div className='operations'>
                                   
                                    <button className='btn-danger' onClick={()=>{deleteStore(thing._id)}}>Delete</button>
                                </div>
                            {/* /update?id=<% thing._id%> 
                            
                            */}
                            </td>
                        </tr> )}
                </tbody>       
            </table>
        </div>                    
        
    )
}