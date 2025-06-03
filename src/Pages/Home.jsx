import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiamondTrio from "../components/DiamondTrio";

const Home = () => {
  const [hoverState, setHoverState] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* GIANT DIAMOND BRACKETS (left & right background diamonds) */}
      <div className="home-left-bracket">
        <div className="home-bracket-diamond"></div>
      </div>
      <div className="home-right-bracket">
        <div className="home-bracket-diamond"></div>
      </div>

      {/* Floating animated diamond stack in center */}
      <DiamondTrio />

      {/* Left side button */}
      <div
        className={`side-button left ${
          hoverState === "right" ? "fade-out" : ""
        }`}
        onMouseEnter={() => setHoverState("left")}
        onMouseLeave={() => setHoverState(null)}
      >
        <div className="diamond">
          <span className="arrow">◀</span>
        </div>
        <p>DISCOVER A.I.</p>
      </div>

      {/* Right side button */}
      <div
        className={`side-button right ${
          hoverState === "left" ? "fade-out" : ""
        }`}
        onMouseEnter={() => setHoverState("right")}
        onMouseLeave={() => setHoverState(null)}
        onClick={() => navigate("/introduction")}
      >
        <div className="diamond">
          <span className="arrow">▶</span>
        </div>
        <p>TAKE TEST</p>
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
          SKINSTRIC DEVELOPED AN A.I. THAT CREATES A<br />
          HIGHLY-PERSONALIZED ROUTINE TAILORED TO<br />
          WHAT YOUR SKIN NEEDS.
        </p>
      </div>
    </div>
  );
};

export default Home;
