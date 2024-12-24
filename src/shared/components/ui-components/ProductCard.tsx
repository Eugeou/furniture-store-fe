import React from "react";
import { ProductGet } from "../../../Api/types/entities/product-entity";

export type ProductCardProps = {
  product: ProductGet;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Lấy số đầu tiên từ DisplayPrice và định dạng
  const formatPrice = (price: string) => {
    const firstPrice = price.split(" - ")[0]; // Lấy số đầu tiên
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(Number(firstPrice));
  };

  return (
    <div className="col-12 col-md-4 col-lg-3 mb-5">
      <a className="product-item border rounded" href={`/products/${product.Id}`}>
        {/* Product Image */}
        <img
          src={product.ImageSource || "images/default-product.png"}
          alt={product.ProductName}
          className="img-fluid product-thumbnail"
        />

        {/* Product Title */}
        <h3 className="product-title font-weight-bold">{product.ProductName}</h3>

        {/* Product Price */}
        <strong className="product-price">
          {product.Discount ? (
            <div className="d-flex flex-column align-items-center">
              <span className="text-decoration-line-through text-gray-500 mr-2">
                {formatPrice(product.DisplayPrice)}
              </span>
              <span className="text-primary">
                {formatPrice(
                  (Number(product.DisplayPrice.split(" - ")[0]) * (1 - product.Discount / 100)).toString()
                )}
              </span>
            </div>
          ) : (
            formatPrice(product.DisplayPrice)
          )}
        </strong>

        {/* Product Brand */}
        <p className="text-sm text-gray-500">{product.BrandName}</p>

        {/* Cross Icon */}
        <span className="icon-cross">
          <img src="images/cross.svg" className="img-fluid" alt="Cross Icon" />
        </span>
      </a>
    </div>
  );
};

export default ProductCard;
