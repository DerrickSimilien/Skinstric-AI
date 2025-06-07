import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../UserDataContext";

const Location = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserDataContext);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      setUserData({ ...userData, location: inputValue });
      navigate("/nationality");
    }
  };

  return (
    <div className="introduction-page5">
      {/* 🔳 Spinning Squares */}
      <div className="spinning-square5 square-small5"></div>
      <div className="spinning-square5 square-medium5"></div>
      <div className="spinning-square5 square-large5"></div>

      {/* 🔼 Top-left Analysis Text */}
      <div className="top-left-analysis5">TO START ANALYSIS</div>

      {/* ◀ Back Button */}
      <div className="bottom-left-nav5" onClick={() => navigate("/introduction")}>
        <div className="diamond5 small-diamond5">
          <span className="arrow5">◀</span>
        </div>
        <span className="back-text5">BACK</span>
      </div>

      {/* 🖊 Input Section */}
      <div className="center-input5">
        <p className={`click-to-type5 ${inputValue ? "hidden5" : ""}`}>CLICK TO TYPE</p>
        <div className="input-wrapper5">
          {!inputValue && <div className="placeholder-text5">Where are you from?</div>}
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="typing5"
            placeholder=""
          />
          <div className="underline5"></div>
        </div>
      </div>
    </div>
  );
};

export default Location;
