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
      setUserData({ ...userData, name: inputValue });
      navigate("/location");
    }
  };

  return (
    <div className="introduction-page4">
      {/* 🔳 Spinning Squares */}
      <div className="spinning-square4 square-small4"></div>
      <div className="spinning-square4 square-medium4"></div>
      <div className="spinning-square4 square-large4"></div>

      {/* 🔼 Top-left Analysis Text */}
      <div className="top-left-analysis4">TO START ANALYSIS</div>

      {/* ◀ Back Button */}
      <div className="bottom-left-nav4" onClick={() => navigate("/")}>
        <div className="diamond4 small-diamond4">
          <span className="arrow4">◀</span>
        </div>
        <span className="back-text4">BACK</span>
      </div>

      {/* 🖊 Input Section */}
      <div className="center-input4">
        <p className={`click-to-type4 ${inputValue ? "hidden4" : ""}`}>CLICK TO TYPE</p>
        <div className="input-wrapper4">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="typing4"
            placeholder={!inputValue ? "Introduce Yourself" : ""}
          />
          <div className="underline4"></div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
