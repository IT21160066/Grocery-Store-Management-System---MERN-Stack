import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AllGroceries from './components/AllGroceries';
import DashBoard from './dashboard_components/DashBoard';
import './styles.css';
import Cart from './components/Cart';
// import AddItem from './components/dashboardCmpnt/AddItem';
import UpdateItem from './dashboard_components/UpdateItem';
import OurServices from './components/OurServices';

import Footer from './components/Footer';
import AddItem from './dashboard_components/AddItem';
import ItemList from './dashboard_components/ItemList';
import User from './User';
import SalesList from './dashboard_components/SalesList';
import AddSales from './dashboard_components/AddSales';
import StoreLogin from './components/StoreLogin';
import StoreProfile from './components/StoreProfile';
import StoreRegistration from './components/StoreRegistration';
import UpdateStoreProfile from './components/UpdateStoreProfile';
import DriverProfile from './components/DriverProfile';
import UpdateDriverProfile from './components/UpdateDriverProfile';
import EmployeeRegistration from './components/EmployeeRegistration';
import EmployeeLogin from './components/EmployeeLogin';
import Carousel from './components/Carousel';


import ManageFinance from './dashboard_components/ManageFinance';
import IncomeExpenseHistory from './dashboard_components/IncomeExpenseHistory'
import CalculateProtit from './dashboard_components/CalculateProfit';
import AllAssets from './dashboard_components/AllAssets';
import AddAssets from './dashboard_components/AddAsset';
import UpdateAsset from './dashboard_components/UpdateAsset';
import AddRevenueOrExpenses from './dashboard_components/AddRevenueOrExpenses';
import AssetsReport from './dashboard_components/AssetsReport';
import ProfitLossReport from './dashboard_components/ProfitLossReport';
import ManageEmployee from './dashboard_components/ManageEmployee';
import ManageStores from './dashboard_components/ManageStores';
import AddFeedback from './components/AddFeedback'
import ContactUs from './components/ContactUs'
import ShowFeedBack from './components/ShowFeedback'


import ManageSuppliers from './dashboard_components/ManageSuppliers'

























import EditFeedback from './components/EditFeedback'
import ManageFeedback from './dashboard_components/ManageFeedback';
import AddNotice from './dashboard_components/AddNotice';
import ShowNotice from './dashboard_components/ShowNoticeList';
import OrderList from './dashboard_components/OrderList';
import UpdateOrder from './components/UpdateOrder';
import CartReview from './components/CartReview';
import OrderReview from './components/OrderReview';


import ManageRequests from './dashboard_components/ManageRequests';
import AddItems_suppliers from './components/AddItems_suppliers';
import Welcome_Supplier from './components/Welcome_Supplier';
import UpdateItems_suppliers from './components/UpdateItems_suppliers';
import Supplier_items from './components/Supplier_items';
import SupplierRegister from './components/SupplierRegister';
import SupLogin from './components/SupLogin';
import SupplierProfile from './components/supplierProfile';
import Register from './components/Register'
import AllCustomers from './dashboard_components/AllCustomers';
import CustomerProfile from './components/CustomerProfile';
import Supplier_ItemsPurchase from './dashboard_components/Supplier_ItemsPurchase';


import PurchaseItems from './dashboard_components/PurchaseItems';
import PurchaseItemView from './dashboard_components/PurchseItemView';
import DriverProfile_AdminSide from './dashboard_components/DriverProfile_AdminSide'












// import PurchaseItems from './dashboard_components/PurchaseItems';
// import PurchaseItemView from './dashboard_components/PurchseItemView';

// import EmployeeProfile from './components/EmployeeProfile'

