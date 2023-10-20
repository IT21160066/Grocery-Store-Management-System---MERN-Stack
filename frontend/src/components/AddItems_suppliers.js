import React, { useState } from 'react';
import '../CSS/AddItems_suppliers.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom'; 
import add_item_default_img from '../images/add_item_default_img.png'
// import { post } from '../../../backend/routes/suppliers.route';

// import store_succes_animation from '../animations/store_succes_animation.json';
// import Lottie from 'lottie-react';



export default function AddItems_suppliers(){
    // const [profilepic, setProfilepic] = React.useState({
    //     image:''
    // })
    // console.log(profilepic)
    const navigate = useNavigate();
    const {id} = useParams();

    const [supplier, setSupplier] = React.useState({
        _id:''
    })

    React.useEffect(()=>{
        setSupplier(JSON.parse(sessionStorage.getItem('supplier')))
    },[])

    const [item,setItem] = useState({
        Itemname:" ",
        Price_of_one_pieces:0,
        stock:0,
        supplierItemPic:" ",
        supplierID:supplier._id
    })


    var newItem = {
        Itemname:item.Itemname,
        Price_of_one_pieces:item.Price_of_one_pieces,
        stock:item.stock,
        supplierItemPic:item.supplierItemPic,
        supplierID:supplier._id,
    }
    console.log(newItem)

    function handleItemSubmit(event){
        event.preventDefault()
        console.log(item)
        axios.post('http://localhost:8071/supplierItem/add',newItem)
        .then(()=>{
            alert("item Added")
            navigate('/Supplier_items')
        })
        
        .catch(err=>alert(err))
    }

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
        setItem({...item,supplierItemPic:base64})

    }

    return(
        <div className='Add_Items_container'>
            
            <div className='Add_Items_form'>
                <form className='Add_form' onSubmit={handleItemSubmit} action='POST'>
                    <h1>Add Items</h1>

                    <div className='profile_pic'>
                        <input id="image" type="file" name="profile_photo" placeholder="Photo" accept=".jpeg, .png, .jpg" onChange ={(e)=> handleFileUpload(e)} capture/>
                        <img className='prof_img' src={item.supplierItemPic}/>   
                    </div>
                    {/* <div className='add_item_image'> */}
                    {/* <img className='add_image_img' src= {addItemImage}/> */}
                        {/* <img className='add_image_img' src={item.image ||add_item_default_img}/>
                    </div> */}

                    <label htmlFor='fullname'>Item Name:</label>
                    <input type= 'text' name='Itemname' onChange={onchange} required/>

                    <label htmlFor='image' onSubmit={handleFileUpload}>Item Image:</label>
                    <input id='image' type= 'file' name='supplierItemPic' accept=".jpeg, .png, .jpg" onChange ={(e)=> handleFileUpload(e)}  />
                    
                    <div className='lables_inputs' name ='price_stock'>
                        <div className='label_input_container'>
                            <label htmlFor='no'>Price of one pieces</label>
                            <input type= "text" name='Price_of_one_pieces'onChange={onchange} required/>
                        </div>
                        <div className='label_input_container'>
                            <label htmlFor='stock'>Available stock:</label>
                            <input type= 'text' name='stock' onChange={onchange} required/><br/>
                        </div>
                    </div>
                    {/* <div className='lables_inputs' name ="date">
                        <div className='label_input_container'>
                            <label htmlFor='date'>Manufacturing date</label>
                            <input type= 'text' name='date'/>
                        </div>
                        <div className='label_input_container'>
                            <label htmlFor='date'>Expire Date</label>
                            <input type= 'text' name='date'/>
                        </div>
                    </div>  */}
                    
                  
                    <div className='button_container'>
                     <button type='submit'>Add Items</button>
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