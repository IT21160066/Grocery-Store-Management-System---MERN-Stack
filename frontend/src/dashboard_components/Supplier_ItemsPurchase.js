
import React,{Component,useEffect,useState} from "react";
import '../CSS/Supplier_items.css'
import { Link,useNavigate,useParams } from "react-router-dom";

import axios from "axios";


import carrot from '../images/carrot.jpg'
// import { get } from "mongoose";

export default function Supplier_ItemsPurchase({itemData}){

    const navigate = useNavigate();
    const {id} = useParams();
    const [supplier,setSuppliers] = React.useState({
        supplier_type:" ",
        product_type:" ",
        product_attribute:" ",
        manufacturing:" ",
        supplierPic:''
    })

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

    console.log(supplier)
    const [data,setData] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:8071/SupplierItem/getItemsForSupplier/'+id)
        .then((res)=>{
            setData(res.data)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err);
        });
    },[]);

    //update

    // useEffect(()=>{
    //     fetchData();
    // },[]);

    // const fetchData = async ()=>{
    //     const response = await fetch('http://localhost:8071/supplierItem/');

    // }


    

    

 //delet
  const [requests,setRequests] = React.useState([]);

  function supplierItemsDelete(id){
    axios.delete('http://localhost:8071/SupplierItem/delete/'+id)
    .then(()=>{
        alert("Delete Successfully");
        const newRequest = requests.filter((el)=>el._id!=id);
        setRequests(newRequest);
    }).catch((err)=>{
        console.log(err);
    })
  }


    return(
        <div className="Suppliers_items">
            <div className="Supplier_sidebar">
                <div className="Supplier_sidebar_upper">
                    <img className="supplier_pic" src={supplier.supplierPic.url}/>
                    <h4>{supplier.personal_name}</h4>
                    <Link to ={`/supplierProfile/${supplier._id}`}>Profile</Link>
                    <div className="item_button">
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
                <table id="table_supllier_items">
                    <thead>
                        <tr>
                            <th scope="col">Product Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price of one piece(Rs)</th>
                            <th scope="col">Available stock(Kg)</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody className="table_scroll">
                        {data.map((data)=>(//,index
                            <tr key={data._id}>
                                <td><img className="table_product_img" src={data.supplierItemPic.url} /></td>
                                <td>{data.Itemname}</td>
                                <td>{data.Price_of_one_pieces}</td>
                                <td>{data.stock}</td>
                                <td>
                                    <div className="icons_container">
                                        <div className="edit_button"><Link to={`/dashboard/PurchaseItems/${data._id}`}>Buy Now </Link></div>
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