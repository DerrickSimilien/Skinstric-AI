import React from "react";
import { useNavigate } from "react-router-dom";

const CameraError = () => {
  const navigate = useNavigate();

  return (
    <div className="camera-error-page">
      <div className="diamond-bg"></div>
      <h1 className="error-title">CAMERA ACCESS DENIED</h1>
      <p className="error-message">
        In order to proceed with A.I. face scanning, camera access is required.
      </p>
      <button className="retry-btn" onClick={() => navigate("/camera")}>
        Retry
      </button>
      <button className="back-btn" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
};

export default CameraError;
