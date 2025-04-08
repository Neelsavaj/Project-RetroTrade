import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, Bounce } from 'react-toastify';

export const AddCategory = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const submitHandler = async (data) => {
        try {
            const res = await axios.post("/category/addcategory", data);
            console.log(res.data);

            toast.success("✅ Category added successfully!", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
                transition: Bounce,
            });

            reset(); // Clear the form

            setTimeout(() => {
                navigate("/admin/subcategory"); // Change this path as needed
            }, 2000); // Wait for toast to complete before navigating

        } catch (error) {
            console.error("Failed to add category:", error);
            toast.error("❌ Failed to add category.", {
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
                        <h2 className="text-center mb-4">ADD CATEGORY</h2>          
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <div className="mb-3">
                                <label className='form-label'>Category Name</label>
                                <input type="text" className='form-control' {...register("categoryName")} />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Category Description</label>
                                <input type="text" className='form-control' {...register("categoryDescription")} />
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
