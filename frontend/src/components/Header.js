import React from 'react'
import logo from '../images/logo.png';
import cart from '../images/cart.png';
import { Link , useNavigate } from 'react-router-dom';
import '../CSS/header.css';
// import cartAnimation from '../animations/cart.json'
import Lottie from "lottie-react";
import {BsPersonCircle} from 'react-icons/bs'
import {RiShoppingCartFill} from 'react-icons/ri'


export default function Header(){
    const navigate = useNavigate();
    const [login , setLogin] = React.useState(
        sessionStorage.getItem("login")
    )

   
    
    React.useEffect(()=>{
        if(sessionStorage.getItem("store")||sessionStorage.getItem("employee")||sessionStorage.getItem("supplier")||sessionStorage.getItem("customer")){
            // setLogin(null)
            setLogin(true)
        }else{
            // console.log(sessionStorage.getItem("login"))
            navigate('/')
        }
    },[sessionStorage.getItem("store"),sessionStorage.getItem("employee"),sessionStorage.getItem("supplier"),sessionStorage.getItem("customer")])
    

    function logout(){
        if(sessionStorage.getItem("store")){
            sessionStorage.removeItem("store")
            setLogin(null)
        }else if(sessionStorage.getItem("employee")){
            sessionStorage.removeItem("employee")
            setLogin(null)
        }else if(sessionStorage.getItem("supplier")){
            sessionStorage.removeItem("supplier")
            setLogin(null)
        }else if(sessionStorage.getItem("customer")){
            sessionStorage.removeItem("customer")
            setLogin(null)
        }
        
        
        // navigate('/')
    }

    function navigateToProfile(){
        if(sessionStorage.getItem("store")){
            navigate('/StoreProfile')
        }else if(sessionStorage.getItem("employee")){
            navigate('/driverProfile')
        }else if(sessionStorage.getItem("customer")){
            navigate('/profile')
        }else if(sessionStorage.getItem("supplier")){
            navigate('/Supplier_items')
        }
        // console.log('hello')
    }
    return(
        <div id='header_container'>
            <div className='header-top-bar'>
                <div className='login-left-float'>
                    {login==null?
                        <span>
                            <Link to='/login'>Signup</Link>/
                            <Link to='/login'>Login</Link>
                        </span>:
                        <span>
                            <Link onClick={logout}>Logout</Link>
                        </span>
                    }
                 
                </div> 
            </div>
            <div className='hr1'></div>
            <div className='header-navbar'>
                <div className='nav-container'>
                    <div className='logo'>
                        {/* <img className={logoAnimate&&'animate__animated animate__rubberBand'} onMouseEnter={animateOn} onMouseLeave={animateOff} src={logo}/> */}
                        <img  src={logo}/>
                    </div>
                    <div className='tabs'>
                        <div className='nav-links'>
                            <Link className='links' to='/'>Home</Link>
                            <Link className='links' to='/allgroceries'>All Groceries</Link>
                            <Link className='links' to='/contactus'>Contact Us</Link>
                            <Link className='links' to='/ourServices'>Our Services</Link>
                        </div>
                        <div className='right-tabs'>
                            <div id='profile_icon' onClick={navigateToProfile}>
                                <BsPersonCircle id='prof_icn'/>
                                {/* <button  >click</button> */}
                            </div>
                            <div className='shopping-cart'>
                                <Link to='/cart'>
                                
                                    <div className='cart' >
                                        {/* <img src={cart}/> */}
                                        {/* <Lottie style={{width:"200px"}} animationData={cartAnimation}/> */}
                                        <RiShoppingCartFill id='crt_icn' />
                                    </div>
                                    <div className='item-count'>{}</div>
                                </Link>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}