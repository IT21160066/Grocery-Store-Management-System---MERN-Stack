import React from 'react';
import '../CSS/footer.css';
import footerLogo from '../images/logo.png';
import facebook from '../images/facebook.png';
import instagram from '../images/instagram.png';
import twitter from '../images/twitter.png';
import google from '../images/google.png';
// import visa from '../images/visa.png';


export default function Footer(){
    return(
        <div className='footer_container'>
            <div className='three_partition part1'>
                <img className='part1_img' src={footerLogo}/>
                <div className='part1_content'>
                    <p>Peiris Marketing Services Pvt Ltd.
                        No:269/A, Kandy Road, Colombo 2, Sri Lanka.
                    </p>
                    <i className="fa fa-phone">+947112345678</i>
                    <p>(Daily operating 24h)</p>
                </div>
            </div>
            <div className='three_partition part2'>
                <div className='links_box'>
                    <h5>Quick Links</h5>
                    <ul>
                        <li><a>Home</a></li>
                        <li><a>All Items</a></li>
                        <li><a>Our Services</a></li>
                    </ul>
                </div>
                <div className='links_box'>
                    <h5>Categories</h5>
                    <ul>
                        <li><a>Vegitables</a></li>
                        <li><a>Fruits</a></li>
                        <li><a>Grocery</a></li>
                    </ul>
                </div>
                <div className='links_box'>
                    <h5>Useful Links</h5>
                    <ul>
                        <li><a>Privacy Policy</a></li>
                        <li><a>FAQ</a></li>
                        <li><a>Terms & Conditions</a></li>
                        <li><a>Stores</a></li>
                        <li><a>Delivery grid</a></li>
                    </ul>
                </div>
                <div className='links_box'>
                    <h5>Customer Service</h5>
                    <ul>
                        <li><a>Contact Us</a></li>
                        <li><a>About Us</a></li>
                    </ul>
                </div>
            </div>
            <div className='three_partition part3'>
                <span>
                    <input className='feedBack_input'/>
                    <button> {`>`}</button>
                </span>
                <span>
                    <a href="#"><img className="media_icons" src={facebook}/></a>
                    <a href="#"><img className="media_icons" src={instagram}/></a>
                    <a href="#"><img className="media_icons" src={twitter}/></a>
                    <a href="#"><img className="media_icons" src={google}/></a>
                    {/* <a href="#"><img className="media_icons" src={visa}/></a> */}
                </span>
                

                <h5 className='copyRight'>Copyright © 2023 Peiris Marketing Services (Pvt) Ltd. All Rights Reserved</h5>
            </div>

        </div>
    )
}