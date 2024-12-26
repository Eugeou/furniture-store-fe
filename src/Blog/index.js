import React from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

const Blog = ()=>{
  const hero_ref = useRef();
  const isInHeroView = useInView(hero_ref, { once: true });

  return(
    <>
    <div>
  {/* Start Hero Section */}
  <motion.div 
    layout
    className="hero"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    ref={hero_ref}
    transition={{ duration: 1.5 }}
  >
    <div className="container" ref={hero_ref}
            style={{
              transform: isInHeroView ? "translateY(0px)" : "translateY(200px)",
              opacity: isInHeroView ? 1 : 0,
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
            }}>
      <div className="row justify-content-between">
        <div className="col-lg-5">
          <div className="intro-excerpt">
            <h1>Blog</h1>
            <p className="mb-4">Read our blog for the latest updates and news about modern interior design. We offer a wide range of services to help you create your dream space with our elegant, modern, and high-quality furniture.</p>
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
  {/* Start Blog Section */}
  <div className="blog-section">
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-6 col-md-4 mb-5">
          <div className="post-entry">
            <a href="#" className="post-thumbnail"><img src="images/post-1.jpg" alt="Image" className="img-fluid" /></a>
            <div className="post-content-entry">
              <h3><a href="#">First Time Home Owner Ideas</a></h3>
              <div className="meta">
                <span>by <a href="#">Kristin Watson</a></span> <span>on <a href="#">Dec 19, 2021</a></span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 mb-5">
          <div className="post-entry">
            <a href="#" className="post-thumbnail"><img src="images/post-2.jpg" alt="Image" className="img-fluid" /></a>
            <div className="post-content-entry">
              <h3><a href="#">How To Keep Your Furniture Clean</a></h3>
              <div className="meta">
                <span>by <a href="#">Robert Fox</a></span> <span>on <a href="#">Dec 15, 2021</a></span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 mb-5">
          <div className="post-entry">
            <a href="#" className="post-thumbnail"><img src="images/post-3.jpg" alt="Image" className="img-fluid" /></a>
            <div className="post-content-entry">
              <h3><a href="#">Small Space Furniture Apartment Ideas</a></h3>
              <div className="meta">
                <span>by <a href="#">Kristin Watson</a></span> <span>on <a href="#">Dec 12, 2021</a></span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 mb-5">
          <div className="post-entry">
            <a href="#" className="post-thumbnail"><img src="images/post-1.jpg" alt="Image" className="img-fluid" /></a>
            <div className="post-content-entry">
              <h3><a href="#">First Time Home Owner Ideas</a></h3>
              <div className="meta">
                <span>by <a href="#">Kristin Watson</a></span> <span>on <a href="#">Dec 19, 2021</a></span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 mb-5">
          <div className="post-entry">
            <a href="#" className="post-thumbnail"><img src="images/post-2.jpg" alt="Image" className="img-fluid" /></a>
            <div className="post-content-entry">
              <h3><a href="#">How To Keep Your Furniture Clean</a></h3>
              <div className="meta">
                <span>by <a href="#">Robert Fox</a></span> <span>on <a href="#">Dec 15, 2021</a></span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 mb-5">
          <div className="post-entry">
            <a href="#" className="post-thumbnail"><img src="images/post-3.jpg" alt="Image" className="img-fluid" /></a>
            <div className="post-content-entry">
              <h3><a href="#">Small Space Furniture Apartment Ideas</a></h3>
              <div className="meta">
                <span>by <a href="#">Kristin Watson</a></span> <span>on <a href="#">Dec 12, 2021</a></span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 mb-5">
          <div className="post-entry">
            <a href="#" className="post-thumbnail"><img src="images/post-1.jpg" alt="Image" className="img-fluid" /></a>
            <div className="post-content-entry">
              <h3><a href="#">First Time Home Owner Ideas</a></h3>
              <div className="meta">
                <span>by <a href="#">Kristin Watson</a></span> <span>on <a href="#">Dec 19, 2021</a></span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 mb-5">
          <div className="post-entry">
            <a href="#" className="post-thumbnail"><img src="images/post-2.jpg" alt="Image" className="img-fluid" /></a>
            <div className="post-content-entry">
              <h3><a href="#">How To Keep Your Furniture Clean</a></h3>
              <div className="meta">
                <span>by <a href="#">Robert Fox</a></span> <span>on <a href="#">Dec 15, 2021</a></span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-4 mb-5">
          <div className="post-entry">
            <a href="#" className="post-thumbnail"><img src="images/post-3.jpg" alt="Image" className="img-fluid" /></a>
            <div className="post-content-entry">
              <h3><a href="#">Small Space Furniture Apartment Ideas</a></h3>
              <div className="meta">
                <span>by <a href="#">Kristin Watson</a></span> <span>on <a href="#">Dec 12, 2021</a></span>
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

    )
}


export default Blog;