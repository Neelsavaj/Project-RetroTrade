import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import "../assets/user.css"

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Company Info */}
        <div className="footer-section">
          <h2 className="footer-title">RetroTrade</h2>
          <p className="footer-text">
            Buy & Sell with confidence. The best place for vintage and modern treasures.
          </p>
        </div>

        {/* Customer Service */}
        <div className="footer-section">
          <h3 className="footer-subtitle">Customer Service</h3>
          <ul className="footer-links">
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/returns">Returns & Refunds</a></li>
            <li><a href="/shipping">Shipping Info</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-subtitle">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/about">About Us</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h3 className="footer-subtitle">Follow Us</h3>
          <div className="footer-socials">
            <a href="#" className="social-icon"><FaFacebookF /></a>
            <a href="#" className="social-icon"><FaTwitter /></a>
            <a href="#" className="social-icon"><FaWhatsapp /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-copyright">
        <p>© {new Date().getFullYear()} RetroTrade. All rights reserved.</p>
      </div>
    </footer>
  );
};
