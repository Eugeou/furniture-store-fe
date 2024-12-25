import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { BASE_API } from "../shared/components/constants/app";
import { GetAllProducts } from "../Api/services/product-service";
import { GetAllCategory } from "../Api/services/category-service";
import { GetAllBrand } from "../Api/services/brand-service";
import ProductCard from "../shared/components/ui-components/ProductCard";
import { Input, Select, Button, Form, Row, Col, Image, Flex } from "antd";

const { Option } = Select;

const Shop = ()=>{
  const { data: products, isLoading } = useSWR(`${BASE_API}/product`, GetAllProducts, { fallbackData: [] });
  const { data: categories, isLoadingCategories } = useSWR(`${BASE_API}/category`, GetAllCategory, { fallbackData: [] });
  const { data: brands, isLoadingBrands } = useSWR(`${BASE_API}/brand`, GetAllBrand, { fallbackData: [] });
  console.log(products);

  const [filters, setFilters] = useState({
    sort: "default",
    brands: [],
    categories: [],
    searchText: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredProducts = products.filter((product) => {
    // Lọc theo tên
    const matchesName = product.ProductName.toLowerCase().includes(filters.searchText.toLowerCase());

    // Lọc theo brand
    const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.BrandName);

    // Lọc theo category
    const matchesCategory =
      filters.categories.length === 0 || filters.categories.includes(product.CategoryName);

    return matchesName && matchesBrand && matchesCategory;
  });

  // Sắp xếp sản phẩm
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (filters.sort === "lowToHigh") return a.DisplayPrice - b.DisplayPrice;
    if (filters.sort === "highToLow") return b.DisplayPrice - a.DisplayPrice;
    return 0;
  });


  return(
    <>
    <div>
      {/* Start Hero Section */}
      <div className="hero">
        
        <div className="container">
          <div className="row justify-content-between">
            <div>
              
                <h1>Shopping</h1>
                <p className="font-weight-bold text-white">Discover the best furniture in the world. Choose from our wide range of products.</p>
                <hr style={{ width: "100%", marginBottom: "30px" }}></hr>
                <div className="flex-row border border-white p-4" style={{ width: "100%", marginTop: "30px", borderRadius: "10px" }}>
                  <p className="text-white font-weight-bold">Filter by:</p>
                  {/* Bộ lọc */}
                  <Form layout="vertical" className="mb-4">
                    <Row gutter={16}>
                      {/* Lọc theo tên sản phẩm */}
                      <Col xs={24} md={12} lg={6}>
                        <Form.Item label={<p className="text-white">Find a product</p>} >
                          <Input
                            placeholder="Please enter product name"
                            value={filters.searchText}
                            onChange={(e) => handleFilterChange("searchText", e.target.value)}
                          />
                        </Form.Item>
                      </Col>

                      {/* Lọc theo giá */}
                      <Col xs={24} md={12} lg={6}>
                        <Form.Item label={<p className="text-white">Sort by prices</p>}>
                          <Select
                            placeholder="Please choose a sorting method"
                            value={filters.sort}
                            onChange={(value) => handleFilterChange("sort", value)}
                          >
                            <Option value="default">Default</Option>
                            <Option value="lowToHigh">Price low to high</Option>
                            <Option value="highToLow">Price high to low</Option>
                          </Select>
                        </Form.Item>
                      </Col>

                      {/* Lọc theo brand */}
                      <Col xs={24} md={12} lg={6}>
                        <Form.Item label={<p className="text-white">Brands</p>}>
                          <Select
                            mode="multiple"
                            placeholder="Please choose a brand"
                            value={filters.brands}
                            onChange={(value) => handleFilterChange("brands", value)}
                            loading={isLoadingBrands}
                            height="50px"
                        
                          >
                            {Array.from(new Set(brands.map((p) => p.BrandName))).map((brand) => (
                              <Option key={brand} value={brand}>
                                <Flex
                                  alignItems="center"
                                  justifyContent="space-between"
                              
                                  //style={{ width: "100%", height: "100%" }}
                                >
                                  <Image src={brands.find((b) => b.BrandName === brand).ImageSource} width={20} height={20} />
                                  <p style={{ width: "25px", height: "25px", marginLeft: "15px" }}>{brand}</p>
                                </Flex>
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>

                      {/* Lọc theo category */}
                      <Col xs={24} md={12} lg={6}>
                        <Form.Item label={<p className="text-white">Categories</p>}>
                          <Select
                            mode="multiple"
                            placeholder="Please choose a category"
                            value={filters.categories}
                            onChange={(value) => handleFilterChange("categories", value)}
                            loading={isLoadingCategories}
                          >
                            {categories.map((category) => (
                              <Option key={category.Id} value={category.CategoryName}>
                                <Flex
                                  alignItems="center"
                                  justifyContent="space-between"
                              
                                  //style={{ width: "100%", height: "100%" }}
                                >
                                  <Image src={categories.find((c) => c.CategoryName === category.CategoryName).ImageSource} width={20} height={20} />
                                  <p style={{ width: "25px", height: "25px", marginLeft: "15px" }}>{category.CategoryName}</p>
                                </Flex>
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </div>
              
            </div>
            
          </div>
        </div>
      </div>
      {/* End Hero Section */}
      <div className="untree_co-section product-section before-footer-section">
        <div className="container">
          <div className="row">
            {sortedProducts.map((product) => (
              <ProductCard key={product.Id} product={product} />
            ))}
            {/* Start Column 1 */}
            <div className="col-12 col-md-4 col-lg-3 mb-5">
              <a className="product-item" href="#">
                <img src="images/product-3.png" className="img-fluid product-thumbnail" />
                <h3 className="product-title">Nordic Chair</h3>
                <strong className="product-price">$50.00</strong>
                <span className="icon-cross">
                  <img src="images/cross.svg" className="img-fluid" />
                </span>
              </a>
            </div> 
            {/* End Column 1 */}
            {/* Start Column 2 */}
            {/* <div className="col-12 col-md-4 col-lg-3 mb-5">
              <a className="product-item" href="#">
                <img src="images/product-1.png" className="img-fluid product-thumbnail" />
                <h3 className="product-title">Nordic Chair</h3>
                <strong className="product-price">$50.00</strong>
                <span className="icon-cross">
                  <img src="images/cross.svg" className="img-fluid" />
                </span>
              </a>
            </div>  */}
            {/* End Column 2 */}
            {/* Start Column 3 */}
            {/* <div className="col-12 col-md-4 col-lg-3 mb-5">
              <a className="product-item" href="#">
                <img src="images/product-2.png" className="img-fluid product-thumbnail" />
                <h3 className="product-title">Kruzo Aero Chair</h3>
                <strong className="product-price">$78.00</strong>
                <span className="icon-cross">
                  <img src="images/cross.svg" className="img-fluid" />
                </span>
              </a>
            </div> */}
            {/* End Column 3 */}
            {/* Start Column 4 */}
            {/* <div className="col-12 col-md-4 col-lg-3 mb-5">
              <a className="product-item" href="#">
                <img src="images/product-3.png" className="img-fluid product-thumbnail" />
                <h3 className="product-title">Ergonomic Chair</h3>
                <strong className="product-price">$43.00</strong>
                <span className="icon-cross">
                  <img src="images/cross.svg" className="img-fluid" />
                </span>
              </a>
            </div> */}
            {/* End Column 4 */}
            {/* Start Column 1 */}
            {/* <div className="col-12 col-md-4 col-lg-3 mb-5">
              <a className="product-item" href="#">
                <img src="images/product-3.png" className="img-fluid product-thumbnail" />
                <h3 className="product-title">Nordic Chair</h3>
                <strong className="product-price">$50.00</strong>
                <span className="icon-cross">
                  <img src="images/cross.svg" className="img-fluid" />
                </span>
              </a>
            </div>  */}
            {/* End Column 1 */}
            {/* Start Column 2 */}
            {/* <div className="col-12 col-md-4 col-lg-3 mb-5">
              <a className="product-item" href="#">
                <img src="images/product-1.png" className="img-fluid product-thumbnail" />
                <h3 className="product-title">Nordic Chair</h3>
                <strong className="product-price">$50.00</strong>
                <span className="icon-cross">
                  <img src="images/cross.svg" className="img-fluid" />
                </span>
              </a>
            </div>  */}
            {/* End Column 2 */}
            {/* Start Column 3 */}
            {/* <div className="col-12 col-md-4 col-lg-3 mb-5">
              <a className="product-item" href="#">
                <img src="images/product-2.png" className="img-fluid product-thumbnail" />
                <h3 className="product-title">Kruzo Aero Chair</h3>
                <strong className="product-price">$78.00</strong>
                <span className="icon-cross">
                  <img src="images/cross.svg" className="img-fluid" />
                </span>
              </a>
            </div> */}
            {/* End Column 3 */}
            {/* Start Column 4 */}
            {/* <div className="col-12 col-md-4 col-lg-3 mb-5">
              <a className="product-item" href="#">
                <img src="images/product-3.png" className="img-fluid product-thumbnail" />
                <h3 className="product-title">Ergonomic Chair</h3>
                <strong className="product-price">$43.00</strong>
                <span className="icon-cross">
                  <img src="images/cross.svg" className="img-fluid" />
                </span>
              </a>
            </div> */}
            {/* End Column 4 */}
          </div>
        </div>
      </div>
    </div>

    </>

    )
}


export default Shop;