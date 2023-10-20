import React, { useState } from 'react';
import '../CSS/UpdateItems_suppliers.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateItems_suppliers(){
    // const [profilepic, setProfilepic] = React.useState({
    //     image:''
    // })
    // console.log(profilepic)
    const [uploadImage, setUploadImage] = React.useState('');
    
    
    const navigate = useNavigate();
    const {id} = useParams();
    console.log(id);

    const [item,setItem] =React.useState({
        Itemname:" ",
        Price_of_one_pieces:" ",
        stock:" ",
        supplierItemPic:{
            url:''
        }
    })

    console.log(item)

   React.useEffect(()=>{
    function fetchAllData(){
        axios.get('http://localhost:8071/SupplierItem/get/'+id)
        .then((res)=>{
            setItem(res.data)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err);
        });   


    }
    fetchAllData();
   },[])

    // function handleItemSubmit(event){
    //     event.preventDefault()
    //     console.log(item)
    //     axios.post('http://localhost:8071/supplierItem/add',item)
    //     .then(()=>alert("item Added"))
    //     .catch(err=>alert(err))
    // }

    const [edit, setEdit] = React.useState(false)

      


    function onchange(e){
        setItem(prevData =>{
            const {name,value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }

    function updateSupplierData(e){
        e.preventDefault();
        
        axios.put('http://localhost:8071/SupplierItem/update/'+id,item)
        .then((res)=>{
            alert('update success')
            navigate('/Supplier_items')
        }).catch((err)=>{
            console.log(err)
        });
    }

    const handleFileUpload = async(e) =>{
        const file = e.target.files[0];
        const base64 = await convertToBase64(file)
        // setProfilepic({...profilepic,image:base64})
        setItem({...item,supplierItemPic:{url:base64}})
        setUploadImage(base64)
    }



    // return(
//         <div className='Add_Items_container'>
//             <div className='Add_Items_form'>
//                 <form className='Add_form' onSubmit={updateSupplierData}>
//                     <h1>Update Item</h1>
//                     <label htmlFor='fullname'>Item Name:</label>
//                     <input type= 'text' name='Itemname' value={item.Itemname} onChange={onchange}/>

                    // <label htmlFor='image' >Item Image:</label>
                    // <input type= 'file' name='supplierItemPic' onChange={handleFileUpload}/>
                    
                    // <div className='lables_inputs' name ='price_stock'>
                    //     <div className='label_input_container'>
                    //         <label htmlFor='no'>Price of one pieces</label>
                    //         <input type= 'text' name='Price_of_one_pieces' value={item.Price_of_one_pieces} onChange={onchange}/>
                    //     </div>
                    //     <div className='label_input_container'>
                    //         <label htmlFor='stock'>Available stock:</label>
                    //         <input type= 'text' name='stock' value={item.stock} onChange={onchange}/><br/>
                    //     </div>
                    // </div>
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
                    
                   
    //                 <div className='button_container'>
    //                  <button className='updatebutton_container' type='submit'>Update</button>
    //                  </div>
                    


    //             </form>
               
    //         </div>
    //     </div>
    // )
    return(
        <div className='Add_Items_container'>
             <div className="Buy_Item_image">
                <img  alt="product_img" className="Buy_img" src={item.supplierItemPic['url']} />
            </div>
            <div className='Add_Itemsupdate_form'>
                <form className='Addupdateitem_form' onSubmit={updateSupplierData}>
                    <h1>Update Item</h1>
                    <label htmlFor='fullname'>Item Name:</label>
                    <input type= 'text' name='Itemname' value={item.Itemname} onChange={onchange}/>

                    <label htmlFor='image' >Item Image:</label>
                    <input type= 'file' name='supplierItemPic' onChange={handleFileUpload}/> 

                    <label htmlFor='no'>Price of one pieces</label>
                    <input type= 'text' name='Price_of_one_pieces' value={item.Price_of_one_pieces} onChange={onchange}/>

                    <label htmlFor='stock'>Available stock:</label>
                    <input type= 'text' name='stock' value={item.stock} onChange={onchange}/><br/> 
                          
                    <button className='updatebutton_container' type='submit'>Update</button>
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
