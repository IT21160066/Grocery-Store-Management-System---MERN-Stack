import React from "react";
import '../CSS/orderReview.css';
import { Link, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import Lottie from "lottie-react";
import chk3 from '../animations/chk3.json'


export default function OrderReview(props){

    var total = window.location.search
    const urlParams = new URLSearchParams(total);
    const totalamount = urlParams.get('total')
    console.log(totalamount)
    const navigate = useNavigate();

    const [search1, setSearch1] = React.useState('');
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [storeID,setStoreID] = useState("")
    const [storeName, setStoreName] = React.useState([]);
    const [deliveryPersonName, setDeliveryPersonName] = useState("");
    const [addReq, setAddReq] = React.useState(false);
    const [customer,setCustomer] = React.useState({})

    console.log(search1.toLowerCase())
    console.log(storeName)

    const past = new Date('2023-01-01').toISOString().split('T')[0];
    const [minDate, setminDate] = useState(past);

    const today = new Date().toISOString().split('T')[0];
    const [maxDate, setMaxDate] = useState(today);


    function sendData(e){
        e.preventDefault();
        const newOrder = {
            name,
            phone,
            location,
            date,
            storeID,
            amount:totalamount,
            deliveryPersonName
        }
       
        axios.post("http://localhost:8071/order/add",newOrder).then(()=>{
            alert("order added successfully!")
            navigate('/AllGroceries')
        }).catch((err)=>{
            alert(err)
        })
    }

    React.useEffect(() =>{
        function fetchAllData(){
            axios.get('http://localhost:8071/store/')
            .then((res)=>{
                setStoreName(res.data)
                console.log(res.data)
            }).catch((err)=>{
                console.log(err);
            });
            if(sessionStorage.getItem('customer')){
                setCustomer(JSON.parse(sessionStorage.getItem('customer')))
            }
            
        }
        fetchAllData();
         },[addReq]);

    //get customer details


    return(
    <div className="reviewFullContainer">

        <div className="form_cus_container">
                    <div className="orderDetails_section">           

                        <div className="odheading">
                            <h6 id="odetails">Customer Details</h6>   
                        </div>     
                        <form id="rewForm" onSubmit={sendData}>
                    <table>
                        <tbody>
                   
                            <tr>
                                <td><label htmlFor="form-name">Name  </label></td>
                                <td><input type="text" name="name" className="form-name" required placeholder="Name" onChange={(e)=>{setName(e.target.value); }}></input><br/><br/></td>
                            </tr>

                             <tr>
                                <td><label htmlFor="form-phone">Phone  </label></td>
                                <td><input type="tel" id="phone" name="phone" pattern="[0-9]{10}" className="form-phone" required placeholder="Phone" onChange={(e)=>{setPhone(e.target.value); }}></input><br/><br/></td>
                            </tr>

                            <tr>
                                <td><label htmlFor="form-phone">City</label></td>
                                <td><input type="tel" id="phone" name="city" className="form-phone" required placeholder="Enter city" onChange={(e)=>{setSearch1(e.target.value); }}></input><br/><br/></td>
                            </tr>

                            <tr>
                                <td><label htmlFor="form-address">Address </label></td>
                                <td><textarea className="form-address" name="address" required rows= "2" cols="30" placeholder="Address" onChange={(e)=>{setLocation(e.target.value); }}></textarea><br/><br/> </td>  
                            </tr> 

                            <tr>
                            <td><label htmlFor="update">Select store: </label></td>
                            <td>
                                <select type="text" name="storeID" className="form-store" required  onChange={(e)=>{setStoreID(e.target.value)}} value={storeName.name}>
                                    <option hidden defaultValue >Select store</option>
                                    {
                                        storeName.filter((thing)=>{
                                            console.log(thing.city.toLowerCase())
                                            return search1.toLowerCase() == '' ?thing: thing.city.toLowerCase().includes(search1.toLowerCase());
                                        }).map((store)=>{
                                            return <option key={store._id} value={store.name}>{store.name}</option>
                                        })
                                    }

                                </select>
                            </td>
                        </tr>

                            <tr>
                                <td><label htmlFor="form-date">Delivery Date</label></td>
                                <td><input type="date" className="form-delivey" name="date" min={maxDate} max={maxDate} required onChange={(e)=>{setDate(e.target.value); }}></input><br/></td>
                            </tr>                          

                        </tbody>
                    </table>
                                <button type="submit" className="Proceed proceedbutton">Procced</button>
                                <button onClick={()=>navigate('/cartReview')} className="cancelRevw cRevw">Cancel</button>
                           
                        </form>
                    </div>            
                    
        </div>
        
        <div className="reciptreviewcontainer">
            <div className="detail_section">

                <div className="pyheading">
                    <h6 id="payment">Total Amount</h6>
                    <center><h4 id='totreview'>RS : {totalamount}</h4></center>
                    {/* <Lottie animationData={rev_inside}/> */}
                    <Lottie id="rwTick" animationData={chk3}/>
                </div>
     
            <div/>      
        </div>
    </div>    
        

    </div>

    )
}