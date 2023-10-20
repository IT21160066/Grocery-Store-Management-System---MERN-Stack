import React from 'react'
import '../CSS/driverProfile.css';
import defaultImage from '../images/add_item_default_img.png'
import { useParams , useNavigate} from 'react-router-dom';
import axios from 'axios';

export default function UpdateDriverProfile(){
    const driverID = useParams();
    const navigate = useNavigate();
    console.log(driverID)
    // update item logic
    const [driver,setDriver] = React.useState({
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
    });
    

    console.log(driver)
    function singleDriver(e){
        setDriver(prevData =>{
            const {name,value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }
    

    React.useEffect(() =>{
        function fetchData(){
            axios.get('http://localhost:8071/employee/get/'+driverID.id)
            .then((res)=>{
                setDriver(res.data.employee);      
            }).catch((err)=>{
                console.log(err);
            });
        }
        fetchData();
    },[]);

    function updateData(e){
        e.preventDefault();
        axios.put("http://localhost:8071/employee/update/"+driverID.id,driver)
        .then(()=>{
            sessionStorage.setItem('employee', JSON.stringify(driver))
            alert("Successfully updated!");
            navigate('/driverProfile');
        })
        .catch((err)=>{
            alert(err);
        })  
    }
    const handleFileUpload = async(e) =>{
        const file = e.target.files[0];
        const base64 = await convertToBase64(file)
        setDriver({...driver,image:base64})
    }

    // end


    return(
        <div className='Employee_Profile_container'>
            <form className='emp_prof_main_container_1' onSubmit={updateData}>
                <img className='emp_profilePic' src={driver.image||defaultImage}/>
                <div className='Emp_details'>   
                <table className='table epm_prof_sub_container_1'>
                    <tbody>
                    <tr>
                        <td>Full Name (Name with initials):</td>
                        <td><input type='text' className='updateInputs' name='name' onChange={singleDriver} value={driver.name} required/></td>
                    </tr>
                    
                    <tr>
                        <td>NIC No:</td>
                        <td><input type='text' className='updateInputs' name='nic' onChange={singleDriver} value={driver.nic} required/></td>
                    </tr>
                    
                    <tr>
                        <td>Contact No:</td>
                        <td><input type='number' className='updateInputs' name='phoneNo' onChange={singleDriver} value={driver.phoneNo} required/></td>
                    </tr>
                    <tr>
                        <td>Email:</td>
                        <td><input type='email'className='updateInputs' name='email' onChange={singleDriver} value={driver.email} required/></td>
                    </tr>
                    {/* </table>
                    <table className='emp_prof_main_container_2'>   */}
                    <tr>
                        <td>Address</td>
                        <td>
                            <table>
                                <tbody>
                                <tr>
                                    <td>No:</td>
                                    <td><input type='text' className='updateInputs'name='addressNo' value={driver.addressNo} onChange={singleDriver}/></td>
                                </tr>
                                <tr>
                                    <td>Street Address:</td>
                                    <td><input type='text'className='updateInputs' name='street'value={driver.street} onChange={singleDriver}/></td>
                                </tr>
                                <tr>
                                    <td>City:</td>
                                    <td><input type='text'className='updateInputs' name='city'value={driver.city} onChange={singleDriver}/></td>
                                </tr>
                                <tr>
                                    <td>Postal Code:</td>
                                    <td><input type='text'className='updateInputs' name='postalCode'value={driver.postalCode} onChange={singleDriver}/></td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>Delivery Type:</td>
                        <td>
                            <select name='deliveryType'className='updateInputs selectStyle' value={driver.deliveryType} onChange={singleDriver}>
                                <option value="" defaultValue disabled hidden>Choose here</option>
                                <option value='Stock Delivery'>Stock Delivery</option>
                                <option value='Customer Delivery'>Customer Delivery</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Vehicle Type:</td>
                        <td>
                            <select name='vehicleType' className='updateInputs selectStyle' value={driver.vehicleType} onChange={singleDriver}>
                                <option value="" defaultValue disabled hidden>Choose here</option>
                                <option value='Bike'>Bike</option>
                                <option value='Lorry'>Lorry</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Vehicle Reg No:</td>
                        <td><input type='text'className='updateInputs ' name='vRegNo' value={driver.vRegNo} onChange={singleDriver}/></td>
                    </tr>
                    <tr>
                        <td>Delivery Area:</td>
                        <td><input type='text'className='updateInputs ' name='deliveryArea' value={driver.deliveryArea} onChange={singleDriver}/></td>
                    </tr>
                    <tr>
                        <td>Change profile pic:</td>
                        <td><input type='file' onChange={handleFileUpload}/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><button className='driver_option_btn d_save'>Save</button></td>
                    </tr>
                    </tbody>
                </table>
                </div>                      
            </form>                      
        </div>
    )
    function convertToBase64(file){
        return new Promise((resolve,reject) =>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
        })
    }
}