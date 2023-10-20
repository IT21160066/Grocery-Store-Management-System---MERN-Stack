import React,{useState} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../CSS/AddNotice.css';
export default function AddNotice(){

const navigate = useNavigate();  


    const  [date , setDate] = useState(new Date().toLocaleDateString()); 

    const [notice,setNotice] = React.useState({
        name :"",
        date:date,
        image:""

    });

    console.log(notice)

      function onchange(e){
        setNotice(prevData =>{
            const {name,value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }

      const noticeUpload = async(e) =>{
        const file = e.target.files[0];
        const base64 = await convertToBase64(file)
        setNotice({...notice,image:base64})
    }

      function submit(e){
        
        e.preventDefault();
           
       axios.post("http://localhost:8071/notice/add",notice).then(()=>{
               alert("Notice added");
               navigate('/dashboard/shownotice');
               setNotice({
                name :"",
                date:date,
                image:""
               })
                
       })
       .catch((err)=>{
              alert(err);
        })
   }

    return(
        <div className='mainfullcontainer12'>
        <form onSubmit={submit}>
        
        <h4 className='addnoticeTopic'>Add Notice</h4>
        <div className='maincontainer55'>
            <div className="NameoftheNotice"> 
                <label>Name of the Notice:</label><br/>
            <div/> 
            <div className='inputfield'>
            <input type = 'text' className='inputname' name='name' required value={notice["noticename"]} onChange ={onchange}/><br/><br/><br/><br/>
            {/* <input class="dataHidden3"  id ="date" value={date} disabled hidden/> */}
            </div>
            <label className='addphoto'>Add Photo:</label><br/>
            <div className="noticuploadimage">
                <input type= 'file' className='chosephoto' required accept=".jpeg, .png, .jpg"  onChange ={(e)=> noticeUpload(e)}  capture/>
            </div>
            <div className='addbtn'>
            <button type="submit" class="btn btn-outline-success">Add</button>
        </div>
            </div>
        </div>
 
        
        </form>

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