function App() {

  
  return (
    <BrowserRouter>
    
     <div className="app">
      {/* <Header itemCount ={cartItems.length}/> */}
      <Routes>
        <Route path='/' exact element={<User/>}>
          <Route path='/Carousel' exact element={<Carousel/>}/>
          <Route path='/' exact element={<Home/>}/>
          <Route path='/allgroceries' exact element={<AllGroceries/>}></Route>
          <Route path='/ourServices' exact element={<OurServices/>}></Route>
          <Route path='/registerStore' exact element={<StoreRegistration/>}></Route>
          <Route path='/storeLogin' exact element={<StoreLogin/>}></Route>
          <Route path='/updateStore/:id' exact element={<UpdateStoreProfile/>}></Route>
          <Route path='/storeProfile' exact element = {<StoreProfile/>}></Route> 
          {/* removed :id */}
          <Route path='/deliveryregistraion/employeeLogin' exact element={<EmployeeLogin/>}></Route>
          <Route path='/deliveryregistraion' exact element={<EmployeeRegistration/>}></Route>
          <Route path='/driverProfile' exact element = {<DriverProfile/>}></Route>
          <Route path='/updateDriverProfile/:id' exact element = {<UpdateDriverProfile/>}></Route>   
          <Route path='/cart' exact element={<Cart />}></Route> 
          <Route path='/contactus' exact element={<ContactUs />}></Route> 
          <Route path='/addFeedBack' exact element={<AddFeedback />}></Route> 
          <Route path='/showAllFeedbacks' exact element={<ShowFeedBack />}></Route>
          {/* <Route path='/employeeProfile' exact element={<EmployeeProfile />}></Route> */}


          <Route path='/get/:id' exact element={<EditFeedback/>} ></Route> 

          {/* <Route path='/get/:id' exact element={<EditFeedback/>} ></Route> */}

          {/* vishal routes */}
            
            <Route path="/profile" exact element={<CustomerProfile/>}/>
            <Route path="/login" exact element={<Register/>}/>

          {/* pasindu routes */}
          <Route path='/cartReview' exact element={<CartReview/>}></Route>
          <Route path="/orderReview" exact element={<OrderReview/>}></Route>
          
          {/*Dilshan routes*/ }
          <Route path='/AddItems_suppliers' exact element={<AddItems_suppliers />}></Route>
          <Route path='/Welcome_Supplier' exact element={<Welcome_Supplier />}></Route>
          <Route path='/AddItems_suppliers' exact element={<AddItems_suppliers />}></Route>
          <Route path='/UpdateItems_suppliers/:id' exact element={<UpdateItems_suppliers />}></Route>
          <Route path='/Supplier_items' exact element={<Supplier_items />}></Route>
          <Route path='/SupplierRegister' exact element={<SupplierRegister />}></Route>
          <Route path='/SupLogin' exact element={<SupLogin/>}></Route>
          <Route path='/supplierProfile/:id' exact element={<SupplierProfile />}></Route>

        </Route>
        

        <Route path='/dashboard'  element={<DashBoard/>}>
          <Route path='/dashboard/ItemList' exact element={<ItemList/>}/>
          <Route path='/dashboard/addItem' exact element={<AddItem/>}/>
          <Route path='/dashboard/updateItem/:id' exact element={<UpdateItem/>}></Route>
          <Route path='/dashboard/salesList/' exact element={<SalesList/>}></Route>
          <Route path='/dashboard/addSale/' exact element={<AddSales/>}></Route>
          <Route path='/dashboard/manageRequests/' exact element={<ManageRequests/>}></Route>

          {/* pasindu routes */}
          <Route path="/dashboard/orderList" exact element={<OrderList/>}></Route>
          <Route path="/dashboard/updateOrder/:id" exact element={<UpdateOrder/>}></Route>


          {/* poorna routes */}
            <Route path="/dashboard/manageFinance" exact element={<ManageFinance/>}></Route>
            <Route path="/dashboard/ieHistory" exact element={<IncomeExpenseHistory/>} />
            <Route path="/dashboard/calcProf" exact element={<CalculateProtit/>} />
            <Route path="/dashboard/addAssets" exact element={<AddAssets/>} />
            <Route path="/dashboard/allAssets" exact element={<AllAssets/>} />
            <Route path='/dashboard/updateAssests/:id' exact element={<UpdateAsset/>} />
            <Route path="/dashboard/addRevenueOrExpenses" exact element={<AddRevenueOrExpenses/>}></Route>
            <Route path="/dashboard/assetsReport" exact element={<AssetsReport/>}></Route>
            <Route path="/dashboard/profitLossReport" exact element={<ProfitLossReport/>}></Route>


          {/* thyagi routes */}
            <Route path="/dashboard/manageEmployee" exact element={<ManageEmployee/>}></Route>
            <Route path='/dashboard/DriverProfile_AdminSide/:id' exact element={<DriverProfile_AdminSide/>}></Route>


          {/* jayathri routes */}
            <Route path="/dashboard/manageStores" exact element={<ManageStores/>}></Route>


          {/* tharindu routes */}
          <Route path="/dashboard/managefeedback" exact element={<ManageFeedback/>}></Route>
          <Route path="/dashboard/addnotice" exact element={<AddNotice/>}/>
          <Route path="/dashboard/shownotice" exact element={<ShowNotice/>}/>


          <Route path="/dashboard/manageSuppliers" exact element={<ManageSuppliers/>}/>
          <Route path='/dashboard/Supplier_ItemsPurchase/:id' exact element={<Supplier_ItemsPurchase/>}/>

          {/* dilshan aiya */}
          <Route path='/dashboard/PurchaseItems/:id' exact element={<PurchaseItems />}/>
          <Route path='/dashboard/PurchaseItemView' exact element={<PurchaseItemView />}/>
         

          {/* vishal routes   */}
          <Route path="/dashboard/manageCustomers" exact element={<AllCustomers/>} />
       {/* "64461b80773c28e0ae38a0bc" */}
        </Route>
          {/* dashboard routes end */}

          
        
        
       
          
          


      </Routes>
       <Footer/>
     </div>
     </BrowserRouter>
  );
}

export default App;
