import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/CartSlice";
import { toast, Bounce } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "../assets/user.css";

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cart);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // const handlePlaceOrder = async () => {
  //   try {
  //     const userId = localStorage.getItem("id");
  //     if (!userId) {
  //       toast.error("User not logged in!", { theme: "dark" });
  //       return;
  //     }
  
  //     if (cartItems.length === 0) {
  //       toast.warn("Your cart is empty!", { theme: "dark" });
  //       return;
  //     }
  
  //     const orderPayload = {
  //       userId,
  //       products: cartItems.map(item => ({
  //         productId: item._id,
  //         quantity: item.quantity,
  //       })),
  //       totalAmount: getTotalPrice(),
  //       orderDate: new Date(),
  //     };
  
  //     // Send order to backend
  //     await axios.post("/order/add", orderPayload);
  
  //     toast.success("✅ Order placed successfully!", {
  //       position: "top-center",
  //       autoClose: 1500,
  //       theme: "dark",
  //       transition: Bounce,
  //     });
  
  //     // Optional: clear cart in Redux and redirect to confirmation
  //     // dispatch(clearCart());
  //     setTimeout(() => {
  //       // navigate("/order-success");
  //     }, 1500);
  
  //   } catch (error) {
  //     console.error("Order error:", error);
  //     toast.error("❌ Failed to place order", { theme: "dark" });
  //   }
  // };
  
  const handleRemove = (id, name) => {
    dispatch(removeFromCart(id));
    toast.success(`🛒 ${name} removed from cart!`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  return (
    <div className="shopping-cart-wrapper">
      <div className="shopping-cart-box">
        {/* Back Button */}
        <button className="shopping-cart-back" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <h2 className="shopping-cart-title">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p className="shopping-cart-empty">Your cart is empty</p>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <div key={index} className="shopping-cart-item">
                <img
                  src={item.productURL}
                  alt={item.productName}
                  onError={(e) => (e.target.src = "fallback-image.jpg")}
                  className="shopping-cart-img"
                />
                <div className="shopping-cart-details">
                  <p className="shopping-cart-name">{item.productName}</p>
                  <p className="shopping-cart-price">₹{item.price.toFixed(2)}</p>
                  <div className="shopping-cart-quantity">
                    <button type="button" onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>-</button>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(item._id, Number(e.target.value))}
                      className="quantity-input"
                    />
                    <button type="button" onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button
                  type="button"
                  className="shopping-cart-remove"
                  onClick={() => handleRemove(item._id, item.productName)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="shopping-cart-summary">
        <h3 className="summary-title">Cart Totals</h3>
        <p className="shopping-cart-subtotal">
          <span>Subtotal:</span>
          <span>₹{getTotalPrice().toFixed(2)}</span>
        </p>
        <Link to={"/order"}>
        <button className="shopping-cart-checkout">Proceed to Order</button>
        </Link>
      </div>
    </div>
  );
};
 