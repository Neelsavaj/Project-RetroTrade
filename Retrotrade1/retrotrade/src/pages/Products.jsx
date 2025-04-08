import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UserNavbar } from '../components/layout/UserNavbar';
import { Footer } from './Footer';
import "../assets/user.css";
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartSlice';
import { toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [categoryId, setCategoryId] = useState('67c6fdd852e6a72e3b2119df');

    const [selectedProduct, setSelectedProduct] = useState(null); 
    const dispatch = useDispatch();

    const categories = [
        { name: "Electronics", id: "67c6fdd852e6a72e3b2119df" },
        { name: "Furniture", id: "67e2b816af974596603e3232" },
        { name: "Clothing", id: "67c6fe6752e6a72e3b2119e1" },
        { name: "Shoes", id: "67e38056819d2d934cb43cb7" },
        { name: "Toys", id: "67da5521b725adb7790d7e34" }
    ];

    const getProductByCategoryId = async () => {
        try {
            const res = await axios.get("/product/getProductsbycategoryid/" + categoryId);
            setProducts(res.data.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getProductByCategoryId();
    }, [categoryId]);

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
            navigate("/cart"); 
          }, 1500);
        } catch (error) {
          console.error("Error adding to cart:", error);
          toast.error("Error adding product to cart", { theme: "dark" });
        }
      };

    const filteredProducts = products.filter(p =>
        p.productName.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <div>
            <UserNavbar />
            <div className='product'>
                <h1>Products</h1>
                <hr />

                {/* Search & Filter */}
                {!selectedProduct && (
                    <div className="filter-bar">
                        <input
                            type="text"
                            placeholder="Search by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <select onChange={(e) => setCategoryId(e.target.value)} value={categoryId}>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Product Detail View */}
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
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div key={product._id} className='product-item'>
                                    <img
                                        src={product.productURL}
                                        alt={product.productName || "Product image"}
                                        onClick={() => setSelectedProduct(product)} // ✅ added click handler
                                    />
                                    <div onClick={() => setSelectedProduct(product)}> {/* clickable name */}
                                        <p><strong>NAME:</strong> {product.productName}</p>
                                        <p><strong>Price:</strong> ₹{product.price}</p>
                                    </div>
                                    <button
                                        className="cart-button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(product);
                                        }}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: "center" }}>No products found.</p>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};
