import React,{useState,useEffect} from 'react';
import axios from 'axios';
import '../CSS/ShowNoticeList.css';
import { Link, useNavigate } from 'react-router-dom';

export default function ShowNoticeList(){

    const [notices,setNotices] = React.useState([]);

    const navigate = useNavigate();
    
    React.useEffect(()=>{
        function fetchallData(){
            axios.get("http://localhost:8071/Notice/").then((res)=>{
                
                setNotices(res.data);
            }).catch((err)=>{
                console.log(err)
                //alert(err.message);
            })
        }
        fetchallData();
    },[])

    function deletenotice(id){
        
        axios.delete("http://localhost:8071/Notice/delete/"+id)
            .then(()=>{
                alert("Delete Successfully");
                const newNoticesList = notices.filter((fb)=> fb._id!==id)
                setNotices(newNoticesList)
                
            }).catch((err)=>{
                console.log(err);
            });
        
    }

return(
    <div className='fullcontanernotice'>
          <button type='submit' className='addnoticebtn' onClick={()=>navigate('/dashBoard/addnotice')}>Add Notice</button>
          <h3 className='noticetopic'><b>Notices</b></h3>
          {/* className='allnoticetable' */}
     <div className='table_content'>
      <table class="table">
            <thead>
             <th><b>Name</b></th>
                <th><b>No.of Photos</b></th>
                <th><b>Date</b></th>
                <th><b>Manage</b></th>    
            </thead>

            <tbody>
            {notices.map((thing)=> 
                            <tr key = {thing._id}>
                            <td className='comment'>{thing.name} </td>
                            <td></td>
                            <td>({thing.date})</td>
                            <td><Link  to ={`/get/${thing._id}`}><button className="editnotice">Edit</button></Link> 
                                                        <button class="deletenotice" onClick={()=>{deletenotice(thing._id)}}>Delete</button></td>

                                                
                            </tr>)} 
                            

            </tbody>
     </table>
     </div> 
  </div>
 )
}