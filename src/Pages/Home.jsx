import React from "react";
import DiamondTrio from "../components/DiamondTrio";



const Home = () => {
  return (
    <div className="home-container">

  {/* 🔳 Large angled diamond backgrounds */}
  <DiamondTrio />

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
      <div className="corner-text">
  <p>SKINSTRIC DEVELOPED AN A.I. THAT CREATES A<br />
  HIGHLY-PERSONALIZED ROUTINE TAILORED TO<br />
  WHAT YOUR SKIN NEEDS.</p>
</div>

    </div>
  );
};

export default Home;
