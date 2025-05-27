import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Submission = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState({
    name: "",
    location: "",
    nationality: "",
    capturedImage: null,
  });

  useEffect(() => {
    if (location.state) {
      setUserData({
        name: location.state.name || "",
        location: location.state.location || "",
        nationality: location.state.nationality || "",
        capturedImage: location.state.capturedImage || null,
      });
      console.log("Submission: Received data from previous step:", location.state);
    } else {
      console.warn("Submission: No state data received from previous route. Data might be missing.");
    }
  }, [location.state]);

  // ✅ Redirect to /image-upload instead of /demographics
  const handleProceedToImageUpload = () => {
    console.log("Submission: Navigating to Image Upload with data:", userData);
    navigate("/image-upload"); // ✅ correct next step
  };

  return (
    <div className="introduction-page">
      <div className="diamond-bg"></div>

      <div className="top-left-analysis">TO START ANALYSIS</div>

      <div className="bottom-left-nav" onClick={() => navigate("/nationality")}>
        <div className="diamond small-diamond">
          <span className="arrow">◀</span>
        </div>
        <span className="back-text">BACK</span>
      </div>

      <div className="center-input">
        <h1 className="submission-title">Results has been submitted!</h1>
        <p className="submission-subtext">Proceed to the next step</p>

        <div className="go-to-upload-button" onClick={handleProceedToImageUpload}>
          BEGIN IMAGING
        </div>
      </div>
    </div>
  );
};

export default Submission;
