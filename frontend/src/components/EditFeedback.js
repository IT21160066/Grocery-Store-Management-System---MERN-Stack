import React from 'react';
import axios from 'axios';
import cover_image from '../images/cover.jpeg';
import '../CSS/ShowFeedback.css'
import feedbackphoto from '../images/feedback_photo.png';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateFeedback(){
    const [feedback,setFeedback] = React.useState({
        category:"",
        feedback_comment:""
    });

    const navigate = useNavigate();

    console.log(feedback)

    function SingleFeedback(e){
        setFeedback(prevData =>{
            const {name, value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }
    const feedbackId = useParams();

    
  
    const category = feedback.category;
    
   
    
    React.useEffect(() =>{
        function fetchData(){
            axios.get('http://localhost:8071/Feedback/get/'+feedbackId.id)
            .then((res)=>{
                setFeedback(res.data.feedback)     
            }).catch((err)=>{
                console.log(err);
            });
        }
        fetchData();
    },[]);

    function updateData(e){
        e.preventDefault();
        axios.put("http://localhost:8071/Feedback/update/"+feedbackId.id,feedback)
        .then(()=>{
            alert("Successfully updated!");
            navigate('/showAllFeedbacks')
        })
        .catch((err)=>{
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
        <form onSubmit={updateData}>
            <label htmlFor="category" class="categorytopic" >Category:</label>
                    <div class="dropdown">
                        <select class="category" name='category' required onChange={SingleFeedback} value={feedback.category}  >
                            <option value="" disabled selected hidden>Select Category...</option>
                            <option value="Delevery Related">Delevery Related</option>
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
                        <textarea className="textareafield" required rows="5" cols="91"  id="comment" name='feedback_comment' onChange={SingleFeedback} value={feedback.feedback_comment}></textarea>
                 </div>
                <button type="submit" class="submitbtn1" >Update Feedback</button>

                

             </form>
            </div>
          </div>
        </div>
        )
}