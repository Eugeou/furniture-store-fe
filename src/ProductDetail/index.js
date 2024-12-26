import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { BASE_API } from "../shared/components/constants/app";
import { Image, Button, Input, Tag } from "antd";
import { GetAllProducts } from "../Api/services/product-service";
import ProductCard from "../shared/components/ui-components/ProductCard";
import { useLocation } from "react-router-dom";
import { createCart } from "../Api/services/cart-service";
import { AddToWishlist } from "../Api/services/wishlist-service";
import { notification, Checkbox } from "antd";

import { BsFillShieldFill } from "react-icons/bs";
import { BsCartPlus } from "react-icons/bs";
import { BsExclude } from "react-icons/bs";
import { BsFan } from "react-icons/bs";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { BsFillStickiesFill } from "react-icons/bs";
import { BsFillHeartFill } from "react-icons/bs";
import { BsBook } from "react-icons/bs";
import { toast } from "react-toastify";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";



const ProductDetail = () => {
  // const { id } = useParams(); // Get product ID from route params
  const { data: products } = useSWR(`${BASE_API}/product`, GetAllProducts, { fallbackData: [] });

  const hero_ref = useRef();
  const isInHeroView = useInView(hero_ref, { once: true });

  const navigate = useNavigate();
  //const [quantity, setQuantity] = useState(1);
  //const product = products.find((p) => p.Id === id);
  const location = useLocation();

  const [selectedVariant, setSelectedVariant] = useState(null); // Lưu variant được chọn
  const [quantities, setQuantities] = useState({}); // Lưu số lượng của từng variant

  const product = location.state?.product;
  const userId = localStorage.getItem("userId");

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleQuantityChange = (variantId, change) => {
    setQuantities((prev) => ({
      ...prev,
      [variantId]: Math.max(1, (prev[variantId] || 1) + change),
    }));
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      notification.error({ message: "Vui lòng chọn một variant!" });
      return;
    }
    const quantity = quantities[selectedVariant.Id] || 1;
    if (quantity <= 0) {
      notification.error({ message: "Vui lòng nhập số lượng hợp lệ!" });
      return;
    }
    try {
      await createCart(userId, {
        productId: product.Id,
        colorId: selectedVariant.ColorId,
        dimension: selectedVariant.DisplayDimension,
        quantity,
      });
      toast.success("Thêm sản phẩm vào giỏ hàng thành công!");
    } catch (error) {
      toast.error("Thêm sản phẩm vào giỏ hàng thất bại!");
    }
  };

  const handleBuyNow = async () => {
    if (!selectedVariant) {
      notification.error({ message: "Vui lòng chọn một variant!" });
      return;
    }
    const quantity = quantities[selectedVariant.Id] || 1;
    if (quantity <= 0) {
      notification.error({ message: "Vui lòng nhập số lượng hợp lệ!" });
      return;
    }
    try {
      await createCart(userId, {
        productId: product.Id,
        colorId: selectedVariant.ColorId,
        dimension: selectedVariant.DisplayDimension,
        quantity,
      });
      navigate("/cart");
      //toast.success("Thêm sản phẩm vào giỏ hàng thành công!");
      
    } catch (error) {
      toast.error("Thêm sản phẩm vào giỏ hàng thất bại!");
    }
  };


  const handleAddToWishlist = async () => {
    try {
      await AddToWishlist(userId, product.Id);
      toast.success("Thêm sản phẩm vao wishlist thành công!");
    } catch (error) {
      toast.error("Thêm sản phẩm vào wishlist thất bại!");
    }
  };

  // Suggested products filtered by category
  const suggestedProducts = products.filter((p) => p.CategoryName === product.CategoryName && p.Id !== product.Id);

  // const handleQuantityChange = (change) => {
  //   setQuantity((prev) => Math.max(1, prev + change));
  // };

  const formatPrice = (price) => {
    const firstPrice = price.split(" - ")[0];
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(firstPrice));
  };

  

  return (
    <div className="container mt-5" ref={hero_ref}
    style={{
      transform: isInHeroView ? "translateY(0px)" : "translateY(200px)",
      opacity: isInHeroView ? 1 : 0,
      transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
    }}>
      {/* Product Thumbnail and Info Section */}
      <div className="row">
        {/* Left: Thumbnail and Variant Images */}
        <div className="col-md-6">
          <Image src={product.ImageSource || "images/default-product.png"} alt={product.ProductName} className="img-fluid mb-4 mt-4 border" style={{ borderRadius: "20px" }} />
          <div className="d-flex">
            {product.ProductVariants.map((variant, index) => (
              <Image
                key={index}
                src={variant.ImageSource[0] || "images/default-product.png"}
                alt={`Variant ${index}`}
                className="img-thumbnail mx-1 border border-secondary"
                width={80}
                height={80}
              />
            ))}
          </div>
        </div>
        {/* Right: Product Details */}
        <div className="col-md-6">
          <h1 className="font-weight-bold mt-4">{product.ProductName}</h1>
          <p className="text-muted p-3 border rounded" style={{ backgroundColor: "#f8f9fa", fontSize: "20px" }}>
            <span className="text-decoration-line-through mr-2">
            {formatPrice(product.DisplayPrice)} 
            </span>
            {product.Discount && (
              <span className="text-danger">
                {" "} - {formatPrice((Number(product.DisplayPrice.split(" - ")[0]) * (1 - product.Discount / 100)).toString())}
              </span>
            )}
          </p>
          
          <p>
            <strong> <BsExclude className="text-primary" /> Brand:</strong> {product.BrandName}
          </p>
          <p>
            <strong> <BsFan className="text-primary" /> Category:</strong> {product.CategoryName}
          </p>
          <p>
            <strong> <BsFillPersonLinesFill className="text-primary" /> Designers:</strong> {product.Designers.join(", ")}
          </p>
          <p>
            <strong> <BsFillStickiesFill className="text-primary" /> Materials:</strong> {product.Materials.join(", ")}
          </p>
          <Tag color="success" className="font-weight-bold p-2">
            <BsFillShieldFill className="text-danger" />{" "}
            Shop with Furni with peace of mind {" "}
            
            <span className="text-danger font-weight-bold">15-Day Free Return </span>
          </Tag>
          <div className="d-flex mt-4" style={{ width: "100%" }}>
            <Button type="default" className="mr-4 p-4 text-white" style={{ backgroundColor: "#3b5d50" }} onClick={handleBuyNow}>
              Buy Now
            </Button>
            <Button className="d-flex align-items-center justify-content-center ms-4 p-4 border border-danger"> <BsCartPlus className="mt-1 text-danger fw-bold" />  <p className=" text-center text-danger fw-bold" style={{ height: "100%"}} onClick={handleAddToCart}>Add to Cart</p></Button>
            <Button className="d-flex align-items-center justify-content-center ms-4 p-4 border border-danger"> <BsFillHeartFill className="mt-1 text-danger fw-bold" />  <p className=" text-center text-danger fw-bold" style={{ height: "100%"}} onClick={handleAddToWishlist}>Wishlist</p></Button>
          </div>
        </div>
      </div>

      {/* Product Variants Section */}
      <div className="mt-5">
        <h3>Product Variants</h3>
        {product?.ProductVariants.map((variant) => (
          <div key={variant.Id} className="d-flex justify-content-between align-items-center p-3 mb-3 mt-4" style={{ border: "1px solid #3b5d50", borderRadius: "30px" }}>
            <div className="d-flex align-items-center">
              <Checkbox
                checked={selectedVariant?.Id === variant.Id}
                onChange={() => setSelectedVariant(variant)}
                
              />
              <Image
                src={variant.ImageSource[0] || "images/default-product.png"}
                alt={variant.ColorName}
                className="img-fluid ms-4"
                width={125}
                height={125}
              />
              <div className="ms-5">
                <h4>{variant.ColorName}</h4>
                <p><strong>Size: </strong>{variant.DisplayDimension}</p>
                <p><strong>Price: </strong>{variant.Price}</p>
                <p><strong>Stock: </strong>{variant.Quantity}</p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <Button onClick={() => handleQuantityChange(variant.Id, -1)}>-</Button>
              <Input
                value={quantities[variant.Id] || 1}
                className="mx-2 text-center"
                readOnly
                style={{ width: 50 }}
              />
              <Button onClick={() => handleQuantityChange(variant.Id, 1)}>+</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Details Section */}
      <div className="mt-5">
        <h3>Product Details</h3>
        <div className="p-3 border rounded bg-light">
          <p>
            <strong> <BsExclude className="text-primary" /> Brand:</strong> {product.BrandName}
          </p>
          <p>
            <strong> <BsFan className="text-primary" /> Category:</strong> {product.CategoryName}
          </p>
          <p>
            <strong> <BsFillPersonLinesFill className="text-primary" /> Designers:</strong> {product.Designers.join(", ")}
          </p>
          <p>
            <strong> <BsFillStickiesFill className="text-primary" /> Materials:</strong> {product.Materials.join(", ")}
          </p>
          <p> <strong><BsBook className="text-primary" /> Description </strong> </p>
          <p>{product.Description}</p>
        </div>
        
      </div>

      {/* Suggested Products Section */}
      <div className="mt-5">
        <h3>Suggested Products</h3>
        <div className="container">
          <div className="row">
          {suggestedProducts.map((suggestedProduct) => (
            <ProductCard key={suggestedProduct.Id} product={suggestedProduct} />
          ))}
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default ProductDetail;
