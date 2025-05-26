import React from "react";
import { useNavigate } from "react-router-dom";

const AnalysisOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="ao-container">
      {/* Optional background layer */}
      <div className="ao-diamond-bg"></div>

      {/* Top-left text */}
      <div className="ao-top-left">
        <h4 className="ao-heading">A.I. ANALYSIS</h4>
        <p className="ao-subtext">
          A.I. has estimated the following
          <br />
          Fix estimated information if needed.
        </p>
      </div>

      {/* Chart + Glow */}
      <div className="ao-diamond-chart-wrapper">
        <div className="ao-diamond-hover-area">
          {/* Glowing outlines */}
          <div className="ao-outline ao-outline-1"></div>
          <div className="ao-outline ao-outline-2"></div>
          <div className="ao-outline ao-outline-3"></div>
          <div className="ao-outline ao-outline-4"></div>

          {/* Diamond Chart */}
          <div className="ao-diamond-grid">
            <div className="ao-diamond ao-top">
              <span className="ao-label">DEMOGRAPHICS</span>
            </div>
            <div className="ao-diamond ao-left">
              <span className="ao-label">COSMETIC CONCERNS</span>
            </div>
            <div className="ao-diamond ao-right">
              <span className="ao-label">SKIN TYPE DETAILS</span>
            </div>
            <div className="ao-diamond ao-bottom">
              <span className="ao-label">WEATHER</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="ao-back-btn" onClick={() => navigate(-1)}>
        <div className="ao-small-diamond">
          <span className="ao-arrow">◀</span>
        </div>
        <span className="ao-back-text">BACK</span>
      </div>

      {/* Proceed Button */}
      <div className="ao-proceed-btn" onClick={() => navigate("/summary")}>
        <span className="ao-proceed-text">GET SUMMARY</span>
        <div className="ao-small-diamond">
          <span className="ao-arrow">▶</span>
        </div>
      </div>
    </div>
  );
};

export default AnalysisOptions;
