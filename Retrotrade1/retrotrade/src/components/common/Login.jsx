import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // ✅ Import useDispatch
import { setUser } from "../../redux/AuthSlice"; // ✅ Import setUser action
import "../../assets/login.css";
import { Bounce, toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ Initialize dispatch
  const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("/users/login", data);
      if (res.status === 200) {
        const userData = res.data.data; // ✅ Extract user data

        // ✅ Save to Redux
        dispatch(setUser(userData));

        // ✅ Save to localStorage for persistence
        localStorage.setItem("id", userData._id);
        localStorage.setItem("role", userData.roleId.name);

        toast.success("🦄 Login Success", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        // ✅ Redirect based on role
        if (userData.roleId.name === "Buyer") {
          navigate("/");
        } else if (userData.roleId.name === "ADMIN") {
          navigate("/admin");
        }
      }
    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="login">
      <div className="login-card">
        <div className="brand">
          <div className="brand-logo"></div>
          <h1>LOGIN USER</h1>
          <p>Enter your credentials to access your account</p>
        </div>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-group">
            <label htmlFor="email">EMAIL</label>
            <input
              type="text"
              id="email"
              {...register("email")}
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password")}
              placeholder="Enter password"
            />
          </div>
          <div className="remember-forgot">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember Me</label>
            </div>
            <a href="/forgotpass" className="forgot-password">
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <div className="signup-link">
          <p>
            Don't have an account? <a href="/signup2">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};
