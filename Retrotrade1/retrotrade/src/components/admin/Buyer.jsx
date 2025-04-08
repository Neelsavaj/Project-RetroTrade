import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const Buyer = () => {
    const [categories, setcategories] = useState([]);

    const getAllCategory = async () => {
        const res = await axios.get("/category/getallcategory");
        console.log(res.data);
        setcategories(res.data.data);
    };


    useEffect(() => {
        getAllCategory();
    }, []);

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()

    const submitHandler = async (data) => {

        data.userId = localStorage.getItem("id");
        console.log(data);
        console.log(data.image[0])


        const formData = new FormData();
        formData.append("description", data.description);
        formData.append("category_id", data.category_id);
        formData.append("price", data.price);
        formData.append("condition", data.condition);
        formData.append("image", data.image[0]);
        formData.append("userId", data.userId);



        const res = await axios.post("/buyer/addWithFile", formData);
        console.log(res); 
        console.log(res.data); 
        navigate("/admin/myproducts")   
    }
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card p-4 shadow">
                        <h2 className="text-center mb-4">BUYER</h2>
                        <form onSubmit={handleSubmit(submitHandler)}>

                            <div className="mb-3">
                                <label className='form-label'>SELECT CATEGORY</label>
                                <select className="form-select"
                                    {...register("categoryId")}
                                    onChange={(event) => {
                                        getAllCategory(event.target.value);
                                    }}
                                >
                                    <option>SELECT</option>
                                    {categories?.map((category) => {
                                        return <option value={category._id}>{category.categoryName}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">DESCRIPTION</label>
                                <input type="text" className="form-control" {...register("description")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">CONDITION</label>
                                <input type="text" className="form-control" {...register("condition")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">PRICE</label>
                                <input type="text" className="form-control" {...register("price")} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Select IMAGE URL</label>
                                <input type="file" {...register("image")}></input>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
