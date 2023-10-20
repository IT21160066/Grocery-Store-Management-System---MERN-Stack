import React from 'react';
import axios from 'axios';
import '../CSS/driverProfile.css';
import indianfarmer from '../images/indianfarmer.jpg'
import { useNavigate , useParams} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import loadingAnimation3 from '../animations/loading_animation3.json'
import Lottie from "lottie-react";


export default function DriverProfile(){
    const navigate = useNavigate();
    const {id} = useParams();

    const [employee, setEmployee] = React.useState({
        _id:'',
        image : "",
        name : "",
        nic : "",
        phoneNo : "",
        addressNo : "",
        street : "",
        city : "",
        postalCode : "", 
        email : "",
        deliveryType : "",
        vehicleType : "",
        vRegNo : "",
        deliveryArea : "",
        license : "",
        userName : "",
        password : "",
        passwordRe  : ""
    })
    console.log(employee)
    
    React.useEffect(()=>{
        // function fetchAllData(){
            const user = JSON.parse(sessionStorage.getItem('employee'))
            console.log(user)
            axios.get('http://localhost:8071/Employee/get/'+user._id)
            .then((res)=>{
                setEmployee(res.data.employee)
                console.log(res.data.employee)
            }).catch((err)=>{
                console.log(err);
            });
        // }
        // fetchAllData();
    },[])
    // const id = '642d6c69a2aa7beba8eb7aab'

    function updateDriverData(e){
        e.preventDefault();
        axios.put('http://localhost:8071/Employee/update/'+id,employee)
        .then((res)=>{
            alert('Update success')
            navigate(`/storeProfile/${id}`)
        }).catch((err)=>{
            console.log(err);
        });
     }

     function deleteemp(id){
        
        axios.delete('http://localhost:8071/Employee/delete/'+id)
            .then(()=>{
                
                navigate('/');
            }).catch((err)=>{
                console.log(err);
            });
        
    }

    function showLoginSuccess (){
        toast.success('Login Success !',{
            autoClose:2000
        })
    }

    return(
        <div className='Employee_Profile_container' onLoad={showLoginSuccess}>
            {employee.image == null?<div id = 'loadingAnimation'>
                <Lottie animationData={loadingAnimation3}/>
                </div>:''}
                <ToastContainer />
            <form className='emp_prof_main_container_1' onSubmit={updateDriverData}>
                <img className='emp_profilePic' src={employee.image}/>
                <div className='Emp_details'>
                <table id='table_epm_prof_sub_container_1'>
                    <tr>
                        <td>Full Name (Name with initials):</td>
                        <td>{employee.name}</td>
                    </tr>
                    
                    <tr>
                        <td>NIC No:</td>
                        <td>{employee.nic}</td>
                    </tr>
                    
                    <tr>
                        <td>Contact No:</td>
                        <td>{employee.phoneNo}</td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td>{employee.email}</td>
                    </tr>
                        
                    <tr>
                        <td>Adress No:</td>
                        <td>{employee.addressNo}</td>
                    </tr>
                    <tr>
                        <td>Street Address:</td>
                        <td>{employee.street}</td><br/>
                    </tr>
                    <tr>
                        <td>City:</td>
                        <td>{employee.city}</td>
                    </tr>
                    <tr>
                        <td>Postal Code:</td>
                        <td>{employee.postalCode}</td>
                    </tr>
                        
                    
                    <tr>
                        <td>Delivery Type:</td>
                        <td>{employee.deliveryType}</td>
                    </tr>
                    <tr>
                        <td>Vehicle Type:</td>
                        <td>{employee.vehicleType}</td>
                    </tr>
                    <tr>
                        <td>Vehicle Reg No:</td>
                        <td>{employee.vRegNo}</td>
                    </tr>
                    <tr>
                        <td>Delivery Area:</td>
                        <td>{employee.deliveryArea}</td>
                    </tr>
                    
                    {/* <button className='driver_option_btn d_edit' onClick={()=>navigate(`/updateDriverProfile/${employee._id}`)}>Edit Details</button>
                    <button className='driver_option_btn d_remove' onClick={()=>deleteemp(id)}>Remove Account</button> */}
                </table> 

                <div>
                        <button className=' DriverEdit' onClick={()=>navigate(`/updateDriverProfile/${employee._id}`)}>Edit Details</button>
                        <button className=' DriverRemove' onClick={()=>deleteemp(employee._id)}>Remove Account</button>
                    </div>
                </div>                  
            </form>                      
        </div>
    )  
}