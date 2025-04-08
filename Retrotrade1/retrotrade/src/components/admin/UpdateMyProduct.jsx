import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';

export const UpdateMyProduct = () => {
  const id = useParams().id;
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

  const { register, handleSubmit, reset } = useForm({
    defaultValues: async () => {
      const res = await axios.get("/product/getProductById/" + id);
      // Preload subcategories for the selected category
      getSubCategoryByCategoryId(res.data.data.categoryId);
      return res.data.data;
    }
  });

  const submitHandler = async (data) => {
    try {
      data.userId = localStorage.getItem("id");
      delete data._id;

      const res = await axios.put("/product/updateproduct/" + id, data);
      console.log(res.data);

      toast.success("✅ Product updated successfully!", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });

    } catch (error) {
      console.error("Product update failed:", error);

      toast.error("❌ Failed to update product.", {
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
            <h2 className="text-center mb-4">UPDATE PRODUCT</h2>
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
                <label className="form-label">PRODUCT URL</label>
                <input type="text" className="form-control" {...register("productURL")} />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
