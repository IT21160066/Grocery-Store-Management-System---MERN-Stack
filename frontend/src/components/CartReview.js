import React from 'react';
import '../CSS/cartReview.css'
import { useNavigate } from "react-router-dom";

import Lottie from "lottie-react";
import sh_cartt from '../animations/sh_cartt.json'
// import shpbag from '../animations/shpbag.json
// import Lottie from "lottie-react";

// import sh_cartt from '../animations/sh_cartt.json'
// import shpbag from '../animations/shpbag.json'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cart(props){

    const navigate = useNavigate();

    const [cart, setCart] = React.useState([]);

    // const [deletebtn, setdeletebtn] = React.useState(false);

    // var count = 0;
    // cart.forEach(item=>{
    //     count = count + 1;
    // })
    
    var total1 = 0;

    var order = {
        amount: '',
        date:'',
        ownerId:'',
        deliveryPersonId:'',
        location:'',
        items: cart
    }
    console.log(order);

    React.useEffect(() =>{
        function fetchAllData(){
            setCart(JSON.parse(sessionStorage.getItem("cartItems")))
            //console.log(JSON.parse(localStorage.getItem("cartItems")))
        }
        fetchAllData();
    },[]);

    // cart.map((ob)=>{
    //     total1 = total1 + ob.itemPrice;
    // })

    function setQuantity(e,id){
        // console.log(e.target+'/'+id);
        // const ob = cart.map((ob)=> {
        //     return ob.itemID==id?ob:null;
        // })
        const ob = cart.filter((ob)=>{
            return ob.itemID == id;
        })

        
        //  ob[0].itemPrice.valueOf()*e.target.value
        // setTotal((prev)=> prev+ob[0].itemPrice.valueOf()*e.target.value)
        // console.log(total);
        // if(){

        // }else if(){
            
        // }
    }


    console.log(cart)
    
    function proceedToCheckOut(){
        if(sessionStorage.getItem('customer')){
            navigate(`/orderReview?total=${total1}`)
        }else{
            toast.info('Loging  required', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                })
        }
    }
    

    return(
    <div className='full_container'>
        <ToastContainer  /> 
        {/* <div>      
            <Lottie id='cart_anm2' animationData={sh_cartt}/>
        </div> */}

        <div className='cart_container'>

            
            <table id='cart_table'>
                <thead>
                    <tr>
                        <td>Product</td>
                        <td>Product Name</td>
                        <td>Price</td>
                        <td>Qty</td>
                    </tr>
                </thead>
                <tbody id='tbody_cartReview'>

                    {cart&&cart.map((request)=>
                        <tr key = {request.itemID} >
                            <td className='cart_image'><img id='cartImages' src={request.itemImage.url}/> </td>
                            <td className='cart_name'>{request.itemName}</td>
                            <td className='cart_name'>{request.itemPrice}</td>
                            <td className='cart_qty'>{request.itemCount}</td>
                            {/* <td className='table_data'>{request.requestDate}</td> */}
                        </tr> )}
                </tbody>

            </table>
            <div className="recipt_container">
                                    
            <table>
                <tbody>
                    <tr>
                        <td>Sub Total </td>
                        {/* <td>RS: {total1}</td> */}
                        <td>Rs{cart == null? 0:
                                cart.map((ob)=>{
                                total1 = total1 + ob.itemPrice*ob.itemCount;
                            })}{total1}</td>
                    </tr>

                    <tr>
                        <td>Discounts </td>
                        <td>RS: 0.00</td>
                    </tr>

                    <tr>
                        <td>Delivery Charges</td>
                        <td>RS: 0.00</td>
                    </tr>
                    
                    <tr>
                        <td>Item count </td>
                        {/* <td>{count}</td> */}
                        <td>{cart&&cart.length}</td>
                    </tr>
                
                    <tr>
                        <td>Total </td>
                        <td>RS: {total1}</td>
                    </tr>    
                </tbody>                   
            </table>                         
            <div className="buttonProceed">
                <center>
                    <button onClick={proceedToCheckOut} className="cart-button procCartbuttn">Procced to Checkout</button>
                </center>
            </div>
        </div>
        </div>    
    </div>
    )
}