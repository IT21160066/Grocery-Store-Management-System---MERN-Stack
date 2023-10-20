import React from 'react';
import '../CSS/itemList.css';
import axios from 'axios';
import Dashboard_Card from './Dashboard_Card';
import { useNavigate } from 'react-router-dom';
// import loadingAnimation from '../../animations/loading_animation2.json'
// import loadingAnimation2 from '../../animations/loading_animation1.json'
import loadingAnimation3 from '../animations/loading_animation3.json'
import Lottie from "lottie-react";
import {saveAs} from 'file-saver';


export default function ItemList(){
    const navigate = useNavigate();
    const [search, setSearch] = React.useState('');
    const [load, setLoad] = React.useState(true)
    const [items, setItems] = React.useState([]);
    console.log(items)

    React.useEffect(() =>{
        function fetchAllData(){
            axios.get('http://localhost:8071/item/')
            .then((res)=>{
                setItems(res.data)
            }).catch((err)=>{
                console.log(err);
            });
        }
        fetchAllData();
    },[]);

    function deleteItem(id){
        axios.delete('http://localhost:8071/item/delete/'+id)
            .then(()=>{
                 alert("Delete Successfully");
                // setdeletebtn((prev)=>!prev)

                const newItems = items.filter( (el)=> el._id != id);
                setItems(newItems);

                // navigate('/');
            }).catch((err)=>{
                console.log(err);
            });
        
    }
    // end
    function createAndDownLoadPdf(){

        // console.log(salesArray)
        axios.post('http://localhost:8071/stock_pdf/create-pdf',items)
        .then(() => axios.get('http://localhost:8071/stock_pdf/fetch-pdf', {responseType:'blob'}))
        .then((res)=>{

            console.log(res.data)
            const pdfBlob = new Blob([res.data], {type:'application/pdf'})

            saveAs(pdfBlob, 'newPdf.pdf')
        })
    }
    

    function myFunction() {
        setLoad(false)
        }

        console.log(load)
        return(
            <div className='itemList_container' onLoad={myFunction}>

                <input 
                    type='text' 
                    className='edt_search_item' 
                    placeholder='Enter item name...' 
                    onChange={(e)=>{setSearch(e.target.value)}}
                />
                <button className='additembtn' onClick={()=>navigate('/dashboard/addItem')} name="addTtem">Add Item</button>
                <button className='add_sale_btn' onClick={createAndDownLoadPdf}>Generate Report</button>
           
            <div className='edt_list' id='myFrame' >
                {load&&<div id='loadingAnimation'>
                    <Lottie animationData={loadingAnimation3}/>
                </div>}
                
                {
                    items.filter((thing)=>{
                        return search.toLowerCase() == '' ?thing: thing.itemName.toLowerCase().includes(search);
                    }).map((thing)=>{
                            return   <Dashboard_Card 
                                        key = {thing._id}
                                        data = {thing}
                                        deleteItem = {deleteItem}
                                    />
                    })
                }   
            </div>
                
                    
        </div>
    )
}