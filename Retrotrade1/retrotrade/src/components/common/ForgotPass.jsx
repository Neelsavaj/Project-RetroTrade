import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
export const ForgotPass = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitHandler = async (data) => {
        try {
            console.log(data);
            const res = await axios.post("/user/forgotpassword/", data);
            console.log(res.data.data);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <h1>Forgot Password</h1>
            <form onClick={handleSubmit(submitHandler)}>
                <label>Enter your Email:</label>
                <input type="text"  {...register("email", { required: "Email is required" })} />
                <button type='submit' >Submit</button>
            </form>
        </div>
    )
}
