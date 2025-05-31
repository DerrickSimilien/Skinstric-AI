import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Analysis = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { capturedImage, name, location: userLocation, nationality } = location.state || {};

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/analysis-options", {
        state: {
          capturedImage,
          name,
          location: userLocation,
          nationality,
        },
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, capturedImage, name, userLocation, nationality]);

  return (
    <div className="analysis-white-page">
      <div className="spinning-square square-large"></div>
      <div className="spinning-square square-medium"></div>
      <div className="spinning-square square-small"></div>
      <div className="analysis-loading-text">PREPARING YOUR ANALYSIS ...</div>
    </div>
  );
};

export default Analysis;
