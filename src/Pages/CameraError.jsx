import React from "react";
import { useNavigate } from "react-router-dom";


const CameraError = ({ onRetry }) => {
  const navigate = useNavigate();

  return (
    <div className="camera-error-container">
      <h1 className="error-heading">CAMERA ACCESS DENIED</h1>
      <p className="error-message">
        In order to proceed with A.I. face scanning, camera access is required.
      </p>
      <div className="error-buttons">
        <button className="retry-btn" onClick={onRetry}>RETRY</button>
        <button className="back-btn" onClick={() => navigate("/image-upload")}>BACK</button>
      </div>
    </div>
  );
};

export default CameraError;
