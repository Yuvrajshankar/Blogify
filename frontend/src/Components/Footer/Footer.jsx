import React from 'react';
import "./Footer.css";
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
          <p>Home</p>
          <p>Profile</p>
          <p>Write Blog</p>
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
          <i><FacebookRoundedIcon /></i>
          <i><TwitterIcon /></i>
          <i><InstagramIcon /></i>
          <i><LinkedInIcon /></i>
        </div>

      </div>
      <p className="end">&copy;2023<span>Blogify</span>. All rights reserved.</p>

    </footer>
  )
}

export default Footer;