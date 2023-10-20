import React from 'react';
import '../CSS/employeeReg.css'
import scooty_bye from '../images/scooty_bye.png';
import store_succes_animation from '../animations/store_succes_animation.json';
import Lottie from 'lottie-react';
import { Link , useNavigate} from 'react-router-dom';
import scrollDown from '../animations/scrollDown.json'
import axios from "axios";



export default function EmployeeRegistration(){
    const navigate = useNavigate();
    const [profilepic, setProfilepic] = React.useState({
        image:''
    })

    const [employee, setEmployee] = React.useState({
        image:'',
        name: '',
        nic:'',
        phoneNo:'',
        addressNo:'',
        street:'',
        city:'',
        postalCode:'', 
        email:'',
        deliveryType:'',
        vehicleType:'',
        vRegNo:'',
        deliveryArea:'',
        licenseCopy:'',
        userName:'',
        password:'',
    })
    console.log(employee)

    function onchange(e){
        setEmployee(prevData =>{
            const {name,value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }

    function submit(e){
        e.preventDefault();
        axios.post("http://localhost:8071/employee/add",employee)
        .then(()=>{
             alert("Successfully Registered");  
            navigate('/deliveryregistraion/employeeLogin')
            setEmployee({
                image:'',
                name: '',
                nic:'',
                phoneNo:'',
                addressNo:'',
                street:'',
                city:'',
                postalCode:'', 
                email:'',
                deliveryType:'',
                vehicleType:'',
                vRegNo:'',
                deliveryArea:'',
                licenseCopy:'',
                userName:'',
                password:'',
                
            })
        })
        .catch((err)=>{
            alert(err);
        })   
    }

    React.useEffect(()=>{
        var animation = document.getElementById('animate');
        animation.style.width = '20px'       
    },[])

    console.log(employee)

    const handleFileUpload = async(e) =>{
        const file = e.target.files[0];
        const base64 = await convertToBase64(file)
        setEmployee({...employee,image:base64})
    }


    
    return(
        <div className='employee_welcomepage'>
            <div className='employee_welcome_content'>
                <div className='employee_welcome_img'>
                    <img className='emp_welcome_img' src={scooty_bye}/>
                </div>
                <div className='employee_welcome_texts'>
                    <h1><i>Earn extra money?</i></h1>
                    <p>Get used your vehicle to connect with us as a driver in our delivery service to earn more money and overcome financial struggles.
                    </p>
                    <h4>Easy Join....Flexible Time... Quick pay...</h4>
                    <Link to = 'employeeLogin' className='login_link'>Already have an account?Login</Link>
                    <div className='scroll_animation'>
                        <Lottie id="animate" animationData={scrollDown}/>
                        <a href='#regForm'>Register</a>
                    </div>
                </div>
                
            </div>
            {/* hidden */}
            <div className='employee_reg_form slide' id='regForm'>
                <form className='reg_from' onSubmit={submit}>
                    <div className='input_block'>
                        <label htmlFor='Profilepic'>Profile picture:</label>
                        <input type='file' name = 'profilepic' placeholder='add profilepic' style={{textIndent:"0", borderTopLeftRadius:"0",borderBottomLeftRadius:"0"}}
                        value={employee["profilepic"]} onChange ={handleFileUpload}/>
                    </div>
                    <div className='input_block'>
                        <label htmlFor='fullname'>Full Name (Name with initials):</label>
                        <input type= 'text' name='name' value={employee["name"]} onChange ={onchange} required/>
                    </div >
                    <div className='input_block'>
                        <label htmlFor='NIC'>NIC No:</label>
                        <input type= 'text' name='nic'value={employee["nic"]} pattern="([0-9]{9}[v-V]{1})|([0-9]{12})" onChange ={onchange} required/>
                    </div>
                    <div className='input_block'>
                        <label htmlFor='contactNo'>Contact No:</label> 
                        {/* <input type='text' name = 'phoneNo' value={employee["phoneNo"]} onChange ={onchange}/> pattern="[0-9]{10}"*/}
                        <input type="tel" id="phone" name="phoneNo"pattern="[0-9]{10}" value={employee["phoneNo"]} onChange ={onchange}/>
                    </div>
                    <div className='input_block'>
                        <label htmlFor='address_inputs'>Address:</label>

                        <div className='address_inputs' name ="address_inputs">
                            <div className='input_block'>
                                <label htmlFor='no'>No:</label>
                                <input type= 'text' name='addressNo' value={employee["addressNo"]} onChange ={onchange} required/>
                            </div>
                            <div className='input_block'>
                                <label htmlFor='street'>Street Address:</label>
                                <input type= 'text' name='street' value={employee["street"]} onChange ={onchange} required/>
                            </div>
                            <div className='input_block'>
                                <label htmlFor='city'>City:</label>
                                <input type='text' name = 'city' value={employee["city"]} onChange ={onchange} required/>
                            </div>
                            <div className='input_block'>
                                <label htmlFor='postalCode'>Postal Code:</label>
                                <input type='text' name = 'postalCode' value={employee["postalCode"]} onChange ={onchange} required/>
                            </div>    
                        </div>
                    </div>
                    <div className='input_block'>
                        <label htmlFor='email'>E-mail Address:</label>
                        <input type='email' name = 'email' placeholder='Enter your email address..' value={employee["email"]} onChange ={onchange}/>
                    </div>
                    <div className='input_block'>
                        <label htmlFor="deliveryType">Delivery type:</label>
                        <select id="deliveryType" name="deliveryType" value={employee["deliveryType"]} onChange ={onchange} required>
                            <option value="" defaultValue hidden>select Type</option>
                            <option value="stock delivery">Stock delivery</option>
                            <option value="customer delivery">Customer delivery</option>
                        </select>
                    </div>
                    <div className='input_block'>
                        <label htmlFor="vehicleType">Vehicle Type:</label>
                        <select id="vehicleType" name="vehicleType" value={employee["vehicleType"]} onChange ={onchange} required>
                            <option value="" defaultValue  hidden >select Type</option>
                            <option value="bike">Bike</option>
                            <option value="lorry">Lorry</option>
                        </select>
                    </div>            
                    <div className='input_block'>
                        <label htmlFor='vRegNo'>Vehicle Reg No:</label>
                        <input type='text' name = 'vRegNo' placeholder='Enter your Vehicle Register Number..' value={employee["vRegNo"]} onChange ={onchange} required/>
                    </div>
                    <div className='input_block'>
                        <label htmlFor='deliveryArea'>Delivery Area:</label>
                        <input type='text' name = 'deliveryArea' placeholder='Enter your delivery area..' value={employee["deliveryArea"]} onChange ={onchange}/>
                    </div>
                    <div className='input_block'>
                        <label htmlFor='licenseCopy'>License Copy:</label>
                        <input type='file' name = 'licenseCopy' placeholder='add image' style={{textIndent:"0", borderTopLeftRadius:"0",borderBottomLeftRadius:"0"}}
                        value={employee["licenseCopy"]} onChange ={onchange}/>
                    </div>
                    <div className='input_block'>
                        <label htmlFor='username'>Username:</label>
                        <input type= 'text' name='userName'  value={employee["username"]} onChange ={onchange} required/>
                    </div>
                    <div className='input_block'>
                        <label htmlFor='password'>Password:</label>
                        <input type= 'password' name='password'value={employee["password"]} onChange ={onchange} required/>   
                    </div>
                    <div className='input_block'>
                        <label htmlFor='reEnterpass'>Re-enter Password:</label>
                        <input type='text' name = 'reEnterpass' required/>  
                    </div>
                    <input type='submit' className='registerBtn' value="Register"/>
                    
                </form>
            </div>
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