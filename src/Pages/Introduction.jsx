import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../UserDataContext";

const Introduction = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserDataContext);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      setUserData({ ...userData, name: inputValue }); // ✅ Save to localStorage
      navigate("/location"); // ✅ Move to next question page
    }
  };

  return (
    <div className="introduction-page">
      <div className="diamond-bg"></div>

      {/* TOP LEFT ANALYSIS TEXT */}
      <div className="top-left-analysis">TO START ANALYSIS</div>

      {/* BACK BUTTON BOTTOM LEFT */}
      <div className="bottom-left-nav" onClick={() => navigate("/")}>
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
    <div className="input-wrapper">
  {!inputValue && (
    <div className="placeholder-text">Introduce Yourself</div>
  )}
  <input
    type="text"
    value={inputValue}
    onChange={handleChange}
    onKeyDown={(e) => {
      if (e.key === "Enter") handleSubmit();
    }}
    className={inputValue ? "typing" : ""}
  />
  <div className="underline"></div>
</div>
      </div>
    </div>
  );
};

export default Introduction;
