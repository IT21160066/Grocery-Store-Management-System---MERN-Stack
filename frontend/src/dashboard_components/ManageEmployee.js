import React from "react";
import axios from "axios";
// import '../CSS/manageEmployee.css';
import { Link, useNavigate } from "react-router-dom";
// import Animal from '../background.json';
import Lottie from "lottie-react";
import {saveAs} from 'file-saver';


export default function ManageEmployee(){
    const [Employees, setEmployees] = React.useState([]);
    const [search, setSearch] = React.useState('');

    const [deletebtn, setdeletebtn] = React.useState(false);

    const navigate = useNavigate();
    console.log(search);

    React.useEffect(() =>{
        function fetchAllData(){
            axios.get('http://localhost:8071/Employee/')
            .then((res)=>{
                setEmployees(res.data)
                console.log(res.data)
            }).catch((err)=>{
                console.log(err);
            });
        }
        fetchAllData();
    },[deletebtn]);

    function deleteemp(id){
        
        axios.delete('http://localhost:8071/Employee/delete/'+id)
            .then(()=>{
                // alert("Delete Successfully");
                // setdeletebtn((prev)=>!prev)

                const newrecords = Employees.filter( (el)=> el._id != id);
                setEmployees(newrecords);

                // navigate('/');
            }).catch((err)=>{
                console.log(err);
            });
        
    }
    function createAndDownLoadPdf(){

        // console.log(salesArray)
        axios.post('http://localhost:8071/driver_pdf/create-pdf',Employees)
        .then(() => axios.get('http://localhost:8071/driver_pdf/fetch-pdf', {responseType:'blob'}))
        .then((res)=>{

            console.log(res.data)
            const pdfBlob = new Blob([res.data], {type:'application/pdf'})

            saveAs(pdfBlob, 'newPdf.pdf')
        })
    }
    return(  
        <div className='manage_emp_container'>
            <div className='store_req_options'>
                <input type='text' name= "search-input" className="manage_emp_searchbar" placeholder='Search by user name..' onChange={(e) => setSearch(e.target.value)}/>
                <span>No of Empoyees : {Employees.length}</span>
                <button className='add_sale_btn' onClick={createAndDownLoadPdf}>Generate Report</button>
            </div>
            {/* id='emp_table_dashboard' */}
            <table className='table_content'>
                <thead>
                    <tr>
                        <th>userName</th>
                        <th>Name</th>
                        <th>NIC</th>
                        <th>ContactNumber</th>
                        <th>Address NO</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>Postal code</th>
                        <th>Email</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {Employees.filter((thing) => {
                        //console.log(thing.name);
                        return search.toLowerCase() == ''  ? thing: thing.userName.toLowerCase().includes(search);
                        
                    }).map((thing)=>
                        <tr key = {thing._id}>
                            <td className='table_data'>{thing.userName}</td>
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
                                    <Link  to ={`/dashboard/DriverProfile_AdminSide/${thing._id}`}><button className='btn_primary'>show more</button></Link>
                                    <button className='btn-danger' onClick={()=>{deleteemp(thing._id)}}>Delete</button>
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