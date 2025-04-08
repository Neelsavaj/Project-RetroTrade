import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "../../assets/signup.css";

export const Signup2 = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const submitHandler = async (data) => {
        try {
            data.roleId = "67bd4568aebcd21f4827b9bd";
            const res = await axios.post("/user", data);

            if (res.status === 201) {
                toast.success("🎉 User created successfully!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                setTimeout(() => navigate("/login"), 3000);
            } else {
                toast.error("❌ User not created!", {
                    position: "top-center",
                    autoClose: 3000,
                    transition: Bounce,
                });
            }
        } catch (error) {
            toast.error("⚠️ Signup Failed!", {
                position: "top-center",
                autoClose: 3000,
                transition: Bounce,
            });
        }
    };

    return (
        <div className="login">
            <div className="login-card">
                <div className="brand">
                    <div className="brand-logo"></div>
                    <h1>CREATE ACCOUNT</h1>
                    <p>Sign up to get started</p>
                </div>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" {...register("firstName")} placeholder="Enter first name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" {...register("lastName")} placeholder="Enter last name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" {...register("email")} placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" {...register("password")} placeholder="Enter password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input type="number" id="age" {...register("age")} placeholder="Enter age" />
                    </div>
                    <button type="submit" className="signup-btn">Sign Up</button>
                </form>
                <div className="signup-link">
                    <p>Already have an account? <a href="/login">Login</a></p>
                </div>
            </div>
        </div>
    );
};
