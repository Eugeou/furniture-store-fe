import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useSpring,
  useInView,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";


const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // const ref = useRef();
  // const isInView = useInView(ref, { once: true });

  const hero_ref = useRef();
  const isInHeroView = useInView(hero_ref, { once: true });

  const product_ref = useRef();
  const isInProductView = useInView(product_ref, { once: true });

  const wc_ref = useRef();
  const isInWCView = useInView(wc_ref, { once: true });

  const wh_ref = useRef();
  const isInWHView = useInView(wh_ref, { once: true });

  const popular_ref = useRef();
  const isInPopularView = useInView(popular_ref, { once: true });

  const blog_ref = useRef();
  const isInBlogView = useInView(blog_ref, { once: true });

  const { transform } = useSpring({
    transform: isInHeroView ? "translateY(0px)" : "translateY(200px)",
    config: {
      tension: 100,
      friction: 20,
    },
  });

  return (
    <>
      <div>
        {/* Start Hero Section */}
        <motion.div
          layout
          className="hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div
            className="container"
            ref={hero_ref}
            style={{
              transform: isInHeroView ? "translateY(0px)" : "translateY(200px)",
              opacity: isInHeroView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }}
          >
            <div className="row justify-content-between">
              <div className="col-lg-6 py-2">
                <div className="intro-excerpt">
                  <h1>
                    Modern Furni
                    <span class="d-block">Best choice for you!</span>
                  </h1>
                  <h3 className="mb-4 text-white">
                    Visit out website and explore our best products and offers now!
                  </h3>
                  <p>
                    <motion.button
                      className="border-0 bg-transparent hover:border-0"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                    >
                      <a href className="btn btn-secondary me-2">
                        Shop Now
                      </a>
                    </motion.button>

                    <motion.button
                      className="border-0 bg-transparent"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                    >
                      <a href="#2" className="btn btn-white-outline">
                        Explore
                      </a>
                    </motion.button>
                  </p>
                </div>
              </div>
              <div className="col-lg-6 py-2"
                ref={hero_ref}
                style={{
                  transform: isInHeroView ? "translateY(0px)" : "translateY(200px)",
                  opacity: isInHeroView ? 1 : 0,
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.75s",
                }}
              >
                <div className="hero-img-wrap">
                  <img src="images/couch.png" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* End Hero Section */}

        {/* Start Product Section */}
        <div className="product-section" id="2">
          <motion.div
            ref={product_ref}
            className="container"
            style={{
              transform: isInProductView ? "none" : "translateX(-500px)",
              opacity: isInProductView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }}
          >
            <div className="row">
              {/* Start Column 1 */}
              <div className="col-md-12 col-lg-3 mb-5 mb-lg-0 py-5">
                <h2 className="mb-4 section-title">
                  Crafted with excellent material.
                </h2>
                <p className="mb-4 text-secondary">
                  Our furniture products are made with high quality materials,
                  natural leather to ensure the best comfort.{" "}
                </p>
                <motion.button
                  className="border-0"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <a href="#" className="btn">
                    Explore
                  </a>
                </motion.button>
              </div>
              {/* End Column 1 */}
              {/* Start Column 2 */}
              <div
                className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0"
                ref={product_ref}
                style={{
                  transform: isInProductView ? "none" : "translateY(200px)",
                  opacity: isInProductView ? 1 : 0,
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1.5s",
                }}
              >
                <a className="product-item" href="cart.html">
                  <img
                    src="images/product-1.png"
                    className="img-fluid product-thumbnail"
                  />
                  <h3 className="product-title">Nordic Chair</h3>
                  <strong className="product-price">$50.00</strong>
                  <span className="icon-cross">
                    <img src="images/cross.svg" className="img-fluid" />
                  </span>
                </a>
              </div>
              {/* End Column 2 */}
              {/* Start Column 3 */}
              <div
                className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0"
                ref={product_ref}
                style={{
                  transform: isInProductView ? "none" : "translateY(200px)",
                  opacity: isInProductView ? 1 : 0,
                  transition:
                    "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1.75s",
                }}
              >
                <a className="product-item" href="cart.html">
                  <img
                    src="images/product-2.png"
                    className="img-fluid product-thumbnail"
                  />
                  <h3 className="product-title">Kruzo Aero Chair</h3>
                  <strong className="product-price">$78.00</strong>
                  <span className="icon-cross">
                    <img src="images/cross.svg" className="img-fluid" />
                  </span>
                </a>
              </div>
              {/* End Column 3 */}
              {/* Start Column 4 */}
              <div
                className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0"
                ref={product_ref}
                style={{
                  transform: isInProductView ? "none" : "translateY(200px)",
                  opacity: isInProductView ? 1 : 0,
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 2.0s",
                }}
              >
                <a className="product-item" href="cart.html">
                  <img
                    src="images/product-3.png"
                    className="img-fluid product-thumbnail"
                  />
                  <h3 className="product-title">Ergonomic Chair</h3>
                  <strong className="product-price">$43.00</strong>
                  <span className="icon-cross">
                    <img src="images/cross.svg" className="img-fluid" />
                  </span>
                </a>
              </div>
              {/* End Column 4 */}
            </div>
          </motion.div>
        </div>
        {/* End Product Section */}

        {/* Start Why Choose Us Section */}
        <div
          className="why-choose-section"
          ref={wc_ref}
          style={{
            transform: isInWCView ? "none" : "translateX(-500px)",
            opacity: isInWCView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
        >
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-6">
                <h2 className="section-title">Why Choose Us</h2>
                <p>
                  Customers choose us because we provide the best quality
                  products and impressive services.
                </p>
                <div className="row my-5">
                  <div
                    className="col-6 col-md-6"
                    ref={wc_ref}
                    style={{
                      transform: isInWCView ? "none" : "translateX(-500px)",
                      opacity: isInWCView ? 1 : 0,
                      transition:
                        "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1s",
                    }}
                  >
                    <div className="feature">
                      <div className="icon">
                        <img
                          src="images/truck.svg"
                          alt="Image"
                          className="imf-fluid"
                        />
                      </div>
                      <h3>Fast &amp; Free Shipping</h3>
                      <p>
                        We provide fast and free shipping for all our products.
                      </p>
                    </div>
                  </div>
                  <div
                    className="col-6 col-md-6"
                    ref={wc_ref}
                    style={{
                      transform: isInWCView ? "none" : "translateX(-500px)",
                      opacity: isInWCView ? 1 : 0,
                      transition:
                        "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1.5s",
                    }}
                  >
                    <div className="feature">
                      <div className="icon">
                        <img
                          src="images/bag.svg"
                          alt="Image"
                          className="imf-fluid"
                        />
                      </div>
                      <h3>Easy to Shop</h3>
                      <p>
                        You can shop easily from anywhere. We provide services
                        on both store and online.
                      </p>
                    </div>
                  </div>
                  <div
                    className="col-6 col-md-6"
                    ref={wc_ref}
                    style={{
                      transform: isInWCView ? "none" : "translateX(-500px)",
                      opacity: isInWCView ? 1 : 0,
                      transition:
                        "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 2s",
                    }}
                  >
                    <div className="feature">
                      <div className="icon">
                        <img
                          src="images/support.svg"
                          alt="Image"
                          className="imf-fluid"
                        />
                      </div>
                      <h3>24/7 Support</h3>
                      <p>
                        We provide 24/7 support for all our customers. You can
                        contact us anytime for help.
                      </p>
                    </div>
                  </div>
                  <div
                    className="col-6 col-md-6"
                    ref={wc_ref}
                    style={{
                      transform: isInWCView ? "none" : "translateX(-500px)",
                      opacity: isInWCView ? 1 : 0,
                      transition:
                        "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 2.5s",
                    }}
                  >
                    <div className="feature">
                      <div className="icon">
                        <img
                          src="images/return.svg"
                          alt="Image"
                          className="imf-fluid"
                        />
                      </div>
                      <h3>Hassle Free Returns</h3>
                      <p>
                        Have a problem with our product? No worries, we provide
                        hassle free returns.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="img-wrap">
                  <img
                    src="images/why-choose-us-img.jpg"
                    alt="Image"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Why Choose Us Section */}

        {/* Start We Help Section */}
        <div
          className="we-help-section"
          ref={wh_ref}
          style={{
            transform: isInWHView ? "none" : "translateX(-500px)",
            opacity: isInWHView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1s",
          }}
        >
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-lg-7 mb-5 mb-lg-0">
                <div className="imgs-grid">
                  <div className="grid grid-1">
                    <motion.img
                      ref={wh_ref}
                      style={{
                        transform: isInWHView ? "none" : "translateY(200px)",
                        opacity: isInWHView ? 1 : 0,
                        transition:
                          "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1.5s",
                      }}
                      src="images/img-grid-1.jpg"
                      alt="Untree.co"
                    />
                  </div>
                  <div className="grid grid-2">
                    <motion.img
                      ref={wh_ref}
                      style={{
                        transform: isInWHView ? "none" : "translateY(200px)",
                        opacity: isInWHView ? 1 : 0,
                        transition:
                          "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 2s",
                      }}
                      src="images/img-grid-2.jpg"
                      alt="Untree.co"
                    />
                  </div>
                  <div className="grid grid-3">
                    <motion.img
                      ref={wh_ref}
                      style={{
                        transform: isInWHView ? "none" : "translateY(200px)",
                        opacity: isInWHView ? 1 : 0,
                        transition:
                          "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 2.5s",
                      }}
                      src="images/img-grid-3.jpg"
                      alt="Untree.co"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-5 ps-lg-5">
                <h2 className="section-title mb-4">
                  We Help You Make Your Modern Interior Design
                </h2>
                <p>
                  Explore the world of modern interior design with us!
                  At Furni, we help you create your dream space with our elegant, modern, and high-quality furniture. 
                  From luxurious sofas to cozy dining sets, we provide everything you need to turn your house into a perfect living space. 
                  Discover our furniture collection today and start creating your dream space!
                </p>
                <ul className="list-unstyled custom-list my-4">
                  <li>High quality materials used</li>
                  <li>Luxurious and stylish design</li>
                  <li>Modern and diverse furniture collection</li>
                  <li>Excellent and efficient support services</li>
                </ul>
                <motion.button
                  className="border-0 bg-transparent"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <a herf="#" className="btn">
                    Explore
                  </a>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
        {/* End We Help Section */}

        {/* Start Popular Product */}
        <div className="popular-product py-5"
          ref={popular_ref}
          style={{
            transform: isInPopularView ? "none" : "translateX(-500px)",
            opacity: isInPopularView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1s",
          }}
        >
          
          <div className="container">
            <h2 className="section-title mb-4">
                Our Popular Products
            </h2>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0"
                ref={popular_ref}
                style={{
                  transform: isInPopularView ? "none" : "translateY(200px)",
                  opacity: isInPopularView ? 1 : 0,
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1.5s",
                }}
              >
                <div className="product-item-sm d-flex">
                  <div className="thumbnail">
                    <img
                      src="images/product-1.png"
                      alt="Image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="pt-3">
                    <h3>Nordic Chair</h3>
                    <p>Minimalist and modern Nordic chair, blending simplicity with comfort and style.
                      {" "}
                    </p>
                    <p>
                      <a href="#">Read More</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0"
                ref={popular_ref}
                style={{
                  transform: isInPopularView ? "none" : "translateY(200px)",
                  opacity: isInPopularView ? 1 : 0,
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 2s",
                }}
              >
                <div className="product-item-sm d-flex">
                  <div className="thumbnail">
                    <img
                      src="images/product-2.png"
                      alt="Image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="pt-3">
                    <h3>Kruzo Aero Chair</h3>
                    <p>
                    Sleek and sophisticated Kruzo Aero Chair, combining ergonomic design...{" "}
                    </p>
                    <p>
                      <a href="#">Read More</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0"
                ref={popular_ref}
                style={{
                  transform: isInPopularView ? "none" : "translateY(200px)",
                  opacity: isInPopularView ? 1 : 0, 
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 2.5s",
                }}
              >
                <div className="product-item-sm d-flex">
                  <div className="thumbnail">
                    <img
                      src="images/product-3.png"
                      alt="Image"
                      className="img-fluid"
                    />
                  </div>
                  <div className="pt-3">
                    <h3>Ergonomic Chair</h3>
                    <p>
                    Ergonomic and modern Ergonomic Chair, designed for comfort and style...{" "}
                    </p>
                    <p>
                      <a href="#">Read More</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Popular Product */}

        {/* Start Testimonial Slider */}

        {/* <div className="testimonial-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 mx-auto text-center">
                <h2 className="section-title">Testimonials</h2>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-12">
                <div className="testimonial-slider-wrap text-center">
                  <div id="testimonial-nav">
                    <span className="prev" data-controls="prev">
                      <span className="fa fa-chevron-left" />
                    </span>
                    <span className="next" data-controls="next">
                      <span className="fa fa-chevron-right" />
                    </span>
                  </div>
                  {/*<div className="testimonial-slider">
                  
                    {/* <div className="item">
                      <div className="row justify-content-center">
                        <div className="col-lg-8 mx-auto">
                          <div className="testimonial-block text-center">
                            <blockquote className="mb-5">
                              <p>
                                “Donec facilisis quam ut purus rutrum lobortis.
                                Donec vitae odio quis nisl dapibus malesuada.
                                Nullam ac aliquet velit. Aliquam vulputate velit
                                imperdiet dolor tempor tristique. Pellentesque
                                habitant morbi tristique senectus et netus et
                                malesuada fames ac turpis egestas. Integer
                                convallis volutpat dui quis scelerisque.”
                              </p>
                            </blockquote>
                            <div className="author-info">
                              <div className="author-pic">
                                <img
                                  src="images/person-1.png"
                                  alt="Maria Jones"
                                  className="img-fluid"
                                />
                              </div>
                              <h3 className="font-weight-bold">Maria Jones</h3>
                              <span className="position d-block mb-3">
                                CEO, Co-Founder, XYZ Inc.
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    {/* END item */}
                    {/* <div className="item">
                      <div className="row justify-content-center">
                        <div className="col-lg-8 mx-auto">
                          <div className="testimonial-block text-center">
                            <blockquote className="mb-5">
                              <p>
                                “Donec facilisis quam ut purus rutrum lobortis.
                                Donec vitae odio quis nisl dapibus malesuada.
                                Nullam ac aliquet velit. Aliquam vulputate velit
                                imperdiet dolor tempor tristique. Pellentesque
                                habitant morbi tristique senectus et netus et
                                malesuada fames ac turpis egestas. Integer
                                convallis volutpat dui quis scelerisque.”
                              </p>
                            </blockquote>
                            <div className="author-info">
                              <div className="author-pic">
                                <img
                                  src="images/person-1.png"
                                  alt="Maria Jones"
                                  className="img-fluid"
                                />
                              </div>
                              <h3 className="font-weight-bold">Maria Jones</h3>
                              <span className="position d-block mb-3">
                                CEO, Co-Founder, XYZ Inc.
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    {/* END item */}
                    {/* <div className="item">
                      <div className="row justify-content-center">
                        <div className="col-lg-8 mx-auto">
                          <div className="testimonial-block text-center">
                            <blockquote className="mb-5">
                              <p>
                                “Donec facilisis quam ut purus rutrum lobortis.
                                Donec vitae odio quis nisl dapibus malesuada.
                                Nullam ac aliquet velit. Aliquam vulputate velit
                                imperdiet dolor tempor tristique. Pellentesque
                                habitant morbi tristique senectus et netus et
                                malesuada fames ac turpis egestas. Integer
                                convallis volutpat dui quis scelerisque.”
                              </p>
                            </blockquote>
                            <div className="author-info">
                              <div className="author-pic">
                                <img
                                  src="images/person-1.png"
                                  alt="Maria Jones"
                                  className="img-fluid"
                                />
                              </div>
                              <h3 className="font-weight-bold">Maria Jones</h3>
                              <span className="position d-block mb-3">
                                CEO, Co-Founder, XYZ Inc.
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    {/* END item */}
                  {/* </div> */} 
                {/* </div> */}
              {/* </div> */}
            {/* </div> */}
          {/* </div> */}
        {/* </div> */}
        
        {/* End Testimonial Slider */}

        {/* Start Blog Section */}
        <div className="blog-section"
          ref={blog_ref}
          style={{ 
            transform: isInBlogView ? "none" : "translateX(-500px)",
            opacity: isInBlogView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
        >
          <div className="container">
            <div className="row mb-5">
              <div className="col-md-6">
                <h2 className="section-title">Recent Blog</h2>
              </div>
              <div className="col-md-6 text-start text-md-end">
                <a href="#" className="more">
                  View All Posts
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0"
                ref={blog_ref}
                style={{ 
                  transform: isInBlogView ? "none" : "translateY(200px)",
                  opacity: isInBlogView ? 1 : 0,
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1s",
                }}
                >
                <div className="post-entry">
                  <a href="#" className="post-thumbnail">
                    <img
                      src="images/post-1.jpg"
                      alt="Image"
                      className="img-fluid"
                    />
                  </a>
                  <div className="post-content-entry">
                    <h3>
                      <a href="#">First Time Home Owner Ideas</a>
                    </h3>
                    <div className="meta">
                      <span>
                        by <a href="#">Kristin Watson</a>
                      </span>{" "}
                      <span>
                        on <a href="#">Dec 19, 2021</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0"
                ref={blog_ref}
                style={{ 
                  transform: isInBlogView ? "none" : "translateY(200px)",
                  opacity: isInBlogView ? 1 : 0,
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 1.5s",
                }}
                >
                <div className="post-entry">
                  <a href="#" className="post-thumbnail">
                    <img
                      src="images/post-2.jpg"
                      alt="Image"
                      className="img-fluid"
                    />
                  </a>
                  <div className="post-content-entry">
                    <h3>
                      <a href="#">How To Keep Your Furniture Clean</a>
                    </h3>
                    <div className="meta">
                      <span>
                        by <a href="#">Robert Fox</a>
                      </span>{" "}
                      <span>
                        on <a href="#">Dec 15, 2021</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 mb-4 mb-md-0"
                ref={blog_ref}
                style={{ 
                  transform: isInBlogView ? "none" : "translateY(200px)",
                  opacity: isInBlogView ? 1 : 0,
                  transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 2s",
                }}
                >
                <div className="post-entry">
                  <a href="#" className="post-thumbnail">
                    <img
                      src="images/post-3.jpg"
                      alt="Image"
                      className="img-fluid"
                    />
                  </a>
                  <div className="post-content-entry">
                    <h3>
                      <a href="#">Small Space Furniture Apartment Ideas</a>
                    </h3>
                    <div className="meta">
                      <span>
                        by <a href="#">Kristin Watson</a>
                      </span>{" "}
                      <span>
                        on <a href="#">Dec 12, 2021</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Blog Section */}
      </div>
    </>
  );
};

export default Home;
