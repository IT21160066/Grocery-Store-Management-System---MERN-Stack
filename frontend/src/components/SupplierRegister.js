import React, { useState } from 'react';
import '../CSS/SupplierRegister.css'
import store_page_image from '../images/store_page_img.png';
import { Link,useNavigate } from "react-router-dom";
import {BiImageAdd} from 'react-icons/bi'
import axios from 'axios';


// import store_succes_animation from '../animations/store_succes_animation.json';
// import Lottie from 'lottie-react';

export default function SupplierRegister(){

    const [post,setPost] = useState({
        supplier_type:' ',
        manufacturing:" ",
        product_type:" ",
        product_attribute:" ",
        company_name:" ",
        company_address:" ",
        email:" ",
        contact_number:" ",
        password:" ",
        re_password:" ",
        personal_name:" ",
        personal_address:" ",
        supplierPic:''
    })

    const handleFileUpload = async(e) =>{
        const file = e.target.files[0];
        const base64 = await convertToBase64(file)
        setPost({...post,supplierPic:base64})
    }

    const navigate = useNavigate();
    console.log(post)
    // const handlInput = (event) =>{
    //     setPost({...post,[event.target.name]: event.target.value})
    // }
    
    function handleSubmit(event){
        event.preventDefault()
        console.log(post)
        axios.post('http://localhost:8071/suppliers/add',post)
        .then(() => {
            alert("supplier Added")
            navigate('/SupLogin')
            setPost({
                supplier_type:' ',
                manufacturing:" ",
                product_type:" ",
                product_attribute:" ",
                company_name:" ",
                company_address:" ",
                email:" ",
                contact_number:" ",
                password:" ",
                re_password:" ",
                personal_name:" ",
                personal_address:" ",
                supplierPic:''
            })
        })
        .catch((err) =>{ alert(err);
        })
        

    }

    function onchange(e){
        setPost(prevData =>{
            const {name,value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }


    return(
        <div className='Supplier_registration_container'>
            <div className='Supplier_registration_textAndImage'>
                <h1><i>Do you want to expand <br></br>your customer base?</i></h1>
                <p>You can connect with more customers using our platform, which offers you the adaptability, visibility, and customer insights you need.
                </p>
                <h4>Join us as a partner today.</h4>
                <img  src= {store_page_image} className = 'store_page_img'/>
               
            </div>
            <div className='registration_form'>
                <form className='reg_form' onSubmit={handleSubmit} action='POST'>
                    <h2>Supplier Register</h2>
                    <div className='profile_pic'>

                        <input id="image" type="file" name="supplierPic" placeholder="Photo" accept=".jpeg, .png, .jpg" onChange ={(e)=> handleFileUpload(e)} capture/>
                        
                         <img className='prof_img' src={post.supplierPic}/>  
                       
                    </div>
                                                          
                    <div className='supplier_details_container'>

                          <div className='supplier_type_container'>
                             <label htmlFor='Supplier_type'>Supplier Type</label>
                              <select name='supplier_type' id='supplier_type' onChange={onchange}>
                                 <option value=''>please Select</option>
                                 <option value='local'>Local</option>
                                 <option>Foreign</option>
                             </select>
                         </div>

                                  <div className='supplier_type_container'>
                            <label htmlFor='manufacturing'>Product Manufacturing</label>
                            <select name='manufacturing'  onChange={onchange}>
                                <option>please Select</option>
                                <option value='local'>Local</option>
                                <option>Imported</option>
                            </select>
                            </div>
                    </div>
                    <div className='supplier_details_container'>

                         <div className='supplier_type_container'>
                             <label htmlFor='product_type'>Produt Type</label>
                              <select name='product_type'  onChange={onchange}>
                                 <option>please Select</option>
                                 <option value='fresh'>Fresh</option>
                                 <option>Grocery</option>
                                 <option>Non-Food</option>
                             </select>
                         </div>

                         <div className='supplier_type_container'>
                             <label htmlFor='product_Attribute'>Product Attribute</label>
                              <select name='product_attribute' onChange={onchange}>
                                 <option >please Select</option>
                                 <option value='frozen'>Frozen</option>
                                 <option>Non-Frozen</option>
                                 
                             </select>
                         </div>


                    </div>

                    <div className='lables_inputs'>
                        <div className='label_input_container'>
                            <label htmlFor='company_name'>company name</label>
                            <input type= 'text' name='company_name'  onChange={onchange}/>
                        </div>
                        <div className='label_input_container'>
                            <label htmlFor='stock'>Company Address</label>
                            <input type= 'text' name='company_address' onChange={onchange}/><br/>
                        </div>
                    </div>
                    <div className='lables_inputs' name ="date">
                        <div className='label_input_container'>
                            <label htmlFor='date'>Personal Name</label>
                            <input type= 'text' name='personal_name'  onChange={onchange} required/>
                        </div>
                        <div className='label_input_container'>
                            <label htmlFor='date'>Personal Addres</label>
                            <input type= 'text' name='personal_address' onChange={onchange} required/>
                        </div>
                    </div> 

                    <div className='lables_inputs'>
                        <div className='label_input_container'>
                            <label htmlFor='no'>Email</label>
                            <input type= 'email' name='email'  onChange={onchange} />
                        </div>
                        <div className='label_input_container'>
                            <label htmlFor='stock'>Contact Number</label>
                            <input type= 'tel' name='contact_number' pattern="[0-9]{10}"  onChange={onchange} /><br/>
                        </div>
                    </div>
                    <div className='lables_inputs' name ="date">
                        <div className='label_input_container'>
                            <label htmlFor='date'>Password</label>
                            <input type= 'password' name='password'  onChange={onchange} required/>
                        </div>
                        <div className='label_input_container'>
                            <label htmlFor='date'>Re-EnterPassword</label>
                            <input type= 'password' name='re_password' id='re_password' onChange={onchange} required/>
                        </div>
                    </div> 
                    
                    
                    <div className='button_container'>
                     <button type='submit'>Submit</button>
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