import React from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

const Services = ()=>{
  const hero_ref = useRef();
  const isInHeroView = useInView(hero_ref, { once: true });
  return(
    <>
    <div>
  {/* Start Hero Section */}
  <motion.div className="hero"
    layout
    className="hero"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
  >
    <div className="container"ref={hero_ref}
            style={{
              transform: isInHeroView ? "translateY(0px)" : "translateY(200px)",
              opacity: isInHeroView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }}>
      <div className="row justify-content-between">
        <div className="col-lg-5">
          <div className="intro-excerpt">
            <h1>Services</h1>
            <p className="mb-4">Explore the world of modern interior design with us! We offer a wide range of services to help you create your dream space with our elegant, modern, and high-quality furniture.</p>
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
  </motion.div>
  {/* End Hero Section */}
  {/* Start Why Choose Us Section */}
  <div className="why-choose-section">
    <div className="container">
      <div className="row my-5">
        <div className="col-6 col-md-6 col-lg-3 mb-4">
          <div className="feature">
            <div className="icon">
              <img src="images/truck.svg" alt="Image" className="imf-fluid" />
            </div>
            <h3>Fast &amp; Free Shipping</h3>
            <p>We provide fast and free shipping for all our products.</p>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3 mb-4">
          <div className="feature">
            <div className="icon">
              <img src="images/bag.svg" alt="Image" className="imf-fluid" />
            </div>
            <h3>Easy to Shop</h3>
            <p>You can shop easily from anywhere. We provide services on both store and online.

          </p>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3 mb-4">
          <div className="feature">
            <div className="icon">
              <img src="images/support.svg" alt="Image" className="imf-fluid" />
            </div>
            <h3>24/7 Support</h3>
            <p>We provide 24/7 support for all our customers. You can contact us anytime for help.</p>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3 mb-4">
          <div className="feature">
            <div className="icon">
              <img src="images/return.svg" alt="Image" className="imf-fluid" />
            </div>
            <h3>Hassle Free Returns</h3>
            <p>Have a problem with our product? No worries, we provide hassle free returns.</p>
          </div>
        </div>
        {/* <div className="col-6 col-md-6 col-lg-3 mb-4">
          <div className="feature">
            <div className="icon">
              <img src="images/truck.svg" alt="Image" className="imf-fluid" />
            </div>
            <h3>Fast &amp; Free Shipping</h3>
            <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3 mb-4">
          <div className="feature">
            <div className="icon">
              <img src="images/bag.svg" alt="Image" className="imf-fluid" />
            </div>
            <h3>Easy to Shop</h3>
            <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3 mb-4">
          <div className="feature">
            <div className="icon">
              <img src="images/support.svg" alt="Image" className="imf-fluid" />
            </div>
            <h3>24/7 Support</h3>
            <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3 mb-4">
          <div className="feature">
            <div className="icon">
              <img src="images/return.svg" alt="Image" className="imf-fluid" />
            </div>
            <h3>Hassle Free Returns</h3>
            <p>Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate.</p>
          </div>
        </div> */}
      </div>
    </div>
  </div>
  {/* End Why Choose Us Section */}
  {/* Start Product Section */}
  <div className="product-section pt-0">
    <div className="container">
      <div className="row">
        {/* Start Column 1 */}
        <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
          <h2 className="mb-4 section-title">Crafted with excellent material.</h2>
          <p className="mb-4">Our furniture products are made with high quality materials, natural leather to ensure the best comfort.</p>
          <p><a href="#" className="btn">Explore</a></p>
        </div> 
        {/* End Column 1 */}
        {/* Start Column 2 */}
        <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
          <a className="product-item" href="#">
            <img src="images/product-1.png" className="img-fluid product-thumbnail" />
            <h3 className="product-title">Nordic Chair</h3>
            <strong className="product-price">$50.00</strong>
            <span className="icon-cross">
              <img src="images/cross.svg" className="img-fluid" />
            </span>
          </a>
        </div> 
        {/* End Column 2 */}
        {/* Start Column 3 */}
        <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
          <a className="product-item" href="#">
            <img src="images/product-2.png" className="img-fluid product-thumbnail" />
            <h3 className="product-title">Kruzo Aero Chair</h3>
            <strong className="product-price">$78.00</strong>
            <span className="icon-cross">
              <img src="images/cross.svg" className="img-fluid" />
            </span>
          </a>
        </div>
        {/* End Column 3 */}
        {/* Start Column 4 */}
        <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
          <a className="product-item" href="#">
            <img src="images/product-3.png" className="img-fluid product-thumbnail" />
            <h3 className="product-title">Ergonomic Chair</h3>
            <strong className="product-price">$43.00</strong>
            <span className="icon-cross">
              <img src="images/cross.svg" className="img-fluid" />
            </span>
          </a>
        </div>
        {/* End Column 4 */}
      </div>
    </div>
  </div>
  {/* End Product Section */}
  
</div>

    </>

    )
}


export default Services;