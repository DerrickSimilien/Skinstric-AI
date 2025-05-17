import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Location = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      localStorage.setItem("location", inputValue); // ✅ Save to localStorage
      navigate("/nationality"); // ✅ Move to next question page
    }
  };

  return (
    <div className="introduction-page">
      <div className="diamond-bg"></div>

      {/* TOP LEFT ANALYSIS TEXT */}
      <div className="top-left-analysis">TO START ANALYSIS</div>

      {/* BACK BUTTON BOTTOM LEFT */}
      <div className="bottom-left-nav" onClick={() => navigate("/Introduction")}>
        <div className="diamond small-diamond">
          <span className="arrow">◀</span>
        </div>
        <span className="back-text">BACK</span>
      </div>

      {/* Center Input Area */}
      <div className="center-input">
        <p className={`click-to-type ${inputValue ? "hidden" : ""}`}>
          CLICK TO TYPE
        </p>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit(); // ✅ Go to Location on Enter
          }}
          className={inputValue ? "typing" : ""}
        />
        <div className="underline"></div>
        {!inputValue && (
          <div className="placeholder-text">Where are you from?</div>
        )}
      </div>
    </div>
  );
};

export default Location;
