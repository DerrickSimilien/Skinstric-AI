import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../UserDataContext";

const Nationality = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserDataContext);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      setUserData({ ...userData, nationality: inputValue });
      navigate("/loading");
    }
  };

  return (
    <div className="introduction-page6">
      {/* 🟪 Spinning Squares */}
      <div className="spinning-square6 square-small6"></div>
      <div className="spinning-square6 square-medium6"></div>
      <div className="spinning-square6 square-large6"></div>

      {/* 🔝 Top Text */}
      <div className="top-left-analysis6">TO START ANALYSIS</div>

      {/* ◀ Back Button */}
      <div className="bottom-left-nav6" onClick={() => navigate("/location")}>
        <div className="diamond6 small-diamond6">
          <span className="arrow6">◀</span>
        </div>
        <span className="back-text6">BACK</span>
      </div>

      {/* 🖊 Center Input Area */}
      <div className="center-input6">
        <p className={`click-to-type6 ${inputValue ? "hidden6" : ""}`}>
          CLICK TO TYPE
        </p>
        <div className="input-wrapper6">
          {!inputValue && (
            <div className="placeholder-text6">What is your nationality?</div>
          )}
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="typing6"
            placeholder=""
          />
          <div className="underline6"></div>
        </div>
      </div>
    </div>
  );
};

export default Nationality;
