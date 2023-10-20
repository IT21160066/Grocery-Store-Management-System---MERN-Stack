import React from "react";
import '../CSS/welcome_supplier.css'
import welcomeSupplier from '../images/welcomeSupplier.png'
import { Link } from "react-router-dom";

export default function Welcome_Supplier(){
    return(
        <div className="main_container">
            <div className="image_container">
              <h1>Welcome Supplier!</h1>
              <img  src= {welcomeSupplier} className = 'welcome_img'/>
           </div>

             <div className="button_container">
               <h5>Decent cost for your excellent <br />    products from us.</h5>

                 <div className="text_first">
                 <h3>No more intermediaries.</h3>
                 </div>
                
                 <h3>Join hands with us.</h3>
                 <Link to = '/SupplierRegister' className=''>
                 <div className="button_first">
                 <button>Register Here</button>
                 </div>
                 </Link>
                 
                 <Link to={'/SupLogin'}>
                 <div className="button_second">
                 <button>Login</button>
                 </div>
                 </Link>

                
             </div>
        </div>
       

    

    )
}