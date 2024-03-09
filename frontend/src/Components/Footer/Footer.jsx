import React from 'react';
import "./Footer.css";
import { Link } from "react-router-dom";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';

function Footer() {
  return (
    <footer>
      <div className="footer_main">

        <div className="footer_tag">
          <h2>Location</h2>
          <p>USA</p>
          <p>India</p>
          <p>China</p>
          <p>Germany</p>
          <p>South Korea</p>
        </div>

        <div className="footer_tag">
          <h2>Quick Link</h2>
          <Link to="/" style={{ textDecoration: "none" }}>
            <p>Home</p>
          </Link>

          <Link to="/profile" style={{ textDecoration: "none" }}>
            <p>Profile</p>
          </Link>

          <Link to="/create" style={{ textDecoration: "none" }}>
            <p>Write Blog</p>
          </Link>
        </div>

        <div className="footer_tag">
          <h2>Contact</h2>
          <p>+94 85 5682 456</p>
          <p>+94 96 8576915</p>
          <p>johndoe@gmail.com</p>
          <p>doejohn@gmail.com</p>
        </div>

        <div className="footer_tag">
          <h2>Our Service</h2>
          <p>Advertisement</p>
          <p>Creative Blogs</p>
          <p>24 x 7 Customer Service</p>
        </div>

        <div className="footer_tag">
          <h2>Follows</h2>
          <Link to="https://www.facebook.com" style={{ color: "#000" }}>
            <i><FacebookRoundedIcon /></i>
          </Link>
          <Link to="https://www.x.com" style={{ color: "#000" }}>
            <i><TwitterIcon /></i>
          </Link>
          <Link to="https://www.instagram.com" style={{ color: "#000" }}>
            <i><InstagramIcon /></i>
          </Link>
          <Link to="https://www.linkedin.com" style={{ color: "#000" }}>
            <i><LinkedInIcon /></i>
          </Link>
        </div>

      </div>
      <p className="end">&copy;2023<span>Blogify</span>. All rights reserved.</p>

    </footer>
  )
}

export default Footer;