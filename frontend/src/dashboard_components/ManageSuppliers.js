import React from "react";
import axios from "axios";
import '../CSS/manageEmployee.css';
import { Link, useNavigate } from "react-router-dom";
// import Animal from '../background.json';
import Lottie from "lottie-react";
import { saveAs } from "file-saver";

export default function ManageSuppliers(){
    const [suppliers, setSupplier] = React.useState([]);
    const [search, setSearch] = React.useState('');

    const [deletebtn, setdeletebtn] = React.useState(false);

    const navigate = useNavigate();
    console.log(search);

    React.useEffect(() =>{
        function fetchAllData(){
            axios.get('http://localhost:8071/suppliers/')
            .then((res)=>{
                setSupplier(res.data)
                console.log(res.data)
            }).catch((err)=>{
                console.log(err);
            });
        }
        fetchAllData();
    },[deletebtn]);

    function deleteemp(id){
        
        axios.delete('http://localhost:8071/suppliers/delete/'+id)
            .then(()=>{
                // alert("Delete Successfully");
                // setdeletebtn((prev)=>!prev)

                const newrecords = suppliers.filter( (el)=> el._id != id);
                setSupplier(newrecords);

                // navigate('/');
            }).catch((err)=>{
                console.log(err);
            });
        
    }
    function createAndDownLoadPdf(){

        // console.log(salesArray)
        axios.post('http://localhost:8071/suppliers_pdf/create-pdf',suppliers)
        .then(() => axios.get('http://localhost:8071/suppliers_pdf/fetch-pdf', {responseType:'blob'}))
        .then((res)=>{

            console.log(res.data)
            const pdfBlob = new Blob([res.data], {type:'application/pdf'})

            saveAs(pdfBlob, 'newPdf.pdf')
        })
    }
    
    return(
        <div className='manage_emp_container' style={{width:"100%",height:"100%"}}>
            <div className='store_req_options'>
                <input type='text' name= "search-input" className="manage_emp_searchbar" placeholder='Search by Name..' onChange={(e) => setSearch(e.target.value)}/>
                <button className='add_sale_btn' onClick={createAndDownLoadPdf}>Generate Report</button>
                <span>No of Suppliers : {suppliers.length}</span>
            </div>
        
        {/* id='emp_table_dashboard' style={{width:"90%"}} */}
        <table  className='table_content'>
            <thead style={{background:"black",color:"white"}}>
                <tr>
                    <th>Personal Name</th>
                    <th>Personal Address</th>
                    <th>Company Address</th>
                    <th>Manufacturing</th>
                    <th>Product type</th>
                    <th>Product Attribute</th>
                    <th>Email</th>
                    <th>Contact Number</th>
                    <th>View Suppliers</th>
                    <th>Remove</th>
                    
                </tr>
            </thead>
            <tbody>
                {suppliers.filter((thing) => {
                    //console.log(thing.name);
                    return search.toLowerCase() == ''  ? thing: thing.personal_name.toLowerCase().includes(search);
                    
                }).map((thing)=>
                    <tr key = {thing._id}>
                        <td className='table_data'>{thing.personal_name}</td>
                        <td className='table_data'>{thing.personal_address}</td>
                        <td className='table_data'>{thing.company_address}</td>
                        <td className='table_data'>{thing.manufacturing}</td>
                        <td className='table_data'>{thing.product_type}</td>
                        <td className='table_data'>{thing.product_attribute}</td>
                        <td className='table_data'>{thing.email}</td>
                        <td className='table_data'>{thing.contact_number}</td>
                        
                        <td className="supplier_table_data">
                           <button onClick={()=>navigate(`/dashboard/Supplier_ItemsPurchase/${thing._id}`)} className="">View</button>
                        </td>
                        <td className='supplier_table_data '>
                            <button className='supplier_delete-danger' onClick={()=>{deleteemp(thing._id)}}>Delete</button>
                        </td>
                      
                    </tr> )}
            </tbody>       
        </table>
    </div>
    )
}