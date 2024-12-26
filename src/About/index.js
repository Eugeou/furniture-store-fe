import React from "react";
import { Link } from "react-router-dom";

const About = ()=>{
  return(
    <>
    <div>
  {/* Start Hero Section */}
  <div className="hero">
    <div className="container">
      <div className="row justify-content-between">
        <div className="col-lg-5">
          <div className="intro-excerpt">
            <h1>About Us</h1>
            <p className="mb-4">Explore the world of modern interior design with us! At Furni, we help you create your dream space with our elegant, modern, and high-quality furniture. From luxurious sofas to cozy dining sets, we provide everything you need to turn your house into a perfect living space. Discover our furniture collection today and start creating your dream space!</p>
            <p><a href className="btn btn-secondary me-2">Shop Now</a><a href="#" className="btn btn-white-outline">Explore</a></p>
          </div>
        </div>
        <div className="col-lg-7">
          <div className="hero-img-wrap">
            <img src="images/couch.png" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Hero Section */}
  {/* Start Why Choose Us Section */}
  <div className="why-choose-section">
    <div className="container">
      <div className="row justify-content-between align-items-center">
        <div className="col-lg-6">
          <h2 className="section-title">Why Choose Us</h2>
          <p>Customers choose us because we provide the best quality products and impressive services.</p>
          <div className="row my-5">
            <div className="col-6 col-md-6">
              <div className="feature">
                <div className="icon">
                  <img src="images/truck.svg" alt="Image" className="imf-fluid" />
                </div>
                <h3>Fast &amp; Free Shipping</h3>
                <p>We provide fast and free shipping for all our products.</p>
              </div>
            </div>
            <div className="col-6 col-md-6">
              <div className="feature">
                <div className="icon">
                  <img src="images/bag.svg" alt="Image" className="imf-fluid" />
                </div>
                <h3>Easy to Shop</h3>
                <p>You can shop easily from anywhere. We provide services on both store and online.

                </p>
              </div>
            </div>
            <div className="col-6 col-md-6">
              <div className="feature">
                <div className="icon">
                  <img src="images/support.svg" alt="Image" className="imf-fluid" />
                </div>
                <h3>24/7 Support</h3>
                <p>We provide 24/7 support for all our customers. You can contact us anytime for help.</p>
              </div>
            </div>
            <div className="col-6 col-md-6">
              <div className="feature">
                <div className="icon">
                  <img src="images/return.svg" alt="Image" className="imf-fluid" />
                </div>
                <h3>Hassle Free Returns</h3>
                <p>Have a problem with our product? No worries, we provide hassle free returns.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="img-wrap">
            <img src="images/why-choose-us-img.jpg" alt="Image" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End Why Choose Us Section */}
  {/* Start Team Section */}
  <div className="untree_co-section">
    <div className="container">
      <div className="row mb-5">
        <div className="col-lg-5 mx-auto text-center">
          <h2 className="section-title">Our Team</h2>
        </div>
      </div>
      <div className="row">
        {/* Start Column 1 */}
        <div className="col-12 col-md-6 col-lg-3 mb-5 mb-md-0">
          <img height={340} width={300} src="images/avatar-removebg.jpg" className=" mb-5" />
          <h3 clas><a href="#"><span className>Quan Nguyen</span> </a></h3>
          <span className="d-block position mb-4">CEO, Founder.</span>
          <p>Separated they live in.
            Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
          <p className="mb-0"><a href="#" className="more dark">Learn More <span className="icon-arrow_forward" /></a></p>
        </div> 
        {/* End Column 1 */}
        {/* Start Column 2 */}
        <div className="col-12 col-md-6 col-lg-3 mb-5 mb-md-0">
          <img height={340} width={300} src="images/avatar-sonle.png" className=" mb-5" />
          <h3 clas><a href="#"><span className>Son </span>Le</a></h3>
          <span className="d-block position mb-4">CEO, Founder.</span>
          <p>Separated they live in.
            Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
          <p className="mb-0"><a href="#" className="more dark">Learn More <span className="icon-arrow_forward" /></a></p>
        </div> 
        {/* End Column 2 */}
        
      </div>
    </div>
  </div>
  {/* End Team Section */}
  
</div>

    </>

    )
}


export default About;