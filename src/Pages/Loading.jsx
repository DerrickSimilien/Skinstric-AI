import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/submission"); // ⏩
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="introduction-page">
      <div className="diamond-bg"></div>

      {/* CENTERED SPINNER */}
      <div className="center-input">
        <div className="spinner"></div>
        <p className="analyzing-text">Analyzing your results...</p>
      </div>
    </div>
  );
};

export default Loading;
