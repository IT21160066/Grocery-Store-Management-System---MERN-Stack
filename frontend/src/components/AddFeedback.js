import React,{useState} from 'react';
import axios from 'axios';
import feedbackphoto from '../images/feedback_photo.png';
import cover_image from '../images/cover.jpeg';
import '../CSS/AddFeedback.css';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddFeedback(){

    const navigate = useNavigate();   

    const  [category,setType] = useState('');   
    const  [feedback_comment , setFeedback] = useState('');
    const  [date , setDate] = useState(new Date().toLocaleDateString()); 

    const [customer,setCustomer] = React.useState({})

    React.useEffect(()=>{
        if(sessionStorage.getItem('customer')){
            setCustomer(JSON.parse(sessionStorage.getItem('customer')))
        }
    },[])


    function setCategory(e){
        setType(e.target.value);
    }

    function setFb(e){
        setFeedback(e.target.value);
    }



    const newFeedback ={
        category:category,
        feedback_comment : feedback_comment,
        date:date,
        customerID:customer._id,
        customerName:customer.userName
    }

    console.log(newFeedback)

    function setData(e){
        
         e.preventDefault();
            
        axios.post("http://localhost:8071/Feedback/add",newFeedback).then(()=>{
                alert("feedback added");
                navigate('/showAllFeedbacks');
                 
        }).catch((err)=>{
               alert(err);
         })
    }

  return (
    
<div class name="container">
        <div>
            <img src={cover_image} className='image1234' alt=''></img>
        </div>
  
        <div class="image-text">
            <h1>Your Feedback</h1>
        </div>

        <div class="feedbacktopic">
            <p><h4>Please feel free to share your thoughts with us regarding the service<br/> you received from us. </h4></p>
        </div>
       <div class="main">
            <div>
                <img src={feedbackphoto} className='feedbackphoto' alt=''></img>
            </div>
       <div class="commentside">
<form onSubmit={setData}>
    <label htmlFor="category" class="categorytopic">Category:</label>
            <div class="dropdown">
                <select class="category" required onChange={setCategory} value={category}>
                    <option value="" disabled selected hidden>Select Category...</option>
                    <option value="Delivery Related">Delivery Related</option>
                    <option value="Payment Related">Payment Related</option>
                    <option value="Hamper Related">Hamper Related</option>
                    <option value="Outlet Related">Outlet Related</option>
                    <option value="Technical problem">Technical problem</option> 
                    <option value="Order Related">Order Related</option>
                    <option value="Other Related">OtherRelated</option>
                </select>
            </div>
        
                <label htmlFor="comment" class="yourfeedbacktopic">Your Feedback:</label>
            <div className='textareacomment'>    
                    <textarea className="textareafield" placeholder='Add your feedback...' required rows="5" cols="91"  id="comment" onChange={setFb} value={feedback_comment}></textarea>
                    <input class="dataHidden2"  id ="date" value={date} disabled hidden/>
            </div>    
        <button type="submit" class="submitbtn1" >Submit</button>
     </form>
    </div>
  </div>
</div>
)
}
