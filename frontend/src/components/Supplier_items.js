import React,{Component,useEffect,useState} from "react";
import '../CSS/Supplier_items.css'
import { Link, Navigate,useNavigate,useParams } from "react-router-dom";
import {FiEdit} from 'react-icons/fi'
import '../images/carrot.jpg'
import {MdDeleteForever} from 'react-icons/md'
import axios from "axios";
// import { get } from "mongoose";

export default function Supplier_items({itemData}){
    const navigate = useNavigate();
    const {id} = useParams();
    const [supplier,setSuppliers] = React.useState({
        supplier_type:" ",
        product_type:" ",
        product_attribute:" ",
        manufacturing:" ",
        supplierPic:''
    })

    //delet
  const [requests,setRequests] = React.useState([]);

    const [data,setData] = useState([]);
    console.log(data)

    React.useEffect(()=>{
        function fetchAllData(){
            if(sessionStorage.getItem('supplier')){
                const supplier = JSON.parse(sessionStorage.getItem('supplier'))

                axios.get('http://localhost:8071/suppliers/get/'+supplier._id)
                .then((res)=>{
                    setSuppliers(res.data)
                    // console.log(res.data)
                }).catch((err)=>{
                    console.log(err);
                });


                axios.get('http://localhost:8071/SupplierItem/getItemsForSupplier/'+supplier._id)
                .then((res)=>{
                    setData(res.data)
                    console.log(res.data)
                }).catch((err)=>{
                    console.log(err);
                });


            }else{
                navigate('/')
            }
            
                
                
             }   
             fetchAllData();
    },[])


    console.log(supplier)

    

   

    // useEffect(()=>{
    //     axios.get('http://localhost:8071/getItemsForSupplier/'+supplier._id)
    //     .then((res)=>{
    //         setData(res.data)
    //         console.log(res.data)
    //     }).catch((err)=>{
    //         console.log(err);
    //     });
    // },[]);

    //update

    // useEffect(()=>{
    //     fetchData();
    // },[]);

    // const fetchData = async ()=>{
    //     const response = await fetch('http://localhost:8071/supplierItem/');

    // }


    

    

 

  function supplierItemsDelete(id){
    console.log(id)
    axios.delete('http://localhost:8071/SupplierItem/delete/'+id)
    .then(()=>{
        alert("Delete Successfully");
        const newData = data.filter((el)=>el._id!=id);
        setRequests(newData);
    }).catch((err)=>{
        console.log(err);
    })
  }


    return(
        <div className="Suppliers_items">
            <div className="Supplier_sidebar">
                <div className="Supplier_sidebar_upper">
                    <img className="supplier_pic" src={supplier.supplierPic.url} />
                    <h4>{supplier.personal_name}</h4>
                    <Link to ={`/supplierProfile/${supplier._id}`}>Profile</Link>
                    <div className="item_button">
                    <Link to={'/AddItems_suppliers'}>Add Item</Link>
                    </div>
                </div>
                <div className="Supplier_sidebar_bottom">
                    <div className="bottomDeatails"> 
                        <label>Supplier Type</label>
                        <h5>{supplier.supplier_type}</h5>

                        <label>Product Type</label>
                        <h5>{supplier.product_type}</h5>

                        <label>Product Manufacturing</label>
                        <h5>{supplier.manufacturing}</h5>

                        <label>Product Attribute</label>
                        <h5>{supplier.product_attribute}</h5>
                    </div>
                </div>           
            </div>
            <div className="supllier_items_table">
                <table className="table">
                    <thead style={{position:'sticky', top:'0', backgroundColor:'#678267'}}>
                        <tr>
                            <th scope="col">Product Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price of 1kg/1pkt/1bottle(Rs)</th>
                            <th scope="col">Available stock(Kg/pkt/L)</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody className="table_scroll">
                        {data.map((data)=>(//,index
                            <tr key={data._id}>
                                <td><img className="table_product_img" src={data.supplierItemPic.url}/></td>
                                <td>{data.Itemname}</td>
                                <td>{data.Price_of_one_pieces}</td>
                                <td>{data.stock}</td>
                                <td>
                                    <div className="icons_container">
                                        <div className=""><Link to={`/UpdateItems_suppliers/${data._id}`} onClick={()=>navigate(`/UpdateItems_suppliers/${data._id}`)}><button type="submit" className="button-8 ">Edit </button></Link></div>
                                        
                                        <div className=""><button type="submit"  className="button-9" onClick={()=>{supplierItemsDelete(data._id)}}>Delete</button></div>
                                    </div>
                                </td>
                                {/* <th scope="row"><img className="table_product_img"  src={carrot}/></th>
                                
                                     <td key={index}> {data.Itemname}</td>
                                     <td key={index}>{data.Price_of_one_pieces}</td>
                                     <td key={index}>{data.stock}</td>
                                <td>
                                    <div className="icons_container">
    
                                    <div className="edit_button"><Link to={`/UpdateItems_suppliers/${data._id}`} onClick={()=>navigate(`/UpdateItems_suppliers/${data._id}`)}><button type="submit" ><FiEdit /> </button></Link></div>
                                     
                                    <div className="delete_button"><button type="submit" onClick={()=>{supplierItemsDelete(data._id)}}><MdDeleteForever /></button></div>
                                    </div>
                                </td> */}
                            </tr>
                        ))}
                        {/* <tr>
                            <th scope="row">{}</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}