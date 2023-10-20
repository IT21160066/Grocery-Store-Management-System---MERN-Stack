import React from 'react';
import axios from 'axios';
import '../CSS/allAssets.css';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateAsset(){

    const [Asset,setAsset] = React.useState({
        name : "",
        description : "",
        value : "",
        dateOfPurchase : ""
    });
    

    const navigate = useNavigate();

    function singleAsset(e){
        setAsset(prevData =>{
            const {name,value} = e.target;
            return{
                ...prevData,
                [name] : value
            }
        })
    }
    const AssetID = useParams();

    const name = Asset.name;
    console.log(Asset.name);
   
    
    React.useEffect(() =>{
        function fetchData(){
            axios.get('http://localhost:8071/Asset/get/'+AssetID.id)
            .then((res)=>{
                setAsset(res.data);      
            }).catch((err)=>{
                console.log(err);
            });
        }
        fetchData();
    },[]);

    function updateData(e){
        e.preventDefault();
        axios.put("http://localhost:8071/Asset/update/"+AssetID.id,Asset)
        .then(()=>{
            alert("Successfully updated!");
            navigate('/dashboard/allAssets');
        })
        .catch((err)=>{
            alert(err);
        })
        
    }
    return(
        <div className='myContainer'>
        <form onSubmit={updateData}>
            <div className ="mb-3">
                <label htmlFor="AssetName" className ="form-label">Asset Name</label>
                <input type="text" className ="form-control" id="assetName" name="name" placeholder="Name" onChange={singleAsset} value={Asset.name}/>
            </div>
            <div className ="mb-3">
                <label htmlFor="AssetDescription" className ="form-label">Description</label>
                <input type="text" className ="form-control" id="assetDescription" name="description" placeholder="Description" onChange={singleAsset} value={Asset.description}/>
            </div>
            <div className="mb-3">
                <label htmlFor="AssetValue" className="form-label">Value</label>
                <input type="text" className ="form-control" id="assetValue" name="value" placeholder="Value" onChange={singleAsset} value={Asset.value}/>
            </div>
            <div className ="mb-3">
                <label htmlFor="AssetDateOfPurchase" className ="form-label">Date Of Purchase</label>
                <input type="text" className ="form-control" id="assetDateOfPurchase" name="dateOfPurchase" placeholder="Date Of Purchase" onChange={singleAsset} value={Asset.dateOfPurchase}/>
            </div>
            
            <button type="submit" className ="btn btn-primary">Submit</button>
        </form>
        </div>
    )
}