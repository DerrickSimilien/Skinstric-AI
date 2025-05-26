import React from "react";
import { useNavigate } from "react-router-dom";

const Submission = () => {
  const navigate = useNavigate();

  const handleGoToDemographics = () => {
    navigate("/demographics", {
      state: {
        name: "Test User", // Replace later with real state
        location: "New York",
        nationality: "American",
        capturedImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...", // Fake base64 placeholder for now
      },
    });
  };

  return (
    <div className="introduction-page">
      <div className="diamond-bg"></div>

      {/* TOP LEFT TEXT */}
      <div className="top-left-analysis">TO START ANALYSIS</div>

      {/* BACK BUTTON */}
      <div className="bottom-left-nav" onClick={() => navigate("/nationality")}>
        <div className="diamond small-diamond">
          <span className="arrow">◀</span>
        </div>
        <span className="back-text">BACK</span>
      </div>

      {/* CENTERED MESSAGE */}
      <div className="center-input">
        <h1 className="submission-title">Results has been submitted!</h1>
        <p className="submission-subtext">Proceed to the next step</p>

        {/* GO TO IMAGE UPLOAD BUTTON */}
        <div className="go-to-upload-button" onClick={() => navigate("/image-upload")}>
          GO TO IMAGE UPLOAD
        </div>

        {/* 🚨 NEW: GO TO DEMOGRAPHICS TEST BUTTON */}
        {/* <div className="go-to-upload-button" onClick={handleGoToDemographics}>
          GO TO DEMOGRAPHICS (TEST)
        </div> */}
      </div>
    </div>
  );
};

export default Submission;
