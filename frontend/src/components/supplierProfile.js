import React from "react";
import '../CSS/supplierProfile.css'
// import './SupplierProfile_update.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import scooty from '../images/scooty_bye.png'
import axios from 'axios';
import {FaUserEdit} from 'react-icons/fa'

export default function SupplierProfile(){
    
    const navigate = useNavigate();
    const {id} = useParams();
    const [showAccount, setShowAccount] = React.useState(true)
    const [showPassword, setShowPassword] = React.useState(false)
    
    const [suppliers,setSuppliers] = React.useState({
        supplier_type:' ',
        manufacturing:" ",
        product_type:" ",
        product_attribute:" ",
        company_name:" ",
        company_address:" ",
        email:" ",
        contact_number:" ",
        password:" ",
        re_password:" ",
        personal_name:" ",
        personal_address:" ",
        supplierPic:''
  })

  console.log(suppliers)
  function onChange(e){
   setSuppliers(prevData =>{
       const {name,value} = e.target;

       return{
           ...prevData,
           [name] : value
       }
       })
   }

   React.useEffect(()=>{

    function fetchAllData(){
        axios.get('http://localhost:8071/suppliers/get/'+id)
            .then((res)=>{
                setSuppliers(res.data)
                console.log(res.data)
            }).catch((err)=>{
                console.log(err);
            });
        
        
    }
        fetchAllData();
    },[])

    function changePassState(){
		setShowPassword(true)
		setShowAccount(false)
		// console.log('hello')
	}

	function changeAccountState(){
		setShowAccount(true)
		setShowPassword(false)
		// console.log('hello')
	}


    const [edit, setEdit] = React.useState(false)

    function enableEdit(){
        setEdit(prev=> !prev)
    }

    const [profilepic, setProfilepic] = React.useState({
        image:''
    })
    console.log(profilepic)

    const handleFileUpload = async(e) =>{
        const file = e.target.files[0];
        const base64 = await convertToBase64(file)
        setProfilepic({...profilepic,image:base64})
    }

    function updateSupplierData(e){
        
        console.log('hello')
        console.log('in update func')
        axios.put('http://localhost:8071/suppliers/update/'+id,suppliers)
        .then((res)=>{
            setEdit(false)
            navigate(`/supplierProfile/${id}`)
        }).catch((err)=>{
            console.log(err)
        });
    }

    const [requests,setRequests] = React.useState([]);

    function supplierDelete(id){
        axios.delete('http://localhost:8071/suppliers/delete/'+suppliers._id)
        .then(()=>{
            alert("Delete Successfully");
            localStorage.removeItem('supplier')
            navigate('/');
            
        }).catch((err)=>{
            console.log(err);
        })
    }



    return(
        <div className="supplierProfile">
            <section className="supplier_profile">
                <div>
                   
                   
                    <div className="supplier_profile_container">
                    <div className="pic_panel">
                    <div className="supplier_pic_container">
                                <div className="sup_image_circle">
                                {/* <input id="image" type="file" name="profile_photo" placeholder="Photo" accept=".jpeg, .png, .jpg" onChange ={(e)=> handleFileUpload(e)} capture/> */}
                                    <img alt="Image" src={suppliers.supplierPic.url} className="shadow"></img>
                                </div>
                            </div>
                            <div className="sup_left_panel_navigations" id="" role="" aria-orientation="">
                                <a className="nav-link"  id="account-tab" href="#account" role="tab" aria-controls="account" aria-selected="true" onClick={changeAccountState} >
                                    <i className="fa fa-home text-center mr-1"></i> 
                                    Account
                                </a>
                                <a className="nav-link" id="password-tab" href="#password" role="tab" aria-controls="password" aria-selected="false"  onClick={changePassState}>
                                    <i className="fa fa-key text-center mr-1"></i> 
                                    Password
                                </a>
                               
                
                            </div>
                    </div>
                    {showAccount&&<form className="supplier_form" id="" onSubmit={updateSupplierData} >
                    <h1 className="">Supplier Profile</h1>
                    {edit==false?<button  type= "button" onClick={enableEdit} id="edit_Supplier_btn"><FaUserEdit/></button>:""}

                       <div className="form_container" data-tab='1' id="account" role="tabpanel" aria-labelledby="account-tab">
                           <div className="sup_accSettings_form_inputs">
                               <div className="sup_inputs_blocks">
                                   <label className="label">Name</label>
                                   {edit==false?<h6  className="details" name="name">{suppliers.personal_name}</h6>:<input type='text' name='personal_name' value={suppliers.personal_name} onChange={onChange}/>}
                             
                               </div>
                               <div className="sup_inputs_blocks">
                                   <label className="label">Address</label>
                                   {edit==false?<h6 type="text" className="details" name="personal_address">{suppliers.personal_address}</h6>:<input type='text' name="personal_address" value={suppliers.personal_address} onChange={onChange}/>}
                               </div>
                               <div className="sup_inputs_blocks">
                                   <label className="label">Company Name</label>
                                  {edit==false?<h6 type="text" className="details" >{suppliers.company_name}</h6>:<input type='text' name="company_name" value={suppliers.company_name} onChange={onChange}/>}
                               </div>

                               <div className="inputs_blocks">
                                   <label className="label">Company Addres</label>
                                  {edit==false?<h6 type="text" className="details" >{suppliers.company_address}</h6>:<input type='text' name="company_address" value={suppliers.company_address} onChange={onChange}/>}
                               </div>

                               <div className="inputs_blocks">
                                   <label className="label">Email</label>
                                  {edit==false?<h6 type="" className="details">{suppliers.email}</h6>:<input type='text' name="email" value={suppliers.email} onChange={onChange}/>}
                               </div>
                               <div className="sup_inputs_blocks">
                                   <label className="label">Contact Number</label>
                                   {edit==false?<h6 type="text" className="details" >{suppliers.contact_number}</h6>:<input type='text' name="contact_number" value={suppliers.contact_number} onChange={onChange}/>}
                               </div>
                           </div>
                           <div>
                           {edit==false?'':<button className="update_button" type='submit'  onClick={updateSupplierData}>Update</button> }
                           
            
                           </div>
                       </div>
                       <div className="remove_btn">
                           {edit==false?<button className="delete_btn" type="button" onClick={supplierDelete}>remove account</button>:'' }
                           </div>
                   </form>
                  }
                  {showPassword&&<div className="password_panel" data-tab='2' id="password" role="tabpanel" aria-labelledby="password-tab">
                                <h3 className="">Password Settings</h3>
                                <div className="">
                    
                                        <div className="sup_inputs_blocks">
                                            <label>Old password</label>
                                            <input type='text' />
                                        </div>
                                 
                                </div>
                                <div className="password_imputs">
                                 
                                        <div className="sup_inputs_blocks">
                                            <label>New password</label>
                                            <input type="password" className="" ></input> 
                                        </div>
                                
                                   
                                        <div className="sup_inputs_blocks">
                                            <label>Confirm new password</label>
                                            <input type="password" className=""></input> 
                                        </div>
                               
                                </div>
                                <div>
                                    <button className="">Save</button>
                                    <button className="">Cancel</button>
                                </div>
                            </div>
                        
                }
                   
                     </div>
                </div>
            </section>
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