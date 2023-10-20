import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/salesList.css';
import {saveAs} from 'file-saver';

export default function SalesList(){
    const navigate = useNavigate();

    const mindate = new Date('2023-01-01').toISOString().split('T')[0];
    const [min, setmin] = React.useState(mindate);

    const [sort, setSort] = React.useState('');

    const [search,setSearch] = React.useState('');

    
    //    sales list logic
    const [sales, setSales] = React.useState([]);

    const salesArray = sales;
    console.log(salesArray)
    
    React.useEffect(() =>{
        function fetchAllData(){
            axios.get('http://localhost:8071/sale/')
            .then((res)=>{
                setSales(res.data)
            }).catch((err)=>{
                console.log(err);
            });
        }
        fetchAllData();
    },[]);

    function deleteItem(id){
        axios.delete('http://localhost:8071/sale/delete/'+id)
            .then(()=>{
                 alert("Delete Successfully");
                // setdeletebtn((prev)=>!prev)

                const newSales = sales.filter( (el)=> el._id != id);
                setSales(newSales);

                // navigate('/');
            }).catch((err)=>{
                console.log(err);
            });
        //console.log("hello "+id);
    }

// end

    function createAndDownLoadPdf(){

        // console.log(salesArray)
        axios.post('http://localhost:8071/sales_pdf/create-pdf',salesArray)
        .then(() => axios.get('http://localhost:8071/sales_pdf/fetch-pdf', {responseType:'blob'}))
        .then((res)=>{

            console.log(res.data)
            const pdfBlob = new Blob([res.data], {type:'application/pdf'})

            saveAs(pdfBlob, 'newPdf.pdf')
        })
    }
    return(
        <div className='sales_list_container'>
            {/* <div className='sales_options'> */}
            <div className='store_req_options'>
                <input type='text' className='sale_list_inputs' placeholder='Search Sales by item name' onChange={(e)=>{setSearch(e.target.value)}} />
                <input type='date' className='sale_list_inputs' min={min} onChange={(e)=>{setSort(e.target.value)}} />
                <button className='add_sale_btn' onClick={()=>navigate('/dashboard/addSale')}>Add Sales</button>
                <button className='add_sale_btn' onClick={createAndDownLoadPdf}>Generate Report</button>
            </div>
            <div className='sales_list'>
                <table className='table_content'>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Supplier ID</th>
                            <th>Sale Date</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.filter((sale)=>{
                                return search.toLowerCase() == '' ?sale: sale.itemname.toLowerCase().includes(search);
                            }).filter((sale)=>{
                                return sort == '' ?sale: sale.saleDate.includes(sort);
                            }).map((sale)=>
                            <tr key = {sale._id}>
                                <td className='table_data'>{sale.itemname}</td>
                                <td className='table_data'>{sale.supplierId}</td>
                                <td className='table_data'>{sale.saleDate}</td>
                                <td className='table_data'>{sale.description}</td>
                                <td className='table_data'>{sale.quantity}</td>
                                <td className='table_data'>{sale.amount}</td>
                                <td className='table_data btns'>
                                    <button className='btn-danger' onClick={()=>{deleteItem(sale._id)}}>Delete</button>
                                </td>
                            </tr> )}
                    </tbody>       
                </table>
            </div>
        </div>
    )
}