import React from 'react'
import axios from "axios";
import '../CSS/emp_login.css'
import storeLogin_img from '../images/storeLogin_img.png'
import { Link , useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function StoreLogin(){
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
        axios.post("http://localhost:8071/store/login",credentials)
        .then((res)=>{
            console.log(res.data.status)
            if(res.data.status == 200){
                //console.log(res.data.data)
                toast.success('Login Success!',{
                    autoClose:2000
                })
                sessionStorage.setItem("store", JSON.stringify(res.data.data))
                navigate('/storeProfile')
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
             console.log('front error')
            // alert(err);
        })  
        // console.log("logged")
    }
    
    console.log(showPassword)
    return(
        <div className='Emp_login_container'>
              <ToastContainer  /> 
            <div className='Delivery_img'>
                <img className='d_img' src= {storeLogin_img}/>
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
                            <Link to="#jj" data-mdb-toggle="modal" data-mdb-target="#exampleModal">Forgot Password? Change Password.</Link>
                            <Link to="/registerStore">New Here? Register.</Link>
                        </div>      
                    </form>
                </div>
                
            </div>
          
            {/* <button type="button" class="btn btn-primary" >
                Modal form
            </button> */}
            <div class="modal top fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true" data-mdb-backdrop="true" data-mdb-keyboard="true">
                <div class="modal-dialog" style={{width: "300px"}}>
                    <div class="modal-content text-center">
                        <div class="modal-header h5 text-white bg-primary justify-content-center">
                            Password Reset
                        </div>
                        <div class="modal-body px-5">
                            <p class="py-2">
                                Enter your email address and we'll send you an email with instructions to reset your password.
                            </p>
                            <div class="form-outline">
                                <input type="email" class="" />
                                {/* <label class="form-label" for="typeEmail">Email input</label> */}
                            </div>
                            <a href="#" class=" btn-primary w-100">Reset password</a>
                            <div class="d-flex justify-content-between mt-4">
                                <a class="" href="#">Login</a>
                                <a class="" href="#">Register</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}