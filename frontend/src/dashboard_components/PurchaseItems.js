import React ,{useEffect}from "react";
import '../CSS/PurchaseItems.css'
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import add_item_default_img from '../images/add_item_default_img.png'


export default function PurchaseItems(){
    const [item,setItem] =React.useState({
        supplierItemPic:{
            url:''
        }
    })
    const [supplier,setSupplier] = React.useState({
        supplierItemPic:{url:''}
    })
    const supplierID = item.supplierID

    console.log(item)


    useEffect(()=>{
            axios.get('http://localhost:8071/SupplierItem/get/'+id)
            .then((res)=>{
                setItem(res.data)
                
            }).catch((err)=>{
                console.log(err);
            });   
        },[])

       React.useEffect(()=>{
        axios.get(`http://localhost:8071/suppliers/get/${supplierID}`)
        .then((res)=>{
            setSupplier(res.data)
          
        }).catch((err)=>{
            console.log(err);
        });
       },[item])

    // get current date
    const [date, setDate] = React.useState(new Date().toJSON().slice(0, 10))

    const navigate = useNavigate();
    const {id} = useParams();
    

    
    const [purchase, setPurchase] = React.useState({
        Itemname:'',
        personal_name:'',
        quantity:'',
        Date:"",
        Price_of_one_pieces:'',
        scale_category:""
    })


   
    

    function onchange(e){
        setPurchase(prevData =>{
            const {name,value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }


    
    

    const newPurchase = {
        Itemname:item.Itemname,
        personal_name:supplier.personal_name,
        quantity:purchase.quantity,
        Date:date,
        Price_of_one_pieces:item.Price_of_one_pieces,
        // scale_category:"",
        total_amount:item.Price_of_one_pieces*purchase.quantity,
        supplierID:item.supplierID
    }

  
    console.log(newPurchase)

    function handleSubmit(event){
        event.preventDefault()
        axios.post('http://localhost:8071/purchaseItems/add',newPurchase)
        .then(() => {

            alert("successful")
            // alert({
            //     position: 'top-end',
            //     icon: 'success',
            //     title: 'Your work has been saved',
            //     showConfirmButton: false,
            //     timer: 1500
            //   })
            navigate('/dashboard/PurchaseItemView')
            setItem({
              
                personal_name:" ",
                Itemname:" ",
                Price_of_one_pieces:" ",
                quantity:" ",
                Date:" ",
                scale_category:" ",
                total_amount:" "

              
            })
        })
        .catch((err) =>{ alert(err);
        })
    }

    

    

    return(
        <div className='Buy_Items_container'>
            <div className="Buy_Item_image">
                <img  alt="product_img" className="Buy_img" src={item.supplierItemPic['url']} />
            </div>
            <div className='Buy_Items_form'>
                <form className='Buy_form' onSubmit={handleSubmit}>

                   <label htmlFor='fullname'>Supplier Name:</label>
                    <input type= 'text' name='personal_name' value={supplier.personal_name} onChange={onchange} />

                    <label htmlFor='fullname'>Item Name:</label>
                    <input type= 'text' name='Itemname' value={item.Itemname} onChange={onchange} />

                    <label htmlFor='no'>Price of one pieces</label>
                    <input type= 'text' name='Price_of_one_pieces' value={item.Price_of_one_pieces} onChange={onchange} />

                      <label htmlFor='Require_quantiy'>Required Quantity</label>
                      <input type='number' name='quantity' max={item.stock} required onChange={onchange} placeholder={`Available stock ${item.stock}kg`}></input>

                      <label htmlFor="total">Total Amount</label>
                      <input type="text" name="total_amount" value={newPurchase.total_amount}></input>
                  
                    <button type="submit" className ="item_buy" onClick={handleSubmit}>Buy Item</button> 
                    <button type="button" className ="sup_item_goback" onClick={()=>navigate(`/dashboard/Supplier_ItemsPurchase/${supplierID}`)}>Go Back</button>
                
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
