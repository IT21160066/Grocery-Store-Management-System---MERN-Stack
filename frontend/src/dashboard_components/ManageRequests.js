import React from 'react'
import axios from 'axios';
import '../CSS/manageRequests.css'

export default function ManageRequests(){
    const [sortBydate, setSortByDate] = React.useState('');
    const [allRequests, setAllrequests] = React.useState([]);

    const past = new Date('2023-01-01').toISOString().split('T')[0];
    const [minDate, setminDate] = React.useState(past);

    const today = new Date().toISOString().split('T')[0];
    const [maxDate, setMaxDate] = React.useState(today);

    console.log(sortBydate)

    console.log(allRequests)
    React.useEffect(() =>{
        function fetchAllData(){
            axios.get('http://localhost:8071/storerequest/')
            .then((res)=>{
                setAllrequests(res.data)
            }).catch((err)=>{
                console.log(err);
            });
        }
        fetchAllData();
    },[]);

    function deleteReq(id){
        axios.delete('http://localhost:8071/storerequest/delete/'+id)
            .then(()=>{
                 alert("Delete Successfully");
                // setdeletebtn((prev)=>!prev)

                const newRequests = allRequests.filter( (el)=> el._id != id);
                setAllrequests(newRequests);

                // navigate('/');
            }).catch((err)=>{
                console.log(err);
            });
        
    }


    return(
        <div className='manageRequests_container'>
            <div className='store_req_options'>
                <input type='date' min={minDate} max={maxDate} className='store_request_search' onChange={(e)=> setSortByDate(e.target.value)}/>
            </div>
            <div className='requests_table_container'>
                {/* id='sales_table' */}
            <table className='table_content'>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Store Name</th>
                            <th>Requested Date</th>
                            <th>Quantity</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    {/* .filter((req)=>{
                                return search.toLowerCase() == '' ?req: req.itemname.toLowerCase().includes(search);
                            }).filter((req)=>{
                                return sort == '' ?req: sale.saleDate.includes(sort);
                            }) */}
                    <tbody>
                        {allRequests.filter((req)=>{
                                return sortBydate == '' ?req: req.requestDate.includes(sortBydate);
                            }).map((req)=>
                            <tr key = {req._id}>
                                <td className='table_data'>{req.itemName}</td>
                                <td className='table_data'>{req.storeName}</td>
                                <td className='table_data'>{req.requestDate}</td>
                                <td className='table_data'>{req.quantity}</td>
                                <td className='table_data btns'>
                                <button className='btn-danger' onClick={()=>{deleteReq(req._id)}}>Delete</button>
                                </td>
                            </tr> )}
                    </tbody>       
                </table>
            </div>
        </div>
    )
}