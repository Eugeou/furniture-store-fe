import React from "react";
import { Link } from "react-router-dom";

const Header = ()=>{
  return(
    <>
    {/* Start Header/Navigation */}
<nav className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar" style={{borderBottom: "1px solid rgba(255,255,255,.1)"}}>
  <div className="container">
    <a className="navbar-brand" href="http://localhost:3000/">Furni<span>.</span></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarsFurni">
      <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
        <li className="nav-item active">
          <a className="nav-link" href="http://localhost:3000/">Home</a>
        </li>
        <li><a className="nav-link" href="http://localhost:3000/shop">Shop</a></li>
        <li><a className="nav-link" href="http://localhost:3000/about">About us</a></li>
        <li><a className="nav-link" href="http://localhost:3000/services">Services</a></li>
        <li><a className="nav-link" href="http://localhost:3000/blog">Blog</a></li>
        <li><a className="nav-link" href="http://localhost:3000/contact">Contact us</a></li>
      </ul>
      <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
        <li><a className="nav-link" href="#"><img src="images/user.svg" /></a></li>
        <li><a className="nav-link" href="http://localhost:3000/cart"><img src="images/cart.svg" /></a></li>
      </ul>
    </div>
  </div>
</nav>
{/* End Header/Navigation */}

    </>
    )
}


export default Header;