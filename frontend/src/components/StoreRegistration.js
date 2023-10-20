import React from 'react';
import '../CSS/storeRegistration.css'
import store_page_image from '../images/store_page_img.png';
import store_succes_animation from '../animations/store_succes_animation.json';
import Lottie from 'lottie-react';
import { Link , useNavigate } from 'react-router-dom';
import scrollDown from '../animations/greenArrow_down.json'
import axios from "axios";

export default function StoreRegistration(){
    const navigate = useNavigate();
    const [profilepic, setProfilepic] = React.useState({
        image:''
    })
    const [store, setStore] = React.useState({
        image:'',
        name: '',
        nic:'',
        phoneNo:'',
        addressNo:'',
        street:'',
        city:'',
        postalCode:'', 
        email:'',
        userName:'',
        password:'',
    })
    console.log(store)

    function onchange(e){
        setStore(prevData =>{
            const {name,value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }

    function submit(e){
        e.preventDefault();
        axios.post("http://localhost:8071/store/add",store)
        .then(()=>{
            alert("Successfully Registered");  
            navigate('/storeLogin')
            setStore({
                image:'',
                name: '',
                nic:'',
                phoneNo:'',
                addressNo:'',
                street:'',
                city:'',
                postalCode:'', 
                email:'',
                userName:'',
                password:'',
            })
        })
        .catch((err)=>{
            alert(err);
        })   
    }

    React.useEffect(()=>{
        var animation = document.getElementById('animate');
        animation.style.height = '30px'       
    },[])


    const handleFileUpload = async(e) =>{
        const file = e.target.files[0];
        const base64 = await convertToBase64(file)
        setStore({...store,image:base64})
    }
    return(
        <div className='store_welcomepage'>
        <div className='store_welcome_content'>
            <div className='store_welcome_img'>
                <img className='str_welcome_img' src={store_page_image}/>
            </div>
            <div className='store_welcome_texts animate__animated animate__bounceInRight'>
            <h1><i>Do you want to expand <br></br>your customer base?</i></h1>
                <p>You can connect with more customers using our platform, which offers you the adaptability, visibility, and customer insights you need.
                </p>
                <h4>Join us as a partner today.</h4>
                
                <div className='scroll_animation'>
                    <Lottie id="animate" animationData={scrollDown}/>
                    <a href='#regForm' className='registerBtn'>Register</a>
                </div>
                <Link to='/storelogin' className='login_link'>Already have an account ? Login</Link>
            </div>
        </div>
        {/* hidden */}
        <div className='store_reg_form slide' id='regForm'>
            <form className='reg_from' onSubmit={submit}>
                <div className='input_block'>
                    <label htmlFor='fullname'>Owner Full Name:</label>
                    <input type= 'text' name='name'  value={store["name"]} onChange ={onchange} required/>
                </div >
                <div className='input_block'>
                    
                    <label htmlFor='NIC'>NIC No:</label>
                    <input type= 'text' name='nic' pattern="([0-9]{9}[v-V]{1})|([0-9]{12})" value={store["nic"]} onChange ={onchange} required/>
                </div>
                <div className='input_block'>
                    <label htmlFor='phoneNo'>Contact No:</label>
                    <input type="tel" id="phone" pattern="[0-9]{10}" name = 'phoneNo'value={store["phoneNo"]} onChange ={onchange} required/>
                </div>
                <div className='input_block'>
                    <label htmlFor='address_inputs'>Store Address</label>

                    <div className='address_inputs' name ="address_inputs">
                        <div className='input_block'>
                            <label htmlFor='no'>No:</label>
                            <input type= 'number' name='addressNo'value={store["addressNo"]} onChange ={onchange} required/>
                        </div>
                        <div className='input_block'>
                            <label htmlFor='street'>Street Address:</label>
                            <input type= 'text' name='street'value={store["street"]} onChange ={onchange} required/>
                        </div>
                        <div className='input_block'>
                            <label htmlFor='city'>City:</label>
                            <input type='text' name = 'city'value={store["city"]} onChange ={onchange} required/>
                        </div>
                        <div className='input_block'>
                            <label htmlFor='postalCode'>Postal Code:</label>
                            <input type='text' name = 'postalCode'value={store["postalCode"]} onChange ={onchange} required/>
                        </div>    
                    </div>
                </div>
                <div className='input_block'>
                    <label htmlFor='email'>E-mail Address:</label>
                    <input type='email' name = 'email' placeholder='Enter your email address..'value={store["email"]} onChange ={onchange} required/>
                </div>                         
                
                <div className='input_block'>
                    <label htmlFor='image'>Profile photo:</label>
                    <input  type="file" name="image" placeholder="Photo" accept=".jpeg, .png, .jpg" onChange ={(e)=> handleFileUpload(e)} capture required/>
                </div>
                <div className='input_block'>
                    <label htmlFor='username'>Username:</label>
                    <input type= 'text' name='userName' value={store["userName"]} onChange ={onchange} required/>
                </div>
                <div className='input_block'>
                    <label htmlFor='password'>Password:</label>
                    <input type= 'text' name='password'value={store["password"]} onChange ={onchange} required/>   
                </div>
                <div className='input_block'>
                    <label htmlFor='reEnterpass'>Re-enter Password:</label>
                    <input type='text' name = 'reEnterpass'required/>  
                </div>

                <input type='submit' className='registerBtn' value="Register"/>
                
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