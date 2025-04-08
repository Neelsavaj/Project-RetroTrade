import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { toast, Bounce } from 'react-toastify'; 

export const SubCategory = () => {
    const [categories, setcategories] = useState([]);
        const navigate = useNavigate();
    

    const getAllCategory = async () => {
        const res = await axios.get("/category/getallcategory");
        console.log(res.data);
        setcategories(res.data.data);
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    const { register, handleSubmit } = useForm();

    const submitHandler = async (data) => {
        try {
            const res = await axios.post("/subcategory/addsubcategory", data);
            console.log(res.data);

            // ✅ Show success toast like PlaceOrder.jsx
            toast.success("✅ Subcategory added successfully!", {
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
                navigate("/admin/addproduct"); // Change this path as needed
            }, 2000);

        } catch (error) {
            console.error("Subcategory addition failed:", error);

            // ❌ Show error toast
            toast.error("❌ Failed to add subcategory.", {
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
                        <h2 className="text-center mb-4">SUB CATEGORY</h2>
                        <form onSubmit={handleSubmit(submitHandler)}>

                            <div className="mb-3">
                                <label className='form-label'>SELECT CATEGORY</label>
                                <select
                                    className="form-select"
                                    {...register("categoryId")}
                                    onChange={(event) => {
                                        getAllCategory(event.target.value); // You can remove this line; it's not used.
                                    }}
                                >
                                    <option>SELECT</option>
                                    {categories?.map((category) => {
                                        return <option key={category._id} value={category._id}>{category.categoryName}</option>;
                                    })}
                                </select>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Category Name</label>
                                <input type="text" className='form-control' {...register("subcategoryName")} />
                            </div>
                            <div>
                                <button type='submit' className="btn btn-primary w-100">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
