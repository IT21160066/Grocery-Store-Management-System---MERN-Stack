import React from "react";
import axios from "axios";
import {Link, useNavigate } from "react-router-dom";
import {saveAs} from 'file-saver';

export default function PurchaseItemView(){

    const [purchaseItems, setpurchaseItems] = React.useState([]);
    const [search, setSearch] = React.useState('');

    // const [purchase, setSales] = React.useState([]);

    const purchaseArray = purchaseItems;
    console.log(purchaseArray)
    

    const navigate = useNavigate();
    console.log(search);

    React.useEffect(() =>{
        function fetchAllData(){
            axios.get('http://localhost:8071/purchaseItems/')
            .then((res)=>{
                setpurchaseItems(res.data)
                console.log(res.data)
            }).catch((err)=>{
                console.log(err);
            });
        }
        fetchAllData();
    },[]);

    function createAndDownLoadPdf(){

        // console.log(salesArray)purchase_pdf
        axios.post('http://localhost:8071/purchase_pdf/create-pdf',purchaseArray)
        .then(() => axios.get('http://localhost:8071/purchase_pdf/fetch-pdf', {responseType:'blob'}))
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
                <span>No of Suppliers : {purchaseItems.length}</span>
            </div>   
        
        {/* id='emp_table_dashboard' style={{width:"90%"}} */}
        <div className='table_content'>
            <table className='table_content'>
                <thead style={{background:"black",color:"white"}}>
                    <tr>
                        <th>Supplier Name</th>
                        <th>Item Name</th>
                        <th>Price of One pieces</th>
                        {/* <th>Scale scale category</th> */}
                        <th>Quantity</th>
                        <th>Total Amount</th>
                        <th>Date</th>
             
                    </tr>
                </thead>
                <tbody>
                    {purchaseItems.filter((thing) => {
                        //console.log(thing.name);
                        return search.toLowerCase() == ''  ? thing: thing.personal_name.toLowerCase().includes(search);
                        
                    }).map((thing)=>
                        <tr key = {thing}>
                            <td className='table_data'>{thing.personal_name}</td>
                            <td className='table_data'>{thing.Itemname}</td>
                            <td className='table_data'>{thing.Price_of_one_pieces}</td>
                            {/* <td className='table_data'>{thing.scale_category}</td> */}
                            <td className='table_data'>{thing.quantity}</td>
                            <td className='table_data'>{thing.total_amount}</td>
                            <td className='table_data'>{thing.Date}</td>
                            
                        
                        </tr> )}
                </tbody>       
            </table>
        </div>
    </div>
   )
}