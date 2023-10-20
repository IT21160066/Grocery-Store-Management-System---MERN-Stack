import React,{ useRef } from "react";
import {Link, useNavigate, useParams} from 'react-router-dom';
import '../CSS/orderList.css';
// import '../CSS/dashBoardStyles.css'
import axios from "axios";
// import { useReactToPrint } from 'react-to-print';
import {saveAs} from 'file-saver';


export default function OrderList(props){

    const [Orders, setOrders] =  React.useState([]);
    const [search, setSearch] = React.useState('');
    const [deletebtn, setdeletebtn] = React.useState(false);
    const [employee, setEmployee] = React.useState([]);
    const [storeName, setStoreName] = React.useState([]);

    const navigate = useNavigate();

    const employeeId = useParams();

    const empName = employee.name;
    // console.log(employee);

    const ordersArray = Orders;
    console.log(ordersArray)

    React.useEffect(() =>{
        function fetchEmployeeData(){
            axios.get('http://localhost:8071/employee/')
            .then((res)=>{
                setEmployee(res.data);      
            }).catch((err)=>{
                console.log(err);
            });

        }
        fetchEmployeeData();
    },[]);

    console.log(employeeId.id+ "jhhkg")
    React.useEffect(() =>{
        function fetchAllData(){
            axios.get('http://localhost:8071/order/')
            .then((res)=>{
                setOrders(res.data)
                console.log(res.data)
            }).catch((err)=>{
                console.log(err);
            });
        }
        fetchAllData();
    },[deletebtn]);

        React.useEffect(()=>{
        function getOrders() {
            axios.get("http://localhost:8071/order/").then((res)=>{
                setOrders(res.data);//assigning values to Assets state useing setAssets method
            }).catch((err)=>{
                console.log(err)
            });
        }
        getOrders();
    },[deletebtn]);

    function deleteOrder(id){
        axios.delete('http://localhost:8071/order/delete/'+id)
            .then(()=>{
                 alert("Delete Successfully");
                // setdeletebtn((prev)=>!prev)

                const newOrders = Orders.filter( (el)=> el._id != id);
                setOrders(newOrders);

                // navigate('/');
            }).catch((err)=>{
                console.log(err);
            });
        //console.log("hello "+id);
    }

    // const componentRef = useRef();
    // const handlePrint = useReactToPrint({
    //     content: () => componentRef.current,
    //     documentTitle: 'emp-data',
    //     onAfterPrint: ()=> alert('Report Generated Successfully')
    // });

     function createAndDownLoadPdf(){
        axios.post('http://localhost:8071/orders_pdf/create-pdf',ordersArray)
        .then(() => axios.get('http://localhost:8071/orders_pdf/fetch-pdf', {responseType:'blob'}))
        .then((res)=>{

            console.log(res.data)
            const pdfBlob = new Blob([res.data], {type:'application/pdf'})

            saveAs(pdfBlob, 'newPdf.pdf')
        })
    }

    return(
        <div className="listcontainer">
            <input type='text' id="searchName"  className="orderList_searchbar" name= "search-input" placeholder='Search by Name..' onChange={(e) => setSearch(e.target.value)}/>
            <button className='add_sale_btn' onClick={createAndDownLoadPdf}>Generate Report</button>
            <div className="tableContainer">
                <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Store</th>
                        <th>Deliver Person</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    
                        {Orders.filter((thing) => {
                       // console.log(thing.name);
                        return search.toLowerCase() === ''  ?thing: thing.name.toLowerCase().includes(search);

                        }).map((thing)=>
                        <tr key={thing._id}>
                            <td>{thing.name}</td>
                            <td>{thing.phone}</td>
                            <td>{thing.location}</td>
                            <td>{thing.amount}</td>
                            <td>{thing.date}</td>
                            <td>{thing.storeName}</td>
                            <td>{thing.deliveryPersonName}</td>
                            
                        <td>
                            <Link  to ={`/dashboard/updateOrder/${thing._id}`}><button className='edtOrder colch1'>Edit</button></Link>
                            <button className='delOrder colch2' onClick={()=>{deleteOrder(thing._id)}}>Delete</button>
                            
                        </td>
                    </tr>)}

                </tbody>
                </table>
            </div>
            {/* <button type="button" onClick={handlePrint}>Generate Report</button> */}
        </div>
    );
}
