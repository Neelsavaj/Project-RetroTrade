import React, { useState } from "react";
import { UserNavbar } from "../components/layout/UserNavbar";
import { Footer } from "./Footer";
import "../assets/user.css";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa"; // Icons for Contact Details

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError("Failed to send message. Try again later.");
      }
    } catch (err) {
      setError("Error submitting form.");
    }
  };

  return (
    <div className="page-container">
      <UserNavbar />
      <div className="contact-banner">
          <h1 className="contact-title">Contact</h1>
        </div>
      {/* Contact Section */}
      <main className="contact-content">
        <div className="contact-grid">
          {/* Contact Form */}
          <div className="contact-form-container">
            <h2 className="form-title">Send Us A Message</h2>
            {error && <p className="error-text">{error}</p>}
            {success && <p className="success-text">{success}</p>}
            <form onSubmit={handleSubmit} className="contact-form">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="input-field"
              ></textarea>
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="contact-details">
            <h3 className="details-title">Get In Touch</h3>
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <p>Cisco Store Center, 6th Floor, 379 Hudson St, New York, NY 10018 US</p>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <p className="contact-info">+1 800 123 9876</p>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <p className="contact-info">contact@example.com</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
