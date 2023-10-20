import React from 'react'
import axios from 'axios';
import { useParams , useNavigate} from 'react-router-dom'
import '../CSS/store_profile.css'

export default function UpdateStoreProfile(){
    const {id} = useParams();
    const navigate = useNavigate();
    console.log(id)

    const [store, setStore] = React.useState({
        image:'',
        name: '',
        nic:'',
        phoneNo:'',
        addressNo:'',
        street:'',
        city:'',
        postalCode:'', 
        email:'',
        userName:'',
        password:'',
    })

    console.log(store)

    function onchange(e){
        setStore(prevData =>{
            const {name,value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }

    React.useEffect(() =>{
        function fetchAllData(){
            axios.get('http://localhost:8071/store/get/'+id)
            .then((res)=>{
                setStore(res.data.store)
            }).catch((err)=>{
                console.log(err);
            });
        }
        fetchAllData();

        //get sote data from local storage
        // const store = JSON.parse(localStorage.getItem('store'));
        //     if (items) {
        //         setStoreDetails(store.data);
        //     }
         },[]);

         function updateStoreData(e){
            e.preventDefault();
            axios.put('http://localhost:8071/store/update/'+id,store)
            .then((res)=>{
                alert('Update success')
                
                navigate(`/storeProfile`)
            }).catch((err)=>{
                console.log(err);
            });
         }

         const handleFileUpload = async(e) =>{
            const file = e.target.files[0];
            const base64 = await convertToBase64(file)
            setStore({...store,image:base64})
        }
    return(
        <div id='Store_profile_update_container'>
            <div id='profile_update_container'>
                <img className='store_profile_pic' src={store.image}/>
                <form className='profile_details' onSubmit={updateStoreData}>
                    <table id='profile_form'>
                        <tbody>
                            <tr>
                                <td>Owner Full Name:</td>
                                <td><input type='text' name='name' value={store.name} onChange={onchange}/></td>
                            </tr>
                            <tr>
                                <td>NIC No:</td>
                                <td><input type='text' name='nic' value={store.nic} onChange={onchange}/></td>
                            </tr>
                            <tr>
                                <td>Contact No:</td>
                                <td><input type='text' name='phoneNo' value={store.phoneNo} onChange={onchange}/></td>
                            </tr>
                            <tr>
                                <td>No:</td>
                                <td><input type='text' name='addressNo' value={store.addressNo} onChange={onchange}/></td>
                            </tr>
                            <tr>
                                <td>Street Address:</td>
                                <td><input type='text' name='street' value={store.street} onChange={onchange}/></td>
                            </tr>
                            <tr>
                                <td>City:</td>
                                <td><input type='text' name='city' value={store.city} onChange={onchange}/></td>
                            </tr>
                            <tr>
                                <td>Postal Code:</td>
                                <td><input type='text' name='postalCode' value= {store.postalCode} onChange={onchange}/></td>
                            </tr>
                            <tr>
                                <td>E-mail Address:</td>
                                <td><input type='text' name='email' value= {store.email} onChange={onchange}/></td>
                            </tr>
                            <tr>
                                <td>User name:</td>
                                <td><input type='text' name='userName' value= {store.userName} onChange={onchange}/></td>
                            </tr>
                            <tr>
                                <td>Password:</td>
                                <td><input type='text' name='password' value= {store.password} onChange={onchange}/></td>
                            </tr>
                            <tr>
                                <td>image:</td>
                                <td><input  type="file" name="image" placeholder="Photo" accept=".jpeg, .png, .jpg" onChange ={(e)=> handleFileUpload(e)} capture/></td>
                            </tr>
                            
                            <tr>
                                <td></td>
                                <td><input type='submit' id='updateStorebtn' value='Save'/></td>
                            </tr>
                        </tbody>
                    </table>                        
                </form>
            </div>
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