import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CustLoder } from "../common/CustLoder";
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ViewMyProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllMyProducts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("/product/getProductsbyuserid/" + localStorage.getItem("id"));
      setProducts(res.data.data);
    } catch (error) {
      console.error("Error fetching your products:", error);
      toast.error("Failed to load your products", { theme: "dark", transition: Bounce });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`/product/product/${id}`);
      setProducts(prev => prev.filter(product => product._id !== id));
      toast.success("🗑️ Product deleted successfully!", {
        position: "top-center",
        autoClose: 1500,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
      toast.error("Failed to delete product", { theme: "dark", transition: Bounce });
    }
  };

  useEffect(() => {
    getAllMyProducts();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      {isLoading && <CustLoder />}
      <h2>MY PRODUCTS</h2>

      <table className='table table-dark'>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((sc) => (
            <tr key={sc._id}>
              <td>{sc.productName}</td>
              <td>
                <img style={{ height: 100, width: 100 }} src={sc?.productURL || "/default-image.png"} alt="product" />
              </td>
              <td>
                <Link to={`/admin/updateProduct/${sc._id}`} className="btn btn-info me-2">UPDATE</Link>
                <button className="btn btn-danger" onClick={() => handleDelete(sc._id)}>DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer position="top-center" autoClose={1500} transition={Bounce} />
    </div>
  );
};
