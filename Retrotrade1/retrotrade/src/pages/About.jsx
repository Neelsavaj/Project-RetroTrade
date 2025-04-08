import React from 'react';
import { UserNavbar } from '../components/layout/UserNavbar';
import { Footer } from './Footer';
import "../assets/user.css"
export const About = () => {
  return (
    <div className="about-page">
      <UserNavbar />

      {/* Banner */}
      <div className="about-banner">
      <h1 className="contact-title">About</h1>
      </div>

      {/* Our Story */}
      <div className="about-section">
        <div className="about-text">
          <h2>Our Story</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris consequat consequat enim, non auctor massa
            ultrices non. Morbi sed odio massa. Quisque at vehicula tellus, sed tincidunt augue.
          </p>
          <p>
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas
            gravida elit eget diam convallis, ut vestibulum massa sagittis.
          </p>
        </div>
        <div className="about-image">
          <img
            src="https://i.pinimg.com/originals/0a/16/2c/0a162cbeb0551e297b2ab5d5e11529eb.jpg"
            alt="Our Story"
          />
        </div>
      </div>

      {/* Our Mission */}
      <div className="about-section reverse">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            Mauris non lacinia magna. Sed nec lobortis dolor. Vestibulum rhoncus dignissim risus, sed consectetur erat.
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          </p>
          <p>
            Proin at gravida ante. Mauris auctor purus at lacus maximus euismod. Pellentesque vulputate massa ut nisl
            hendrerit, eget elementum libero iaculis.
          </p>
          <p className="quote">
            “Creativity is just connecting things. When you ask creative people how they did something, they feel a
            little guilty because they didn’t really do it, they just saw something. It seemed obvious to them after a
            while.”<br />
            – Steve Jobs
          </p>
        </div>
        <div className="about-image">
          <img
            src="https://img.freepik.com/premium-photo/linen-clothes-hanging-rack-plant-pot-armchair-white-beige-backgroun_1108314-382004.jpg"
            alt="Our Mission"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};
