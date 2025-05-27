import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../UserDataContext"; // ✅ Import context

const Nationality = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserDataContext); // ✅ Get context

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      setUserData({ ...userData, nationality: inputValue }); // ✅ Save to context
      navigate("/loading"); // ❗ Or wherever you go next
    }
  };

  return (
    <div className="introduction-page">
      <div className="diamond-bg"></div>

      {/* TOP LEFT ANALYSIS TEXT */}
      <div className="top-left-analysis">TO START ANALYSIS</div>

      {/* BACK BUTTON to Location Page */}
      <div className="bottom-left-nav" onClick={() => navigate("/location")}>
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
            if (e.key === "Enter") handleSubmit();
          }}
          className={inputValue ? "typing" : ""}
        />
        <div className="underline"></div>
        {!inputValue && (
          <div className="placeholder-text">What is your nationality?</div>
        )}
      </div>
    </div>
  );
};

export default Nationality;
