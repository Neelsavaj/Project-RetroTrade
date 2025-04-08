import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const NewCollection = () => {

    const categoryId='67c6fe6752e6a72e3b2119e1';
    const [products, setProducts] = useState([]);

    const getProductByCategoryId = async () => {
        try {
            const res = await axios.get("/product/getProductsbycategoryid/" + categoryId);
            setProducts(res.data.data);
            console.log(res.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        getProductByCategoryId();
    }, []);


    return (
        <div className='product'>
            <h1>New Collection</h1>
            <hr />
            <div className='product-list'>
                {products.length > 0 ? (
                    products.map((product) => (
                        <div key={product.id} className='product-item'>
                            <img src={product.productURL} alt={product.productName} />
                            {/* <button className="cart-button" onClick={() => addCart(selectedProduct)}>Add to Cart</button> */}

                            {/* <div>
                                <p><strong>NAME:</strong> {product.productName}</p>
                                <p><strong>Price:</strong> ₹{product.price}</p>
                            </div> */}
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: "center" }}>No products found.</p>
                )}
            </div>
        </div>
    )
}
