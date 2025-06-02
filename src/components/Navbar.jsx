// src/components/Navbar.jsx
import React from "react";
import { useLocation } from "react-router-dom"; // 👈 import useLocation

const Navbar = () => {
  const location = useLocation(); // 👈 get current path

  return (
    <header className="navbar">
      <div className="navbar-left">
        <span className="brand-name">SKINSTRIC</span>
        <span className="intro-label">[ INTRO ]</span>
      </div>

      {/* 👇 only show button on home page ("/") */}
      {location.pathname === "/" && (
        <div className="navbar-right">
          <button className="enter-code-btn">ENTER CODE</button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
