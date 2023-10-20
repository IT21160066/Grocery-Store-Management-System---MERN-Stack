import React from 'react'
import axios from 'axios';
import '../CSS/addsales.css'

export default function AddSales(){

    const [date, setDate] = React.useState(new Date().toJSON().slice(0, 10))
    // AddSales logic
    // let currentDate = ;

    const [sale,setSale] = React.useState({
        itemname : "",
        supplierId: "",
        saleDate :date,
        description : "",
        quantity : "",
        amount : ""
    });

    // console.log(sale)

    function onchange(e){
        setSale(prevData =>{
            const {name,value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }

    function submit(e){
        e.preventDefault();
        axios.post("http://localhost:8071/sale/add",sale)
        .then(()=>{
             alert("item Added!");  
            // navigate('/dashboard/addItem')
            setSale({
                itemname : "",
                supplierId: "",
                saleDate :"",
                description : "",
                quantity : "",
                amount : ""
            })
        })
        .catch((err)=>{
            alert(err);
        })   
    }

    // end

    return(
        <div className='addSales_Container'>
            <form className='addSales_form' onSubmit={submit}>
                <label>Item Name:</label>
                <input type='text' name='itemname' placeholder='Enter item id...' value={sale['itemId']} onChange={onchange}/>

                <label>Supplier ID:</label>
                <input type='text' name='supplierId' placeholder='Enter supplier id...' value={sale['supplierId']} onChange={onchange}/>
                
                {/* <label>Date:</label>
                <input type='date' name='saleDate' value={sale['saleDate']} onChange={onchange}/> */}

                <label>Quantity:</label>
                <input type='text' name='quantity' placeholder='Enter quantity...' value={sale['quantity']} onChange={onchange}/>

                <label>Description:</label>
                <input type='text' name='description' placeholder='Enter desription...' value={sale['description']} onChange={onchange}/>

                <label>Amount:</label>
                <input type='text' name='amount' placeholder='Enter amount...' value={sale['amount']} onChange={onchange}/>

                <button className='addSale' type='submit'>Add Sale</button>
            </form>
        </div>
    )
}