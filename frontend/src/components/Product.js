import React from 'react';
import '../CSS/product.css';
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Product(props){
    const {image,itemName,price,_id} = props.data;
    //console.log(props);

    function addtoCartBtn(){
        // console.log(e.target.parentElement.parentElement.children[0].id)
        // console.log(e.target.parentElement.children[0].id)
        
        // var cartItemNew= {
        //     itemID:e.target.parentElement.parentElement.parentElement.id,
        //     itemImage:e.target.parentElement.parentElement.parentElement.children[0].id,
        //     itemName:e.target.parentElement.parentElement.children[0].id,
        //     itemPrice:e.target.parentElement.children[0].id,
        //     itemCount:1
        // }
        
      

        var cartItemNew= {
                itemID:_id,
                itemImage:image,
                itemName:itemName,
                itemPrice:price,
                itemCount:1
            }

        if (sessionStorage.getItem("cartItems") == null) {
            var cartItems = []
            cartItems.push(cartItemNew);
            sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
            toast.success('Item Added!',{
                autoClose:2000,
                position: "top-center",
            })
        }else{
            var localItems = []
            localItems = JSON.parse(sessionStorage.getItem("cartItems")); 

            let checkedItems = localItems.filter(item => {
                if(item.itemID != _id){
                    return item;
                }
            })

            // const object = cartItems.filter((ob)=>{
            //     return ob.itemID == e.target.parentElement.parentElement.parentElement.id;
            // })
            // const object = cartItems.map((ob)=>{
            //         if(ob.itemID == e.target.parentElement.parentElement.parentElement.id){
            //             ob.itemCount = ob.itemCount+1;
            //         }else{
                checkedItems.push(cartItemNew)
            //         }
            //     })
            // console.log(object[0])
            // cartItems.push(cartItem);
            sessionStorage.setItem("cartItems", JSON.stringify(checkedItems));
            toast.success('Item Added!',{
                autoClose:2000,
                position: "top-center",
            })
            
        }
        

        // console.log(cartItem)

        
    }
    
    return(
            <div className="product__card" id={_id}>
                 <ToastContainer  /> 
                <div className="product__img" id={image}>
                    <img src={image.url} alt="product-img" className="img" />
                </div>
                <div className="product__content">
                    <Link className='product__tilte' to={`/foods/${_id}`} id={itemName}>{itemName}</Link>
                    {/* <div className="product_options"> */}
                        <div className="product__price" id={price}>Rs{price}.00</div>
                        <button className="addTOCart__btn" onClick={addtoCartBtn}>Add to Cart</button>
                    {/* </div> */}
                </div>
            </div>
    )
}