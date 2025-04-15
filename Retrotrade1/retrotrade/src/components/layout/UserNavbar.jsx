import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../assets/user.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const UserNavbar = () => {
  const cartItems = useSelector((state) => state.cart.cart);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");
    if (role) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogoutClick = () => {
    // localStorage.removeItem("id");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    // navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm py-2">
        <div className="container-fluid">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="RetroTrade Logo" width="120" className="img-fluid" />
          </Link>

          {/* Navbar Toggler for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Content */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto text-center">
              <li className="nav-item">
                <Link className="nav-link text-dark fw-semibold" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-semibold" to="/product">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-semibold" to="/about">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark fw-semibold" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>

            {/* Auth Buttons & Cart */}
            <div className="d-flex align-items-center gap-3">
              {!isLoggedIn && (
                <>
                  <Link to="/signup2" className="btn btn-primary fw-bold px-3 rounded-pill">
                    Sign Up
                  </Link>
                  <Link to="/login" className="btn btn-outline-primary fw-bold px-3 rounded-pill">
                    Log In
                  </Link>
                </>
              )}

              {/* Shopping Cart */}
              <div className="position-relative">
                <Link to="/cart" className="text-dark">
                  <i className="fas fa-shopping-cart fa-lg"></i>
                </Link>
                {cartItems.length > 0 && (
                  <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems.length}
                  </span>
                )}
              </div>

              {/* Logout Button */}
              {isLoggedIn && (
                <button className="btn btn-danger px-3 fw-semibold" onClick={handleLogoutClick}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="container-fluid p-3">
        <Outlet />
      </main>
    </>
  );
};
