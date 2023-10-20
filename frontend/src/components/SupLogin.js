import React from 'react'
import axios from 'axios';
import '../CSS/sup_login.css'
import supplier_login_img from '../images/supplier_login_img.png'
import { Link , json, useNavigate } from 'react-router-dom';

export default function SupLogin(){
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = React.useState(false)
    const [Invalidpassword,setInvalidPassword] = React.useState(false)
    const [credentials, setCredentials] = React.useState({
        email:'',
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
        axios.post("http://localhost:8071/suppliers/login",credentials)
        .then((res)=>{
            console.log(res.data)
            if(res.status == 200){
                console.log(res.data.supplier)
                alert('Successfully Logged')
                sessionStorage.setItem('supplier',JSON.stringify(res.data.supplier))
                navigate('/Supplier_items')
                // navigate(`/Supplier_items/${res.data.supplier._id}`)
            }
            // navigate('/dashboard/addItem')
            // setCredentials({
            //     email:'',
            //     password:''
            // })

        })
        .catch((err)=>{
            alert(err);
        })  
        
    }

    console.log(showPassword)
    return(
        <div className='Emp_login_container'> 
            <div className='Delivery_img'>
                <img className='d_img' src= {supplier_login_img}/>
            </div>
            <div className='rightSide'>
                <div className='delivery_login_form_container'>
                    <h1>Login</h1>
                    <form className='delivery_loginForm' onSubmit={login}>
                        <input type='text' placeholder='userName' name='email' onChange={onchange}/>
                        <input type={showPassword==false?'password':'text'} name='password' placeholder='password' onChange={onchange} />

                        <div style={{display:"flex", alignItems:"center",marginTop:"10px"}}>
                            <input type="checkbox" id='showpassword' onClick={()=>setShowPassword((prev)=>!prev)} />
                            <label htmlFor='showpassword' style={{fontWeight:"200",fontSize:"10px",marginLeft:"5px",marginTop:"1px"}}>Show Password</label>
                        </div>
                        <button id='loginBtn' type='submit'>Login</button>
                        { Invalidpassword== true?<h6 style={{color:'red'}}>Invalid Username or password</h6>:''}
                        <div className='login_resetPss_reg_link'>
                            <Link to="#jj">Forgot Password? Change Password.</Link>
                            <Link to="/SupplierRegister">New Here? Register.</Link>
                        </div>      
                    </form>
                </div>
                
            </div>
        </div>

    )
}