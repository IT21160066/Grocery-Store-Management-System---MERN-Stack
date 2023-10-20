import React,{useState,useEffect} from 'react';
import axios from 'axios';
import cover_image from '../images/cover.jpeg';
import '../CSS/ShowFeedback.css';
import reply from '../images/reply.png';
import edit from '../images/edit.png';
import delete1 from '../images/delete.png';
import { Link, useNavigate } from "react-router-dom";
import {AiFillEdit} from "react-icons/ai"
import {MdDelete} from "react-icons/md"
import feedback_bg from '../images/feedback_bg.png'


export default function ShowFeedback(){

    const [feedbacks,setFeedbacks] = React.useState([]);
    const [customer,setCustomer] = React.useState({
        userName:''
    })
    // const custmerName = customer.userName
    // var customer = JSON.parse(sessionStorage.getItem('customer'))
    console.log(customer)
    //const [deletebtn, setdeletebtn] = React.useState(false);

    const navigate = useNavigate();

    React.useEffect(()=>{
        function fetchallData(){
            axios.get("http://localhost:8071/Feedback/").then((res)=>{
                
                 setFeedbacks(res.data);
            }).catch((err)=>{
                console.log(err)
                //alert(err.message);
            })

            if(sessionStorage.getItem('customer')){
                setCustomer(JSON.parse(sessionStorage.getItem('customer'))) 
            }
        }
        fetchallData();
    },[])

    function deletefeedback(id){
        
        axios.delete('http://localhost:8071/Feedback/delete/'+id)
            .then(()=>{
                alert("Delete Successfully");
                const newFeedbackList = feedbacks.filter((fb)=> fb._id!=id)
                setFeedbacks(newFeedbackList)
                
            }).catch((err)=>{
                console.log(err);
            });
        
    }

return(
  <div className='show_feedBacks_container'>
      <div className='show_feedBacks_img'>
            <img src={cover_image} id='showFeedback_deco_img' alt=''></img>
        </div>
        <img className='feedback_bg_img' src={feedback_bg}/>
        <div class="image-text">
            <h1>Show Feedback</h1>
        </div>

        <div className='countcomment'>
            <h4><b>Feedback</b></h4>
        </div>
        
        <div className='maincon'>
            

        <table className="show_feed_back_table">
            <thead>
             
                <th></th>
                <th></th>
                <th></th>
                <th></th>
            </thead>
            <tbody>
                {feedbacks.map((thing)=> 
                    <tr key = {thing._id}>
                        
                        <td><small style={{fontSize:"10px"}}>{thing.customerName}</small><br></br>
                            {thing.feedback_comment}
                            {thing.reply !=null?<p className='reply'>
                            <img src={reply} className='admin' alt='admin'></img>
                            <p className='adminbadge'><i>Admin</i> :</p>{thing.reply}</p>:""}
                        </td>
                        <td><b>({thing.category})</b></td>
                        <td>{thing.date}</td>
                        {customer.userName == thing.customerName?<td>
                            <Link  to ={`/get/${thing._id}`}><button className="editbtn"><AiFillEdit/></button></Link>
                            <button class="deletebtn" onClick={()=>{deletefeedback(thing._id)}}><MdDelete/></button>
                        </td>:""}
                       
                    </tr>
                    )}
            </tbody>
        </table>
   </div>
</div>

  )

}

