// src/components/Navbar.jsx
import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="brand-name">SKINSTRIC</span>
        <span className="intro-label">[ INTRO ]</span>
      </div>
      <div className="navbar-right">
        <button className="enter-code-btn">ENTER CODE</button>
      </div>
    </header>
  );
};

export default Navbar;
