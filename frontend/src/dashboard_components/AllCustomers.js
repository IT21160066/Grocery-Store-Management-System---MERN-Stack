import React from 'react';
import axios from 'axios';
import '../CSS/AllCustomers.css';
import { Link, useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';

export default function AllCustomers(){
    const [customers, setCustomers] = React.useState([]);
    const [search, setSearch] = React.useState('');

    const [deletebtn, setdeletebtn] = React.useState(false);

    const navigate = useNavigate();
    console.log(search);

    const customersArray = customers;
    console.log(customersArray)

    React.useEffect(() =>{
        function fetchAllData(){
            axios.get('http://localhost:8071/customer/') 
            .then((res)=>{
                setCustomers(res.data)
               
            }).catch((err)=>{
                console.log(err);
            });
        }
        fetchAllData();
    },[deletebtn]);

    
    function deleteStd(id){
        
        axios.delete('http://localhost:8071/customer/delete/'+id)
            .then(()=>{
                alert("Delete Successfully");
                setdeletebtn((prev)=>!prev)
                // navigate('/');
            }).catch((err)=>{
                console.log(err);
            });
        //console.log("hello "+id);
    }

    function createAndDownLoadPdf(){

        axios.post('http://localhost:8071/customers_pdf/create-pdf',customersArray)
        .then(() => axios.get('http://localhost:8071/customers_pdf/fetch-pdf', {responseType:'blob'}))
        .then((res)=>{

            console.log(res.data)
            const pdfBlob = new Blob([res.data], {type:'application/pdf'})

            saveAs(pdfBlob, 'newPdf.pdf')
        })
    }
    return(  
        <div className='container'>
            <div className='store_req_options'>
                <input type='text' name= "search-input" className='allCustomers_searchbar' placeholder='Search by Name..' onChange={(e) => setSearch(e.target.value)}/>
                <button className='add_sale_btn' onClick={createAndDownLoadPdf}>Generate Report</button>
            </div>
            <div className='table_content'>
                <table className='table_content'>
                    <thead>
                        <tr className='active-row'>
                            <th>User Name</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>PhoneNo</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.filter((thing) => {
                        // console.log(thing.name);
                            return search.toLowerCase() === ''  ? thing: thing.userName.toLowerCase().includes(search);
                            
                        }).map((thing)=>
                            <tr className='select' key = {thing._id}>
                                <td >{thing.userName}</td>
                                <td >{thing.name}</td>
                                <td >{thing.email}</td>
                                <td >{thing.address}</td>
                                <td >{thing.phoneNo}</td>
                                
                        
            
                                    {/* <Link  to ={`/updateCustomer/${thing._id}`}><button className='btn-primary'>Edit</button></Link> */}
                                    <button className='btncolor' onClick={()=>{deleteStd(thing._id)}}>Delete</button>
                                {/* /update?id=<% thing._id%>  */}
                            </tr> )}
                    </tbody>
                </table>
            </div>         
        </div>
    )
}
