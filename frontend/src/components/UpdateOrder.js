import React from "react";
import {useNavigate, useParams} from 'react-router-dom'
import '../CSS/updateOrder.css';
import '../CSS/dashBoardStyles.css';
import axios from "axios";

export default function UpdateOrder(){

    const [Order,setOrder] = React.useState({
        name : "",
        phone : "",
        location : "",
        amount : "",
        storeName: "",
        date : "",
        deliveryPersonName : ""
    });

    const [employee, setEmployee] = React.useState([]);
    console.log(Order)

    const navigate = useNavigate();

    // console.log(Order)
    function onChange(e){

        setOrder(prevData => {
            const {name, value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }

    const OrderID = useParams();

    const name = Order.name;
    // console.log(Order.name);
   
    React.useEffect(() =>{
        function fetchAllData(){
            axios.get('http://localhost:8071/order/get/'+OrderID.id)
            .then((res)=>{
                setOrder(res.data);      
            }).catch((err)=>{
                console.log(err);
            });
        }
        fetchAllData();
    },[]);

    console.log(employee);

    const employeeId = useParams();

    const empName = employee.name;
    // console.log(employee);

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
    // console.log(employeeId)

    function updateOrderData(e){
        e.preventDefault();
        axios.put("http://localhost:8071/order/update/"+ OrderID.id,Order)
        .then(()=>{
            alert("Successfully updated!");
            navigate("/dashboard/orderList");
        }).catch((err)=>{
            console.log(err);
        })
        
    }

    //update order details using admin dashboard

    return(
    <div className="updatecontainer">

        <div className="updateFormContainer">

                <div className="upheader">
                    <h5>Update Order</h5>
                </div>
                
            <form onSubmit={updateOrderData}>

                <table>
                    <tbody>

                        <tr>
                            <td><label htmlFor="upname">Name:</label></td>
                            <td><input type="text"  className="upname" name="name"  onChange={onChange} value={Order.name}></input></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="upphone">Phone: </label></td>
                            <td><input type="text"  className="upphone" name="phone"  onChange={onChange} value={Order.phone}></input></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="upaddress">Address: </label></td>
                            <td><input type="text" className="upaddress" name="location" onChange={onChange} value={Order.location}></input></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="upamount">Amount: </label></td>
                            <td><input type="text" readOnly  className="upamount" name="amount"  onChange={onChange} value={Order.amount}></input></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="update">Date: </label></td>
                            <td><input type="text" className="upddate" name="date"  onChange={onChange} value={Order.date}></input></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="store">Store: </label></td>
                            <td><input type="text" className="upstore" name="store"  onChange={onChange} value={Order.storeName}></input></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="update">Delivery Person Name: </label></td>
                            <td>
                                <select type="text" name="deliveryPersonName" className="updeliverypersonid"  onChange={onChange} value={employee.name}>
                                    <option  >Select Delivery Person</option>
                                    {
                                        employee.map((emp)=>{
                                            return <option key={emp._id} value={emp.name}>{emp.name}</option>
                                        })
                                    }

                                </select>
                            </td>
                        </tr>
                        {/* <tr>
                            <td><label htmlFor="update">Delivery Person Name: </label></td>
                            <td>
                                <select type="text" name="deliveryPersonName" className="updeliverypersonid"  onChange={onChange} value={employee.name}>
                                    <option  >Select Delivery Person</option>
                                    {
                                        employee.map((emp)=>{
                                            return <option key={emp._id} value={emp.name}>{emp.name}</option>
                                        })
                                    }

                                </select>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
                    <center>
                        <button type="submit" className="update-button upch">Save Changes</button>
                    </center>

                
            </form>
     
                
        </div>

        </div> 
    )
}