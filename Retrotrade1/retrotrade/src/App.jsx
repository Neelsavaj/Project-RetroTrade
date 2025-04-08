import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { UserSidebar } from './components/layout/UserSidebar'
//import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import { UserProfile } from './components/user/UserProfile'
import { AdminSidebar } from './components/layout/AdminSidebar'
import { Login } from './components/common/Login'
import { Signup } from './components/common/Signup'
import { FormDemo1 } from './components/forms/FormDemo1'
import { Signup2 } from './components/common/Signup2'
import axios from "axios";
import PrivateRoutes from './hooks/PrivateRoutes'
import LandingPage from './components/common/LandingPage'
import { SubCategory } from './components/admin/SubCategory'
import { AddCategory } from './components/admin/AddCategory'
import { Productlist } from './components/admin/ProductList'
import { AddProduct } from './components/admin/AddProduct'
import { ViewMyProducts } from './components/admin/ViewMyProducts'
import { UpdateMyProduct } from './components/admin/UpdateMyProduct'
import { Contact } from './pages/Contact'
import { ErrorPage } from './pages/ErrorPage'
import { Home } from './pages/Home'
// import { UserNavbar } from './components/layout/UserNavbar'
import { Navbar } from './pages/Navbar'
import { UserNavbar } from './components/layout/UserNavbar'
import { Cart } from './pages/Cart'
import { Footer } from './pages/Footer'
import { NewCollection } from './pages/NewCollection'
import UserPrivateRoutes from './hooks/UserPrivateRoutes'
import { ResetPassword } from './components/common/ResetPassword'
import { ForgotPass } from './components/common/ForgotPass'
import { Bounce, ToastContainer } from 'react-toastify'
import PlaceOrder from './pages/PlaceOrder'
import { Products } from './pages/Products'
import { About } from './pages/About'
import { Payment } from '@mui/icons-material'

// import Login2 from './components/common/Login2'
function App() {

  axios.defaults.baseURL = "http://localhost:3000"

  const location = useLocation();
  // || location.pathname == "/user"
  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup2" || location.pathname == "/") {
      document.body.className = "";
    } else if (location.pathname.startsWith("/admin")) {
      document.body.className =
        "layout-fixed sidebar-expand-lg bg-body-tertiary sidebar-open app-loaded";
    }
    else {
      document.body.className = "";
    }
  }, [location.pathname]);


  return (

    // <div className={location.pathname === "/login" || location.pathname === "/signup2" || location.pathname == "/" || location.pathname== "/contact" ? "" : "app-wrapper"}>
    <div className={location.pathname.startsWith("/admin") ? "app-wrapper" : ""}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/product' element={<Products/>}/>
        <Route element={<UserPrivateRoutes/>}>
        <Route path='/about' element={<About/>}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/payment' element ={<Payment/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        </Route>
        {/* <Route path='/newcollection' element={<NewCollection/>} /> */}

        {/* Private routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/admin" element={<AdminSidebar />}>
            <Route path="addcategory" element={<AddCategory />} />
            <Route path="subcategory" element={<SubCategory />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path='getallproducts' element={<Productlist/>}/>
            <Route path="myproducts" element={<ViewMyProducts />} />
            <Route path="updateProduct/:id" element={<UpdateMyProduct />} />
          </Route>
        </Route>

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup2" element={<Signup2 />} />
        <Route path='/forgotpass' element={<ForgotPass />} />
        <Route path='/resetpassword/:token' element={<ResetPassword />} />

        {/* Other Pages */}
        <Route path="/productlist" element={<Productlist />} />
        <Route path="/formdemo1" element={<FormDemo1 />} />

        {/* Error Page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>

    </div>
  )
}

export default App