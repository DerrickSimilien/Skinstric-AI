import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiamondTrio from "../components/DiamondTrio";

const Home = () => {
  const [hoverState, setHoverState] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* ✅ Mobile layout only (600px and below) */}
      <div className="mobile-hero-group">
         <div className="mobile-diamond-border">

    <div className="mobile-inner-square"></div>

    <h1 className="mobile-title">
      Sophisticated<br />skincare
    </h1>

    {/* ✅ Paragraph goes first */}
    <p className="mobile-subtitle">
      Skinstric developed an <strong>A.I.</strong> that creates a highly-personalized routine tailored to what your skin needs.
    </p>

    {/* ✅ Button comes after the paragraph */}
    <button
      className="mobile-start-btn"
      onClick={() => navigate("/introduction")}
    >
      ENTER EXPERIENCE
      <span className="diamond-icon">▶</span>
    </button>
  </div>
      </div>

      {/* Diamond Trio in center-left and center-right */}
      <DiamondTrio hoverState={hoverState} />

      {/* Left side button */}
      <div
        className={`side-button left ${hoverState === "right" ? "fade-out" : ""}`}
        onMouseEnter={() => setHoverState("left")}
        onMouseLeave={() => setHoverState(null)}
      >
        <div className="diamond-with-label">
          <div className="diamond">
            <span className="arrow">◀</span>
          </div>
          <p>DISCOVER A.I.</p>
        </div>
      </div>

      {/* Right side button */}
      <div
        className={`side-button right ${hoverState === "left" ? "fade-out" : ""}`}
        onMouseEnter={() => setHoverState("right")}
        onMouseLeave={() => setHoverState(null)}
        onClick={() => navigate("/introduction")}
      >
        <div className="diamond-with-label">
          <div className="diamond">
            <span className="arrow">▶</span>
          </div>
          <p>TAKE TEST</p>
        </div>
      </div>

      {/* Center Title */}
      <div
        className={`center-content 
          ${hoverState === "right" ? "move-left" : ""} 
          ${hoverState === "left" ? "move-right" : ""}`}
      >
        <h1>Sophisticated<br />skincare</h1>
      </div>

      {/* Corner Bottom-Left Description Text */}
      <div className="corner-text">
        <p>
          SKINSTRIC DEVELOPED AN A.I. THAT<br />
          CREATES A HIGHLY-PERSONALIZED ROUTINE<br />
          TAILORED TO WHAT YOUR SKIN NEEDS.
        </p>
      </div>
    </div>
  );
};

export default Home;
