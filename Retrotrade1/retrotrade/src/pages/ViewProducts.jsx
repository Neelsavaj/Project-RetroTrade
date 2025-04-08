import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../assets/user.css";
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartSlice';
import { toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 

export const ViewProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getAllProduct = async () => {
    try {
      const userId = localStorage.getItem("id");
      if (!userId) return;
      const res = await axios.get(`/product/getallproduct`);
      setProducts(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const userId = localStorage.getItem("id");
      if (!userId) {
        toast.error("User not logged in!", { theme: "dark" });
        return;
      }

      // Send product data to backend for cart storage in MongoDB
      await axios.post("/cart/add", {
        userId,
        productId: product._id,
        quantity: 1, // Default quantity
      });

      dispatch(addToCart(product));
      toast.success(`🛒 ${product.productName} added to cart!`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });

      setTimeout(() => {
        navigate("/cart"); // ✅ navigate to cart after short delay
      }, 1500);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding product to cart", { theme: "dark" });
    }
  };

  return (
    <div className='product'>
      <h1>View Products</h1>
      <hr />

      {selectedProduct ? (
        <div className="product-details">
          <button onClick={() => setSelectedProduct(null)} className="back-button">← Back</button>
          <img src={selectedProduct.productURL || "/default-image.png"} alt={selectedProduct.productName} />
          
          <h2>{selectedProduct.productName}</h2>
          <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
          <p><strong>Description:</strong> {selectedProduct.productDescription || "No description available."}</p>
          <button className="cart-button" onClick={() => handleAddToCart(selectedProduct)}>Add to Cart</button>
        </div>
      ) : (
        <div className='product-list'>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className='product-item'>
                <img 
                  src={product.productURL || "/default-image.png"} 
                  alt={product.productName} 
                  onClick={() => setSelectedProduct(product)} 
                />
                <div onClick={() => setSelectedProduct(product)}>
                  <p><strong>NAME:</strong> {product.productName}</p>
                  <p><strong>Price:</strong> ₹{product.price}</p>
                </div>
                <button className="cart-button" onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}>Add to Cart</button>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};
