import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Analysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    if (location.state?.capturedImage) {
      setCapturedImage(location.state.capturedImage);
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulate analysis delay

    return () => clearTimeout(timer);
  }, [location]);

  const handleProceed = () => {
    navigate("/next-step"); // Replace this with your actual next page
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous screen
  };

  return (
    <div className="camera-page">
      <div className="diamond-bg"></div>
      <div className="center-content">
        {loading ? (
          <h1 className="ripple-text">PREPARING YOUR ANALYSIS...</h1>
        ) : (
          <>
            <h1 className="ripple-text">Image Analyzed Successfully!</h1>
            <div className="analysis-button-group">
              <button className="glow-button" onClick={handleProceed}>
                PROCEED
              </button>
              <button className="glow-button" onClick={handleBack}>
                BACK
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analysis;
