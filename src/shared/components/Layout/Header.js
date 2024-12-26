import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { GetMe, logout } from "../../../Api/services/auth-service";
import { Button, Dropdown, Menu, Modal, Avatar, notification } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined, QuestionCircleOutlined, DashboardOutlined, CalendarOutlined } from '@ant-design/icons';
import { toast } from "react-toastify";
import { motion } from "framer-motion";


const Header = ()=>{

  const [user, setUser] = useState();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (userId) {
      GetMe(userId).then((response) => {
        console.log(response);
        setUser(response?.data);
      });
    }
  }, [userId]);

  const handleLogout = async () => {
    
    if (userId) {
        //setLoading(true);
        try {
            await logout(userId);
            localStorage.clear();
            window.location.href = "/signin";
            //sessionStorage.clear();
            toast.success("Logout successfully");
            //setLoading(false);
        } catch (error) {
            notification.error({ message: 'Logout failed' });
        }
    }
};
  
  const userMenu = (
    <Menu>
        {/* <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <p className='text-primary'>{user?.FullName}</p>
        </Menu.Item> */}
        <Menu.Item key="profile" icon={<UserOutlined />}>
            <a href="/profile">Your Profile</a>
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
            <a href={`/address`}>Settings</a>
        </Menu.Item>
        <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
            <a href="/contact">Help</a>
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
            Sign out
        </Menu.Item>
    </Menu>
  );
  console.log("user: ", user?.FullName);
  
  return(
    <>
    {/* Start Header/Navigation */}
<nav className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar" style={{borderBottom: "1px solid rgba(255,255,255,.1)"}}>
  <div className="container">
    <a className="navbar-brand" href="/">Furni<span>.</span></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarsFurni">
      <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
        <li className="nav-item active">
          <a className="nav-link" href="/">Home</a>
        </li>
        <li><a className="nav-link" href="/shop">Shop</a></li>
        <li><a className="nav-link" href="/about">About us</a></li>
        <li><a className="nav-link" href="/services">Services</a></li>
        <li><a className="nav-link" href="/blog">Blog</a></li>
        <li><a className="nav-link" href="/contact">Contact us</a></li>
      </ul>
      <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
        {/* <li><a className="nav-link" href="/signin"><img src="images/user.svg" /></a></li>
        <li><a className="nav-link" href="/cart"><img src="images/cart.svg" /></a></li> */}
        {userId ? (
          <>
          <Dropdown overlay={userMenu} placement="bottomRight">
            <img src="images/user.svg" />
          </Dropdown>
          <a className="nav-link ms-4" href="/cart"><img src="images/cart.svg" /></a>
          </>
        ) : (
          <>
          <motion.button
            className="border-0 bg-transparent"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <a href="/signin" className="p-2 btn btn-secondary " style={{ fontSize: "14px"}}>Sign in</a>
          </motion.button>
          
          
          <motion.button
            className="border-0 bg-transparent"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <a href="/signup" className="p-2 btn btn-white-outline ms-3" style={{ fontSize: "14px"}}>Sign up</a>
          </motion.button>
          </>
        )}

            
      </ul>
    </div>
  </div>
</nav>
{/* End Header/Navigation */}

    </>
    )
}


export default Header;