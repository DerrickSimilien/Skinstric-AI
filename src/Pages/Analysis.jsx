import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Analysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);
  const [name, setName] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [nationality, setNationality] = useState('');

  useEffect(() => {
    if (location.state) {
      setCapturedImage(location.state.capturedImage);
      setName(location.state.name || '');
      setUserLocation(location.state.location || '');
      setNationality(location.state.nationality || '');
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, [location]);

  const handleProceed = () => {
    console.log("proceed clicked");
    navigate("/demographics", {
      state: {
        capturedImage: capturedImage,
        name: name,
        location: userLocation,
        nationality: nationality,
      },
    });
  };

  const handleBack = () => {
    navigate(-1); 
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
              <button className="glow-button" onClick={handleProceed}>PROCEED</button>
              <button className="glow-button" onClick={handleBack}>BACK</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analysis;