import React, { useState } from 'react';

// import './Profile.css'
import '../CSS/CustomerProfile.css'
import axios from "axios";
import { useNavigate , useParams} from 'react-router-dom';
import cusImg from '../images/reg.jpg'


export default function CustomerProfile(){
    const navigate = useNavigate();
    const {id} = useParams();
    const [edit,setEdit] = React.useState(false)
    const [oldAndNewMatched, setMatch] = useState(false)
    
    

    function enableEdit(){
        setEdit((prv) => !prv)
    }

    const [customer,setCustomer] = React.useState({
        _id:'',
		name :"",
		userName :"",
		email :"",
		address :"",
		phoneNo : "",
		password : "",
		conPassword: ""
	});
    var oldPass =  customer.password
    const [pass, setPass] = useState(customer.password)

	console.log(customer)

	const [showPassword, setShowPassword] = React.useState(false)
	const [showAccount, setShowAccount] = React.useState(true)
    const [oldPassword,setOldPassword]  = React.useState()


	React.useEffect(()=>{
        // function fetchAllData(){
            let user = JSON.parse(sessionStorage.getItem('customer'))
            axios.get("http://localhost:8071/customer/getCustomer/"+user._id)
            .then((res)=>{
                setCustomer(res.data)
                setOldPassword(res.data.password)
                // console.log(res.data)
            }).catch((err)=>{
                console.log(err);
            });
        // }
        // fetchAllData();
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


	function handleChange(event) {
		setCustomer(event.target.value);
	  }

	
    // const id = '642d6c69a2aa7beba8eb7aab'

	function updateStoreData(e){
        e.preventDefault();
        axios.put('http://localhost:8071/customer/update/'+customer._id,customer)
        .then((res)=>{
            alert('Updated Successful')
            sessionStorage.setItem('customer',JSON.stringify(customer))
            setEdit(false)
            // navigate(`/CustomerProfile/${id}`)
        }).catch((err)=>{
            console.log(err);
        });
     }
     
	 function singleCustomer(e){
		setCustomer(prevData =>{
			const {name,value} = e.target;
			return{
				...prevData,
				[name] : value
			}
		})
	}

    function deletecus(id){
        axios.delete('http://localhost:8071/customer/delete/'+customer._id)
            .then(()=>{
                alert('Delete Successful')
                sessionStorage.removeItem("customer")
                navigate('/');
            }).catch((err)=>{
                console.log(err);
            });
    }
    function checkOldPassword(e){
        if(oldPass == e.target.value){
            setMatch(true)
            setPass(e.target.value)
            console.log("password correct")
        }else{
            setMatch(false)
        }
    // function setNewPassword(e){
    //     setCustomer((ob)=>{
    //         const {name,value} = e.target;
	// 		return{
	// 			...ob,
	// 			password : value
	// 		}
    //     })
    // }
        
    }
    // function updatePassword(){
    //     if(oldAndNewMatched){
    //         updateStoreData(e)
    //     }else{
    //         alert("error")
    //     }
    // }
	
	const account = document.getElementById("account");
    return(
        <div className='customerProfile_container'>
            <section className="">
                <div className="">
                    <h1 className="">Customer Profile</h1>
                    <div className="customer_profile_container">
                        <div className="left_panel">
                            {/* <div className="pic_container">
                                <div className="image_circle">
                                    <img alt="Image" src={cusImg} className="shadow"></img>
                                </div>
                            </div> */}
                            <div className="left_panel_navigations" id="" role="" aria-orientation="">
                                <button className="nav-link1"  id="account-tab" href="#account" role="tab" aria-controls="account" aria-selected="true" onClick={changeAccountState}>
                                    <i className="fa fa-home text-center mr-1"></i> 
                                    Account
                                </button>
                                <button className="nav-link1" id="password-tab" href="#password" role="tab" aria-controls="password" aria-selected="false" onClick={changePassState}>
                                    <i className="fa fa-key text-center mr-1"></i> 
                                    Password
                                </button>
                                <button className="nav-link1" id="password-tab" href="#password" onClick={()=>deletecus(customer._id)} role="tab" aria-controls="password" aria-selected="false" >
                                    <i className="fa fa-key text-center mr-1"></i> 
                                    Delete Account
                                </button>
                                {/* <button className="nav-link1"  id="security-tab" href="#security" role="tab" aria-controls="security" aria-selected="false">
                                    <i className="fa fa-user text-center mr-1"></i> 
                                    Security
                                </button> */}
                
                            </div>
                        </div>
                        
                        {showAccount&&<form className="customer_form" id="" onSubmit={updateStoreData}>
                       
                            <div className="" data-tab='1' id="account" role="tabpanel" aria-labelledby="account-tab">
                                <h2 className="acc">Account Settings</h2>
                                <div className="accSettings_form_inputs">
                                    <div className="inputs_blocks">
                                        <label className="label">Full Name</label>
                                       {edit==false?<h6 type="text" className="details" name="name">{customer.name}</h6>:<input type='text' name='name' value={customer.name} onChange={singleCustomer}/>}
                                    </div>
                                    <div className="inputs_blocks">
                                        <label className="label">User Name</label>
                                        {edit==false?<h6 type="text" className="details" name="userName">{customer.userName}</h6>:<input type='text' name='userName' value={customer.userName} onChange={singleCustomer}/>}
                                    </div>
                                    <div className="inputs_blocks">
                                        <label className="label">Email</label>
                                        {edit==false?<h6 type="text" className="details" name="email">{customer.email}</h6>:<input type='text' name='email' value={customer.email} onChange={singleCustomer}/>}
                                    </div>
                                    <div className="inputs_blocks">
                                        <label className="label">Address</label>
                                        {edit==false?<h6 type="text" className="details" name="email">{customer.address}</h6>:<input type='text' name='address' value={customer.address} onChange={singleCustomer}/>}
                                    </div>
                                    <div className="inputs_blocks">
                                        <label className="label">Phone number</label>
                                        {edit==false?<h6 type="text" className="details" name="phoneNo">{customer.phoneNo}</h6>:<input type='text' name='phoneNo' value={customer.phoneNo} onChange={singleCustomer}/>}
                                    </div>
                                </div>
                                <div className='customer_button_container'>
                                    {edit==false?<a className="customer_profile_edit" onClick={enableEdit}>Edit</a>:<button type= "submit" className="btn">Save</button>}
                                    {/* <button className="btn">Cancel</button> */}
                                    {/* {edit==true?<button type='button' className="btn" onClick={()=>deletecus(customer._id)}>Delete</button>:''} */}
                                </div>
                            </div>
                        </form>
                        }

                        {showPassword&&<div className="password_panel" data-tab='2' id="password" role="tabpanel" aria-labelledby="password-tab">
                                <h3 className="">Password Settings</h3>
                                <div className="">
                    
                                        <div className="inputs_blocks">
                                            <label>Old password</label>
                                            <input type='text' name='oldPassword' onChange={checkOldPassword}/> 
                                        </div>
                                 
                                </div>
                                <div className="password_inputs">
                                 
                                        <div className="inputs_blocks">
                                            <label>New password</label>
                                            {/* <input type="password" className="" ></input>  */}
                                            <input type='text' name='password'  onChange={singleCustomer}/>
                                        </div>
                                
                                   
                                        {/* <div className="inputs_blocks">
                                            <label>Confirm new password</label>
                                           <input type='text' name='password' onChange={singleCustomer}/>
                                        </div> */}
                               
                                </div>
                                <div className='customer_button_container'>
                                    {edit==false?<a className="customer_profile_edit" onClick={enableEdit}>Edit</a>:<button type= "submit" className="btn" onClick={oldAndNewMatched == true?updateStoreData:()=>alert("errrr")}>Save</button>}
                                    <button className="btn" onClick={changeAccountState}>Cancel</button>
                                </div>
                            </div>
                        }
                    </div>
                    
                </div>
            </section>

            
        </div>                                    
    )
}







