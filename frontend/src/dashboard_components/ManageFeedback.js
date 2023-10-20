import React,{useState,useEffect} from 'react';
import axios from 'axios';
import send from '../images/send.png';
import '../CSS/ManageFeedback.css';
import { Link, useNavigate } from "react-router-dom";
import {saveAs} from 'file-saver';


export default function ShowFeedback(){

    const [feedbacks,setFeedbacks] = React.useState([]);
    const [replyInput, setReplyInput] = React.useState(false);
    const [search, setSearch] = React.useState('');
    console.log(search)

    const  [repliedFeedBack,replytomsg] = useState({
        category:'',
        feedback_comment:'',
        date:'',
        reply:''
    });

    function onchange(e){
        replytomsg(prev =>{
            const {name,value} = e.target;
            return{
                ...prev,
                [name] : value
            }
        })
    }


    const  [date , setDate] = useState(new Date().toISOString());
    //const [deletebtn, setdeletebtn] = React.useState(false);

    console.log(feedbacks)

    const navigate = useNavigate();



    React.useEffect(()=>{
        function fetchallData(){
            axios.get("http://localhost:8071/Feedback/").then((res)=>{
                
                 setFeedbacks(res.data);
            }).catch((err)=>{
                console.log(err)
                //alert(err.message);
            })
        }
        fetchallData();
    },[])

    function deletefeedback(id){
        
        axios.delete('http://localhost:8071/Feedback/delete/'+id)
            .then(()=>{
                alert("Delete Successfully");
                const newFeedbackList = feedbacks.filter((fb)=> fb._id!==id)
                setFeedbacks(newFeedbackList)
                
            }).catch((err)=>{
                console.log(err);
            });
        
    }
   // console.log(repliedFeedBack)

    let fbID = '';
    function replyMessage(feedBackid){
        fbID = feedBackid;
        setReplyInput(true)
        feedbacks.map(function(ob){
            if(ob._id==feedBackid){
                replytomsg(ob)
            }
        })

    }

    function updateComment(id){
        
        axios.put('http://localhost:8071/Feedback/update/'+id,repliedFeedBack)
        .then(()=>{
            alert('replied')
            navigate('/showAllFeedbacks');
        })
        .catch(()=>{
            alert('error')
        })

    }

    
    function createAndDownLoadPdf(){

        // console.log(salesArray)
        axios.post('http://localhost:8071/Feedback_pdf/create-pdf',feedbacks)
        .then(() => axios.get('http://localhost:8071/Feedback_pdf/fetch-pdf', {responseType:'blob'}))
        .then((res)=>{

            console.log(res.data)
            const pdfBlob = new Blob([res.data], {type:'application/pdf'})

            saveAs(pdfBlob, 'newPdf.pdf')
        })
    }

return(
  <div className='fullscreen'>

        <div className='countcmt'>
        <h4 className='feedbacktopic1'><b>Feedback</b></h4>
        <input type='text' className='manageFeedBack_search' placeholder='Search by Category..' onChange={(e) => {setSearch(e.target.value)}}/> 
        <button className='add_sale_btn' onClick={createAndDownLoadPdf}>Generate Report</button>
        </div>
        <div className='maincnt'>

        <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Comment</th>
      <th scope="col">Type</th>
      <th scope="col">Date</th>
      <th scope="col">Admin Reply</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
  
   {feedbacks.filter((thing)=>{
    // console.log(thing.category);
    return search.toLowerCase() =='' ?thing: thing.category.toLowerCase().includes(search);
   }).map((thing)=> 
                <tr key = {thing._id}>
                <td>{thing.customerName}</td>
                <td>{thing.feedback_comment}</td>
                <td>{thing.category}</td>
                <td>{thing.date}</td>
                <td>
                    <div className='inputfield1'><input type="text" className='replytextbox' key={thing._id} name='reply' onClick={()=>replyMessage(thing._id)} onChange={onchange}/>
                    <button type="button" className='sbtn'  onClick={function(){updateComment(thing._id)}}><img src={send} className='send' alt='send'/></button></div>
                    {thing.reply !=null?<p className='reply1'>Admin :{thing.reply}</p>:""}
                </td>
                <td>
                    <button className="deletebutton1" 
                        onClick={
                            ()=>{deletefeedback(thing._id)
                                
                            }
                            }>Delete</button>
                </td>
                </tr>)}  

       </tbody>
     </table>
   </div>
</div>

  )
}