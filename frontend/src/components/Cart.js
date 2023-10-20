import React from 'react';
import '../CSS/cart.css';
import closebtn from '../images/close.png'
import { useNavigate } from "react-router-dom";

export default function Cart(props){

    const navigate = useNavigate();
    const [cart, setCart] = React.useState([]);
    const [totalAmount, setTotalAmount] = React.useState(0);


    console.log(cart)
    const calculateTotalAmount = () => {
        const amount = cart.reduce((total, item) => {
          return total + (item.itemCount * item.itemPrice);
        }, 0);
      
        setTotalAmount(amount);
      };
      
      React.useEffect(() => {
        calculateTotalAmount();
      }, [cart, totalAmount]);
      
      
    var order = {
        amount: '',
        date:'',
        ownerId:'',
        deliveryPersonId:'',
        location:'',
        items:cart
    }

    React.useEffect(() =>{
        function fetchAllData(){
            if(sessionStorage.getItem("cartItems")){
                setCart(JSON.parse(sessionStorage.getItem("cartItems")))
            }
            
            //console.log(JSON.parse(sessionStorage.getItem("cartItems")))
        }
        fetchAllData();
    },[]);


    const incrementQuantity = (itemId) => {
        const updatedCartItems = cart.map(item => {
          if (item.itemID === itemId) {
            return { ...item, itemCount: item.itemCount + 1 };
          } else {
            return item;
          }
        });
        setCart(updatedCartItems);
        sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      }

      const decremetQuantity = (itemId) => {
        const updatedCartItems = cart.map(item => {
          if (item.itemID === itemId) {
            if(item.itemCount == 0){
                return { ...item, itemCount: item.itemCount};
            }else{
                return { ...item, itemCount: item.itemCount - 1 };
            }
           
          } else {
            return item;
          }
        });
        setCart(updatedCartItems);
        sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      }

      const handleRemoveItem = (id) => {
        const updatedCartItems = cart.filter((item) =>{
          if(item.itemID != id){
            return item;
          }
        });
      
        setCart(updatedCartItems);
        sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      };
      

    

    return(
        <div className='cart_container'>
          <div className='item_list'>
            {cart.length == 0 ? <h3>cart is empty</h3>:
                
                    cart.map((thing)=>{
            
                        return <div className='cart_card' key={thing.itemID}>
                            <img src = {thing.itemImage.url} className='cart_image'/>
    
                                {/* <input type='number' defaultValue={1} onChange={function(e){setQuantity(e,thing.itemID)}}/> */}
                                <div className='quantity'>
                                    <button onClick={() => decremetQuantity(thing.itemID)}>-</button>
                                    <span>{thing.itemCount}</span>
                                    <button onClick={() => incrementQuantity(thing.itemID)}>+</button>
                                </div>                                
                                
                            <h3>{thing.itemName}</h3>
                            <h3>Rs.{thing.itemPrice}</h3>
                            
                            <span className='close_btn' onClick={() => handleRemoveItem(thing.itemID)}><img src={closebtn}/></span>
                        </div>
                    })
                
            }

          </div>
            <div className='cart_details'>
              <table>
                <tbody>
                  <tr>
                    <td><h3>Total Amount:</h3></td>
                    <td>RS {totalAmount}</td>
                  </tr>
                </tbody>
              </table>
            {/* <h2 id='tot'>Total Amount : RS {totalAmount}</h2> */}

              <center>
                  <button className='reviewButton rwbtn' onClick={()=>navigate('/cartReview')}>Proceed to Review</button>
              </center>
            </div>
        </div>
    )
}