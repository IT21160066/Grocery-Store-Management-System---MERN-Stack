// import React from "react"
import '../CSS/Register.css';
import axios from "axios";
import facebook from '../images/facebook.png';
import google from '../images/google.png'; 
import register_img from '../images/loginN.png';
import login_img from '../images/Sign_In.png'
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Register() {
   const navigate = useNavigate();
   const [style1, setStyle1] = React.useState(false)

   const [invalidPassword, setInvalidPassword] = React.useState(false)


   const [credentials, setCredentials] = React.useState({
      userName:'',
      password:''
   })

   function handleOnclick(){
      setStyle1((prv)=>!prv)
   }

   console.log(credentials)

      const [customer,setCustomer] = React.useState({
         name :"",
         userName :"",
         email :"",
         address :"",
         phoneNo : "",
         password : "",
         conPassword: ""
     });
 
     console.log(customer);

 
     function onchange(e){
         setCustomer(prevData =>{
             const {name,value} = e.target;
             return{
                 ...prevData,
                 [name] : value
             }
         })
         setCredentials(prevData =>{
            const {name,value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
      }
 
 
      function sendData(e){
          e.preventDefault();
 
         axios.post("http://localhost:8071/customer/add",customer)
         .then(()=>{
             alert("Customer added")
         }).catch((err)=>{
             alert(err)
         })
         console.log("hello vishal")
      }

      function login(e){
         e.preventDefault();

        axios.post("http://localhost:8071/customer/login",credentials)
        .then((res)=>{
           console.log(res.data.status)
            if(res.data.status == 404){
               setInvalidPassword(true)
            }else{
               setInvalidPassword(false)
               sessionStorage.setItem('customer',JSON.stringify(res.data.data))
               navigate('/profile')
               // console.log(res.data.data)
            }
        }).catch((err)=>{
            alert(err)
        })
        console.log("hello vishal")
     }



    
 return (
   <div className='full-container'>
    <title>title Sign In An Sign Up Form</title>
    <link rel="stylesheet" href="Register.css"></link>
    <div className='reg_con'>
      <div className={style1 == false?"regcontainer":'regcontainer sign-up-mode'}>
         <div className="forms-container">
            <div className="sign-in-signup">
               <form action="" id='customerRegister_form' className="sign-in-form" onSubmit={login}>
                  <h2 className="title">Sign In</h2>

                  <div className="input-field">
                     <i className="fas fa-field"></i>
                     <input type="text" placeholder="User Name" name='userName' onChange={onchange}></input>  
                     {/* ------------- */}
                  </div>
                  <div className="input-field">
                     <i className="fas fa-field"></i>
                     <input type="password" name='password' placeholder="Password"
                     // -----------------
                     onChange={onchange}></input> 
                     {/* -----------------  */}
                  </div>
                  <button type="submit" value="Login" className= "btn solid">Login</button>

                  {invalidPassword == true?<h6 style={{color:"red"}}>Invalid Username or Password</h6>:''}
                 
                  <div className='same'>
                  <p className="social-text">Or Sign in with</p>
                  <div className="social-media">
                     {/* <a href="#" className="social-icon">
                        <i className="fab fa-google"></i>
                     </a>
                     <a href="#" className="social-icon">
                        <i className="fab fa-facebook-f"></i>
                     </a>   */}
                  <span className="media">
                    <a href="#"><img className="media_icons" src={facebook}/></a>
                    <a href="#"><img className="media_icons" src={google}/></a>
                    {/* <a href="#"><img classNameName="media_icons" src={visa}/></a> */}
                </span>
                  </div>
                  </div>
               </form>


               <form onSubmit={sendData} action="" className="sign-up-form">
                  <h2 className="title">Register Now</h2>
                  <div className="input-field">
                     <i className="fas fa-field"></i>
                     <input type="text" placeholder="Full Name" name='name' onChange={onchange} required></input>  
                  </div>
                  <div className="input-field">
                     <i className="fas fa-field"></i>
                     <input type="text" placeholder="User Name" name='userName' onChange={onchange} required></input>  
                  </div>
                  <div className="input-field">
                     <i className="fas fa-field"></i>
                     <input type="email" placeholder="Email" name='email'onChange={onchange} required></input>  
                  </div>
                  <div className="input-field">
                     <i className="fas fa-field"></i>
                     <input type="text" placeholder="Address"name='address' onChange={onchange} required></input>  
                  </div>
                  <div className="input-field">
                     <i className="fas fa-field"></i>
                     <input type="number" placeholder="Phone Number" name='phoneNo'pattern="[0-9]{10}"  onChange={onchange} required></input>  
                  </div>
                  <div className="input-field">
                     <i className="fas fa-field"></i>
                     <input type="password" placeholder="Password" name='password'onChange={onchange} required></input>  
                  </div>
                  <div className="input-field">
                     <i className="fas fa-field"></i>
                     <input type="password" placeholder="Confirm Password" name='conPassword'onChange={onchange} required></input>  
                  </div>
                  <button type="submit" value="Login" className= "btn solid">Register</button>
                  <div className='same'>
                  <p className="social-text">Or Sign in with</p>
                  <div className="social-media">
                     {/* <a href="#" className="social-icon">
                        <i className="fab fa-google"></i>
                     </a>
                     <a href="#" className="social-icon">
                        <i className="fab fa-facebook-f"></i>
                     </a>   */}
                  <span className="media">
                    <a href="#"><img className="media_icons" src={facebook}/></a>
                    <a href="#"><img className="media_icons" src={google}/></a>
                  </span>
                  </div>
                  </div>
               </form>
            </div> 
         </div>

         <div className="panels-container">
            <div className="panel left-panel">
               <div className="content">
                  <h3>New here?</h3>
                  <p>  </p>
                  <button className="btn transparent" onClick={handleOnclick} id="sign-up-btn">Sign Up </button>
               </div>
               <img src={register_img} className="image" alt=""></img>
            </div>
         

            <div className="panel right-panel">
               <div className="content">
                  <h3>One of us?</h3>
                  <p> </p>
                  <button className="btn transparent" onClick={handleOnclick} id="sign-in-btn">Sign In </button>
               </div>

               <img src={login_img} className="image" alt=""></img>
            </div>

         </div>
         </div>
      </div>
   </div>
 )

}

export default Register;
