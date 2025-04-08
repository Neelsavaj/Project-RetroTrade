import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify'; // ✅ Toaster added

export const AddProduct = () => {
  const [categories, setcategories] = useState([]);
  const [subcategories, setsubcategories] = useState([]);

  const getAllCategory = async () => {
    const res = await axios.get("/category/getallcategory");
    setcategories(res.data.data);
  };

  const getSubCategoryByCategoryId = async (id) => {
    const res = await axios.get("/subcategory/getsubcategorybycategory/" + id);
    setsubcategories(res.data.data);
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    try {
      data.userId = localStorage.getItem("id");

      const formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("productDescription", data.productDescription);
      formData.append("subcategoryId", data.subcategoryId);
      formData.append("categoryId", data.categoryId);
      formData.append("price", data.price);
      formData.append("image", data.image[0]);
      formData.append("userId", data.userId);

      const res = await axios.post("/product/addWithFile", formData);

      toast.success("✅ Product added successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });

      setTimeout(() => {
        navigate("/admin/myproducts");
      }, 2000);

    } catch (error) {
      console.error("Product addition failed:", error);

      toast.error("❌ Failed to add product.", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Add Product</h2>
            <form onSubmit={handleSubmit(submitHandler)} encType="multipart/form-data">
              <div className="mb-3">
                <label className="form-label">PRODUCT NAME</label>
                <input type="text" className="form-control" {...register("productName")} />
              </div>

              <div className="mb-3">
                <label className="form-label">Product Description</label>
                <input type="text" className="form-control" {...register("productDescription")} />
              </div>

              <div className="mb-3">
                <label className="form-label">Price</label>
                <input type="text" className="form-control" {...register("price")} />
              </div>

              <div className="mb-3">
                <label className="form-label">Select Category</label>
                <select
                  className="form-select"
                  {...register("categoryId")}
                  onChange={(event) => getSubCategoryByCategoryId(event.target.value)}
                >
                  <option>SELECT CATEGORY</option>
                  {categories?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Select Subcategory</label>
                <select className="form-select" {...register("subcategoryId")}>
                  <option>SELECT SUBCATEGORY</option>
                  {subcategories?.map((subcategory) => (
                    <option key={subcategory._id} value={subcategory._id}>
                      {subcategory.subcategoryName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Select PRODUCT URL</label>
                <input type="file" className="form-control" {...register("image")} />
              </div>

              <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
