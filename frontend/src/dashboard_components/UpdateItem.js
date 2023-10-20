import React from 'react';
import axios from 'axios';
import '../CSS/updateItem.css';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateItem(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [uploadImage, setUploadImage] = React.useState('');

    // const item = data.filter(data =>(  data.id == id));
    // console.log(item[0].title)

    // update item logic
    const [item,setItem] = React.useState({
        itemName : "",
        price: "",
        category :"",
        description : "",
        image :{
            url:''
        },
        totalQuantity : ""
    });
    

    function singleItem(e){
        setItem(prevData =>{
            const {name,value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }
    const ItemID = useParams();

    React.useEffect(() =>{
        function fetchData(){
            axios.get('http://localhost:8071/item/get/'+ItemID.id)
            .then((res)=>{
                setItem(res.data);      
            }).catch((err)=>{
                console.log(err);
            });
        }
        fetchData();
    },[]);

    function updateData(e){
        e.preventDefault();
        axios.put("http://localhost:8071/item/update/"+ItemID.id,item)
        .then(()=>{
            alert("Successfully updated!");
            navigate('/dashboard/ItemList');
        })
        .catch((err)=>{
            alert(err);
        })  
    }
    
    const handleFileUpload = async(e) =>{
        const file = e.target.files[0];
        const base64 = await convertToBase64(file)
        setItem({...item,image:{url:base64}})
        setUploadImage(base64)
    }

    console.log(item)

    return (
        <div className='update_container'>
            <div className='item_image'>
                <img src={uploadImage||item['image'].url} alt="product_img" className="update_img" />
            </div>
            <div className='Item_details_form'>
                <form onSubmit={updateData} className='update_data_form'>
                <label htmlFor='itemName'>Item Name</label>
                    <input type = 'text' name='itemName' id='itemName' value={item["itemName"]} onChange ={singleItem}/>

                    <label htmlFor='category'>Item category</label>
                    {/* <input type = 'text' name='category' id='category' value={item["category"]} onChange ={singleItem}/> */}


                    <select name='category' value={item["category"]} onChange ={singleItem} required>
                        <option value='' defaultValue hidden>Select Category</option>
                        <option value='vegitable'>Vegitable</option>
                        <option value='fruit'>Fruit</option>
                        <option value='grocery'>Grocery</option>
                        <option value='oil'>Oil</option>
                    </select>

                    <label htmlFor='price'>Item price</label>
                    <input type = 'text' name='price' id='price' value={item["price"]} onChange ={singleItem}/>

                    <label htmlFor='price'>Item description</label>
                    <textarea name='description' cols={5} rows = {3} value={item["description"]} onChange ={singleItem}/>

                    <label htmlFor='image'>upload image</label>
                    <input type= 'file' name='image' id='image' accept=".jpeg, .png, .jpg"  onChange ={(e)=> handleFileUpload(e)}/>
                    
                    <button type="button" className ="item_goback" onClick={()=>navigate('/dashboard/itemList')}>Go Back</button>
                    <button type="submit" className ="item_save_updates">Save</button>
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