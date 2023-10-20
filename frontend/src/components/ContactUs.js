import React,{useState} from 'react';
import '../CSS/ContactUs.css'
import {Link,useNavigate} from "react-router-dom";
import Logo from '../images/logo.png';
import Call from '../images/call.png';
import mail from '../images/mail.png';
import fax from '../images/fax.png';
import cover_image from '../images/cover.jpeg';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactUs(){
    const navigate = useNavigate();
    

    function checkLogin(){
        
        if(sessionStorage.getItem('customer')){
            navigate('/addFeedBack')
            
        }else{
            toast.warn('Login required!',{
                autoClose:2000
            })
        }
    }

   return( 
    <div>
        <ToastContainer  />
        <div class name="container"></div>

        <div>
            <img src={cover_image} className='image123' alt=''></img>
        </div>

        <div class="image-text">
            <h1>Contact Us</h1>
        </div>
        
        <div class="topic">
            <p><i><b><h4>HERE TO HELP!</h4></b></i></p>
        </div >
        <div class="paragraph">
        <p>Your feedback and enquiry is important to us, so we will endeavour to respond to you at our earliest. Your feedback will help us continuously improve ourselves to make it better for you and our other valued Customers.
        In the meantime if your enquiry is urgent and you require immediate assistance, our Customer Care team is here to assist you (Refer below for other ways to contact us)</p>
        </div>

        <div class="full">
            <div  class="con1">
                <div class="logo1"><img src={Logo} className='ilogo' alt=''></img></div>
                    <div class="peris"><h4 class="companyname">Peiris Marketing Services Pvt Ltd</h4>
                        <p className='addressstore'>No:269/A, Kandy Road, 
                        Colombo 2, Sri Lanka.</p>
                    </div>
            </div>

            <div class="con2">
                <img src={Call} className='callLogo' alt=''></img><br/>
                <p class="contactnumber">+94 11 2708800</p>
            </div>

            <div class="con3">
                <img src={mail} className='mailLogo' alt=''></img><br/>
                <p class="mail">groceryshoppvt@gmail.com</p>
            </div>

            <div class="con4">
                <img src={fax} className='faxlLogo' alt=''></img><br/>
                <p class="fax">+94 11 2303555</p>
            </div>

        </div>
        <div className='contact_us_btns'>
            {/* <button type="submit" class="sendbtn12" onClick={()=>navigate('/addFeedBack')}>
                Send Feedback
            </button> */}
            <button type='button' className='sendbtn12' onClick={checkLogin}>Send feedback</button>
            <button type="submit" class="showbtn12" onClick={()=>navigate('/showAllFeedbacks')}> 
                Show All Feedback
            </button>
        </div>

        

        


    </div>
    
   )
}
