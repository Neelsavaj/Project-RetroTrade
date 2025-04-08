import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { clearCart } from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "../assets/user.css";

const PlaceOrder = () => {
    const cart = useSelector((state) => state.cart.cart);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    if (!user || !user._id) {
        return <p className="text-danger text-center mt-5">Please log in to place an order.</p>;
    }

    if (cart.length === 0) {
        return <p className="text-center mt-5">Your cart is empty.</p>;
    }

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            const orderData = {
                products: cart.map((product) => ({
                    productId: product._id,
                    quantity: product.quantity,
                })),
                userId: user._id,
                totalAmount: totalAmount,
                orderDate: new Date().toISOString(),
            };

            await axios.post("/order/add", orderData);

            toast.success("✅ Welcome To Payment Section", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                transition: Bounce,
            });

            dispatch(clearCart());

            setTimeout(() => {
                navigate("/payment");
            }, 2000); // delay to allow toast to show

        } catch (error) {
            console.error("Order placement failed:", error);
            toast.error("❌ Failed to place order.", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
                transition: Bounce,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container place-order-container">
            <button className="shopping-cart-back" onClick={() => navigate(-1)}>
          ← Back
        </button>
            <h2 className="order-title">Review Your Order</h2>
            <div className="row">
                <div className="col-md-8">
                    {cart.map((item) => (
                        <div className="card order-card" key={item._id}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img
                                        src={item.productURL}
                                        alt={item.productName}
                                        className="img-fluid order-image"
                                    />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{item.productName}</h5>
                                        <p className="card-text">{item.productDescription}</p>
                                        <p className="card-text">
                                            <strong>Price:</strong> ₹{item.price} <br />
                                            <strong>Quantity:</strong> {item.quantity} <br />
                                            <strong>Subtotal:</strong> ₹{item.price * item.quantity}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md-4">
                    <div className="card order-summary-card">
                        <h4>Order Summary</h4>
                        <p><strong>Total Items:</strong> {cart.length}</p>
                        <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
                        <button
                            onClick={handlePlaceOrder}
                            className="btn btn-primary order-button"
                            disabled={loading}
                        >
                            {loading ? "Placing Order..." : "Pay Now"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrder;
