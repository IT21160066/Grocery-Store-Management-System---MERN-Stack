import React from 'react'
import axios from 'axios';
import '../CSS/emp_login.css'
import deliveryLoginPic from '../images/deliveryLoginPic.png'
import { Link , useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EmployeeLogin(){
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = React.useState(false)
    const [credentials, setCredentials] = React.useState({
        userName:'',
        password:''
    })

    console.log(credentials)

    function onchange(e){
        setCredentials(prevData =>{
            const {name,value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }
  
    function login(e){
        e.preventDefault();
        axios.post("http://localhost:8071/employee/login",credentials)
        .then((res)=>{
            if(res.data.status == 200){
            
                toast.success('Login Success!',{
                    autoClose:2000
                })
                sessionStorage.setItem('employee',JSON.stringify(res.data.data))
                navigate('/driverProfile')
            }else if(res.data.status == 404){
                toast.error('Invalid Username or password!',{
                    autoClose:2000
                })
            }
            setCredentials({
                userName:'',
                password:''
            })
        })
        .catch((err)=>{
            alert(err);
        })  
    }

    console.log(showPassword)
    return(
        <div className='Emp_login_container'> 
         <ToastContainer  />
            <div className='Delivery_img'>
                <img className='d_img' src= {deliveryLoginPic}/>
            </div>
            <div className='rightSide'>
                <div className='delivery_login_form_container'>
                    <h1>Login</h1>
                    <form className='delivery_loginForm' onSubmit={login}>
                        <input type='text' placeholder='userName' name='userName' onChange={onchange} required/>
                        <input type={showPassword==false?'password':'text'} name='password' placeholder='password' onChange={onchange} required/>

                        <div style={{display:"flex", alignItems:"center",marginTop:"10px"}}>
                            <input type="checkbox" id='showpassword' onClick={()=>setShowPassword((prev)=>!prev)} />
                            <label htmlFor='showpassword' style={{fontWeight:"200",fontSize:"10px",marginLeft:"5px",marginTop:"1px"}}>Show Password</label>
                        </div>
                        <button id='loginBtn' type='submit'>Login</button>
                        <div className='login_resetPss_reg_link'>
                            <Link to="#jj">Forgot Password? Change Password.</Link>
                            <Link to="/deliveryregistraion">New Here? Register.</Link>
                        </div>      
                    </form>
                </div>
                
            </div>
        </div>

    )
}