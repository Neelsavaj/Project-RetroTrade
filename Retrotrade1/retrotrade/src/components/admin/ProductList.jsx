import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Productlist = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      const res = await axios.get("/product/getallproduct");
      setProducts(res.data.data);
      console.log (res.data)
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products", { theme: "dark", transition: Bounce });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await axios.delete(`/product/product/${id}`);
      setProducts((prev) => prev.filter((product) => product._id !== id));
      toast.success("🗑️ Product deleted successfully!", {
        position: "top-center",
        autoClose: 1500,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
      toast.error("Error deleting product", { theme: "dark", transition: Bounce });
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "userId", headerName: "User ID", width: 150 },
    { field: "productName", headerName: "Product Name", width: 150 },
    {
      field: "productURL",
      headerName: "Product URL",
      width: 150,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          View
        </a>
      ),
    },
    {
      field: "productDescription",
      headerName: "Description",
      width: 200,
      renderCell: (params) =>
        params.value.length > 50 ? `${params.value.substring(0, 50)}...` : params.value,
    },
    { field: "categoryId", headerName: "Category ID", width: 150 },
    { field: "subcategoryId", headerName: "Subcategory ID", width: 150 },
    { field: "price", headerName: "Price", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDelete(params.row._id)}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ textAlign: "center", height: 600, width: "100%" }}>
      <h2>Product List</h2>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        getRowId={(row) => row._id}
        loading={loading}
      />
      <ToastContainer position="top-center" autoClose={1500} transition={Bounce} />
    </div>
  );
};
