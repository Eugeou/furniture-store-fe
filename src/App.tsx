import React from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";



// import page
import Header from "./shared/components/Layout/Header";
import Home from "./Home";
import Footer from "./shared/components/Layout/Footer";
import Checkout from "./Checkout";
import About from "./About";
import Blog from "./Blog";
import CartPage from "./Cart";
import Contact from "./Contact";
import Services from "./Services";
import Shop from "./Shop";
import ProductDetail from "./ProductDetail";
import LoginPage from "./Auth/Login";
import OrderPage from "./Order";
import AddressPage from "./Address";
import ProfilePage from "./Profile";
import SignUpPage from "./Auth/SignUp";
import { motion, useScroll, useSpring } from "framer-motion";
import { ToastContainer } from "react-toastify";

const App = () => {
  const location = useLocation();
  const noHeaderFooter = ['/signin','/signup','/forgetpassword','/emailverification','/verificationstep2'];
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });


    return(
      <div>
        <motion.div style={{scaleX, width: "100%", background: "#2ae3cd", transformOrigin: "0%", padding: "5px", position: "fixed", zIndex: 999}}></motion.div>
        {!noHeaderFooter.includes(location.pathname) && <Header/>}
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/blog" element={<Blog/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/services" element={<Services/>}/>
            <Route path="/shop" element={<Shop/>}
            />
            <Route path="/productdetail" element={<ProductDetail/>}/>
            <Route path="/signin" element={<LoginPage/>}/>
            <Route path="/address" element={<AddressPage/>}/>
            <Route path="/order" element={<OrderPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>

            
            {/* <Route path="*" element={<NotFound/>}/> */}

          </Routes>
          {!noHeaderFooter.includes(location.pathname) && <Footer/>}
      </div>
    )
}

function AppWrapper() {
  return (
    <BrowserRouter basename="/">
      <ToastContainer 
                position="top-center"
      />
      <App />
    </BrowserRouter>
  );
}


export default AppWrapper;

