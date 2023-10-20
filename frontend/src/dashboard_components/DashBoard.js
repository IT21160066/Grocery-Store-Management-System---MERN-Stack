import React from 'react';
import '../CSS/dashBoardStyles.css';
import { Link, Outlet } from 'react-router-dom';
import cartAnimation from '../animations/administration.json'
import Lottie from "lottie-react";

export default function DashBoard(){

    const [addItem, setSetAdditem] = React.useState(false);
    

    return(
        <div className='dashboard_body' >
            <div className='dashboard_header'>
            </div>
            <div className='dashBoard_container'>
                <div className='dashboard_sidebar' >
                    <h3>DashBoard</h3>
                    <Link to='ItemList'>Manage Inventory</Link>
                    <Link to='SalesList'>Manage Sales</Link>
                    <Link to='manageFinance'>Manage Finance</Link>
                    <Link to='manageEmployee'>Manage Employees</Link>
                    <Link to='manageStores'>Manage Stores</Link>
                    <Link to='manageRequests'>Manage Requests</Link>
                    <Link to='manageCustomers'>Manage Customers</Link>
                    <Link to='orderList'>Manage Orders</Link>
                    {/* <Link to='ItemList'>Manage Stores</Link> */}
                    <Link to='managefeedback'>Manage Feedback</Link>
                    <Link to='shownotice'>Manage Notices</Link>
                    <Link to='manageSuppliers'>Manage Suppliers</Link>
                    <Link to='PurchaseItemView'>Manage Purchases</Link>
                    <div className=''>
                        <Lottie animationData={cartAnimation}/>
                    </div>
                </div>
                <div className='dashboard_content'>
                    {/* {addItem&&<AddItem/>}
                    {!addItem&&<ItemList/>} */}
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}