import React from 'react';
import "../assets/user.css"

export const NewsLetter = () => {
  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
      <div className="newsletter-input">
        <input type="email" placeholder="Your Email ID" />
        <button>Subscribe</button>
      </div>
    </div>
  );
};
