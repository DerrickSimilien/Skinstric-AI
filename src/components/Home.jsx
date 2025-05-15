import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">

      {/* Left side button */}
      <div className="side-button left">
        <div className="diamond">
          <span className="arrow">◀</span>
        </div>
        <p>DISCOVER A.I.</p>
      </div>

      {/* Right side button */}
      <div className="side-button right">
        <div className="diamond">
          <span className="arrow">▶</span>
        </div>
        <p>TAKE TEST</p>
      </div>

      {/* Center headline */}
      <div className="center-content">
        <h1>Sophisticated<br />skincare</h1>
      </div>

      {/* Bottom-left subtext */}
      <p className="subtext">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALIZED ROUTINE
        TAILORED TO WHAT YOUR SKIN NEEDS.
      </p>

    </div>
  );
};

export default Home;
