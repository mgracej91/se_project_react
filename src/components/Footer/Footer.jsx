import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer__title">
        <p>Developed by Name Megan Jakims</p>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;
