import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSWR from "swr";
import useDebounce from "../Api/hooks/useDebounce";
import { getCart, updateCart, deleteCart } from "../Api/services/cart-service";
import { GetDetailProduct } from "../Api/services/product-service";
import { Cart } from "../Api/types/entities/cart-entity";
import { toast } from "react-toastify";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [productImages, setProductImages] = useState<Record<string, string>>({});
  const userId = localStorage.getItem("userId");

  const { data: cartData, mutate } = useSWR(userId ? `/cart/${userId}` : null, () =>
    getCart(userId!)
  );

  // Fetch cart data and product images
  useEffect(() => {
    if (cartData?.data) {
      setCartItems(cartData.data);
      const fetchImages = async () => {
        const images: Record<string, string> = {};
        for (const item of cartData.data) {
          const productDetail = await GetDetailProduct(item.ProductId);
          images[item.ProductId] = productDetail.ImageSource;
        }
        setProductImages(images);
      };
      fetchImages();
    }
  }, [cartData]);

  // Handle quantity change
  const handleQuantityChange = (cartItemId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.Id === cartItemId ? { ...item, Quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  // Debounced update
  const debouncedCartItems = useDebounce(cartItems, 300);

  useEffect(() => {
    const updateCartItems = async () => {
      for (const item of debouncedCartItems) {
        try {
          await updateCart(item.Id, item.Quantity);
        } catch (error) {
          toast.error(`Failed to update ${item.ProductName}`);
        }
      }
      mutate(); // Refresh cart data
    };

    if (debouncedCartItems.length > 0) {
      updateCartItems();
    }
  }, [debouncedCartItems, mutate]);

  // Handle remove item
  const handleRemoveItem = async (cartItemId: string) => {
    try {
      await deleteCart(cartItemId);
      toast.success("Item removed successfully");
      mutate(); // Refresh cart data
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  // Calculate total when cartItems changes
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.Quantity * item.Price, 0);
    setCartTotal(total);
  }, [cartItems]);


  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <div className="container">
          <h1>Cart</h1>
        </div>
      </div>
      {/* Cart Table */}
      <div className="container mt-5">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Dimension</th>
                <th>Color</th>
                <th>Price</th>
                <th>Quantity</th>
                {/* <th>Subtotal</th> */}
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.Id}>
                  <td>
                    <img
                      src={productImages[item.ProductId] || ""}
                      alt={item.ProductName}
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td>{item.ProductName}</td>
                  <td>{item.Dimension}</td>
                  <td>{item.ColorName}</td>
                  <td>{item.Price.toLocaleString()} ₫</td>
                  <td>
                    <div
                      className="input-group mb-3 d-flex align-items-center justify-content-between quantity-container"
                      style={{ maxWidth: 150 }}
                    >
                      
                      <div className="input-group-prepend">
                         <button className="btn btn-outline-black decrease" type="button" onClick={() =>
                          handleQuantityChange(item.Id, item.Quantity - 1)
                        }
                        disabled={item.Quantity <= 1}>−</button>
                    </div>
                      <input
                        type="text"
                        value={item.Quantity}
                        defaultValue={1}
                        readOnly
                        className="form-control text-center quantity-amount"
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-black increase"
                          type="button"
                          onClick={() =>
                            handleQuantityChange(item.Id, item.Quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                    </div>
                    {/* <div className="input-group mb-3 d-flex align-items-center quantity-container" style={{maxWidth: 120}}>
                      <div className="input-group-prepend">
                         <button className="btn btn-outline-black decrease" type="button">−</button>
                       </div>
                       <input type="text" className="form-control text-center quantity-amount" defaultValue={1} aria-label="Example text with button addon" aria-describedby="button-addon1" />
                       <div className="input-group-append">
                         <button className="btn btn-outline-black increase" type="button">+</button>
                       </div>
                     </div> */}
                  </td>
                  {/* <td>{item.SubTotal.toLocaleString()} ₫</td> */}
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRemoveItem(item.Id)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Cart Total */}
        <div className="text-right">
          <h4>Total: {cartTotal.toLocaleString()} ₫</h4>
        </div>
        {/* Actions */}
        <div className="mt-3">
          <button
            className="btn btn-primary"
            onClick={() =>
              navigate("/order", { state: { subtotal: cartTotal } })
            }
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;




// import React from "react";
// import { Link } from "react-router-dom";

// const Cart = ()=>{
//   return(
//     <>
//     <div>
//   {/* Start Hero Section */}
//   <div className="hero">
//     <div className="container">
//       <div className="row justify-content-between">
//         <div className="col-lg-5">
//           <div className="intro-excerpt">
//             <h1>Cart</h1>
//           </div>
//         </div>
//         <div className="col-lg-7">
//         </div>
//       </div>
//     </div>
//   </div>
//   {/* End Hero Section */}
//   <div className="untree_co-section before-footer-section">
//     <div className="container">
//       <div className="row mb-5">
//         <form className="col-md-12" method="post">
//           <div className="site-blocks-table">
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th className="product-thumbnail">Image</th>
//                   <th className="product-name">Product</th>
//                   <th className="product-price">Price</th>
//                   <th className="product-quantity">Quantity</th>
//                   <th className="product-total">Total</th>
//                   <th className="product-remove">Remove</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="product-thumbnail">
//                     <img src="images/product-1.png" alt="Image" className="img-fluid" />
//                   </td>
//                   <td className="product-name">
//                     <h2 className="h5 text-black">Product 1</h2>
//                   </td>
//                   <td>$49.00</td>
//                   <td>
//                     <div className="input-group mb-3 d-flex align-items-center quantity-container" style={{maxWidth: 120}}>
//                       <div className="input-group-prepend">
//                         <button className="btn btn-outline-black decrease" type="button">−</button>
//                       </div>
//                       <input type="text" className="form-control text-center quantity-amount" defaultValue={1} placeholder aria-label="Example text with button addon" aria-describedby="button-addon1" />
//                       <div className="input-group-append">
//                         <button className="btn btn-outline-black increase" type="button">+</button>
//                       </div>
//                     </div>
//                   </td>
//                   <td>$49.00</td>
//                   <td><a href="#" className="btn btn-black btn-sm">X</a></td>
//                 </tr>
//                 <tr>
//                   <td className="product-thumbnail">
//                     <img src="images/product-2.png" alt="Image" className="img-fluid" />
//                   </td>
//                   <td className="product-name">
//                     <h2 className="h5 text-black">Product 2</h2>
//                   </td>
//                   <td>$49.00</td>
//                   <td>
//                     <div className="input-group mb-3 d-flex align-items-center quantity-container" style={{maxWidth: 120}}>
//                       <div className="input-group-prepend">
//                         <button className="btn btn-outline-black decrease" type="button">−</button>
//                       </div>
//                       <input type="text" className="form-control text-center quantity-amount" defaultValue={1} placeholder aria-label="Example text with button addon" aria-describedby="button-addon1" />
//                       <div className="input-group-append">
//                         <button className="btn btn-outline-black increase" type="button">+</button>
//                       </div>
//                     </div>
//                   </td>
//                   <td>$49.00</td>
//                   <td><a href="#" className="btn btn-black btn-sm">X</a></td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </form>
//       </div>
//       <div className="row">
//         <div className="col-md-6">
//           <div className="row mb-5">
//             <div className="col-md-6 mb-3 mb-md-0">
//               <button className="btn btn-black btn-sm btn-block">Update Cart</button>
//             </div>
//             <div className="col-md-6">
//               <button className="btn btn-outline-black btn-sm btn-block">Continue Shopping</button>
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-12">
//               <label className="text-black h4" htmlFor="coupon">Coupon</label>
//               <p>Enter your coupon code if you have one.</p>
//             </div>
//             <div className="col-md-8 mb-3 mb-md-0">
//               <input type="text" className="form-control py-3" id="coupon" placeholder="Coupon Code" />
//             </div>
//             <div className="col-md-4">
//               <button className="btn btn-black">Apply Coupon</button>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-6 pl-5">
//           <div className="row justify-content-end">
//             <div className="col-md-7">
//               <div className="row">
//                 <div className="col-md-12 text-right border-bottom mb-5">
//                   <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
//                 </div>
//               </div>
//               <div className="row mb-3">
//                 <div className="col-md-6">
//                   <span className="text-black">Subtotal</span>
//                 </div>
//                 <div className="col-md-6 text-right">
//                   <strong className="text-black">$230.00</strong>
//                 </div>
//               </div>
//               <div className="row mb-5">
//                 <div className="col-md-6">
//                   <span className="text-black">Total</span>
//                 </div>
//                 <div className="col-md-6 text-right">
//                   <strong className="text-black">$230.00</strong>
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-md-12">
//                   <button className="btn btn-black btn-lg py-3 btn-block" onclick="window.location='checkout'">Proceed To Checkout</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//     </>

//     )
// }


// export default Cart;