import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Analysis = () => {
  const location = useLocation();
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

  return (
    <div className="camera-page">
      <div className="diamond-bg"></div>
      <div className="center-content">
        {loading ? (
          <h1 className="ripple-text">PREPARING YOUR ANALYSIS...</h1>
        ) : (
          <div>
            <h1 className="ripple-text">Image Analyzed Successfully!</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analysis;
