import React from 'react';
import hand_icon from "../../public/assets/images/hand_icon.png";
import arrow from "../../public/assets/images/arrow.png";
import hero from "../../public/assets/images/hero_image.png";
import "../assets/user.css";
// import { Link } from 'react-router-dom';

export const Banner = () => {
  return (
    <div className="hero container-fluid">
      <div className="row align-items-center">
        {/* Left Section */}
        <div className="col-lg-6 hero-left text-start">
          <h2 className="display-4 fw-bold text-dark">NEW ARRIVALS</h2>
          <div className="hand-hand-icon d-flex align-items-center gap-2">
            <p className="badge bg-primary text-white fs-5 px-3 py-2 rounded-pill">New</p>
            <img src={hand_icon} alt="Hand Icon" className="clap-icon" />
          </div>
          <p className="fs-3 text-secondary">Collections</p>
          <p className="fs-4 text-secondary">For Everyone</p>

          <div className="hero-latest btn btn-primary d-flex align-items-center mt-3">
          
            <span className="fw-bold fs-5">Latest Collection
            </span>
            <img src={arrow} alt="Arrow Icon" className="arrow-icon ms-2" />
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="col-lg-6 hero-right text-center">
          <img src={hero} alt="Hero Banner" className="hero-img img-fluid rounded shadow-lg" />
        </div>
      </div>
    </div>
  );
};
