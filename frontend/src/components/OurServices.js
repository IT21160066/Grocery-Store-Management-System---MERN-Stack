import React from 'react'
import '../CSS/ourServices.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import OurServicesImage from '../images/setup.png'
import supplier_card_image from '../images/supplier_card_image.png'
import store_card_Image from '../images/store_card_image.png'
import card_container_Image from '../images/ourServices_card_container.png'
import deliveryPerson_Lottie from '../animations/delivryPerson.json'
import Lottie from "lottie-react";

import Footer from './Footer'


export default function OurServices(){
   

    return(
        <div className='our_services_page'>   
            <div className='ourServices_container'>
            <div className='ourServices_center'>  
                <img  className='ourServices_img' src={OurServicesImage}/>
                <div className='ourServices_card_container'>
                    <Link to = '/Welcome_Supplier' className='services card'>
                        <h4>Be a Supplier</h4>
                        <div className='card_img'>
                            <img src={supplier_card_image}/>
                        </div>
                    </Link>
                    <Link to = '/registerStore' className='services card'>
                        <h4>Register Store</h4>
                        <div className='card_img'>
                            <img src={store_card_Image}/>
                        </div>
                    </Link>
                    <Link to='/deliveryregistraion' className='card'>
                        <h4>Part time job</h4>
                        <div  className='delivery card_img'>
                            <Lottie animationData={deliveryPerson_Lottie}/>
                        </div>
                    </Link>
                    <img  className='card_container_Image' src={card_container_Image}/>
                </div>
                </div>
            </div>
            {/* <Footer/> */}
        </div> 
    )
}