import React from 'react';
import '../CSS/addItem.css';
import axios from "axios";
import add_item_default_img from '../images/add_item_default_img.png'
import {useNavigate} from 'react-router-dom';
import loadingAnimation from '../animations/loading_animation2.json'
import Lottie from "lottie-react";


export default function AddItem(){
    const navigate = useNavigate();
    
    const [uploadImage, setUploadImage] = React.useState('');
    

    // add item logic
    const [item,setItem] = React.useState({
        itemName : "",
        price: "",
        category :"",
        description : "",
        image : "",
        totalQuantity : 0
    });
    console.log(item)

    function onchange(e){
        setItem(prevData =>{
            const {name,value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }

    const handleFileUpload = async(e) =>{
        const file = e.target.files[0];
        const base64 = await convertToBase64(file)
        setItem({...item,image:base64})

    }

   
    function submit(e){
        e.preventDefault();
        axios.post("http://localhost:8071/item/add",item)
        .then(()=>{
             alert("item Added!");  
            // navigate('/dashboard/addItem')
            setItem({
                itemName : "",
                price: "",
                category :"",
                description : "",
                image : "",
                totalQuantity : ""
            })
        })
        .catch((err)=>{
            alert(err);
        })   
    }
    // end 
    
    function cancelCourse(){
        setItem({
            itemName : "",
            price: "",
            category :"",
            description : "",
            image : "",
            totalQuantity : ""
        })
      }
    return(
        <div className='add_item_container'>
           
            <div className='add_item_image'>
                {/* <img className='add_image_img' src= {addItemImage}/> */}
                <img className='add_image_img' src={item.image ||add_item_default_img}/>
            </div>
            <div className='add_item_form'>
                <form onSubmit={submit}>
                    <label htmlFor='itemName'>Item Name</label>
                    <input type = 'text' name='itemName' id='itemName' value={item["itemName"]} onChange ={onchange}/>

                    {/* <label htmlFor='category'>Item category</label>
                    <input type = 'text' name='category' id='category' value={item["category"]} onChange ={onchange}/> */}

                    <label htmlFor='category'>Item category</label>
                    <select name='category' value={item.category} onChange ={onchange} required>
                        <option value='' defaultValue hidden>Select Category</option>
                        <option value='vegitable'>Vegitable</option>
                        <option value='fruit'>Fruit</option>
                        <option value='grocery'>Grocery</option>
                        <option value='oil'>Oil</option>
                    </select>


                    

                    <label htmlFor='price'>Item price(100g / 1 pkt / 1 bottle)</label>
                    <input type = 'number' min={0} name='price' id='price' value={item["price"]} onChange ={onchange}/>

                    <label htmlFor='price'>Item description</label>
                    <textarea name='description' cols={54} rows = {5} value={item["description"]} onChange ={onchange}/>

                    <label htmlFor='image'>upload image</label>
                    <input type= 'file' name='image' id='image' accept=".jpeg, .png, .jpg"  onChange ={(e)=> handleFileUpload(e)}/>
                    
                    <div className='option_btns'>
                        <button type="submit" className='opbtn add' >Add Item</button>
                        <button type="button" className='opbtn cancel' onClick={() => navigate('/dashboard/itemList')}>Cancel</button>
                        <button type='reset' className='opbtn reset' onClick={cancelCourse}>reset</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )

    function convertToBase64(file){
        return new Promise((resolve,reject) =>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
        })
    }
}