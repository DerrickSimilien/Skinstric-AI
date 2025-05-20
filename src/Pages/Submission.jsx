import React from "react";
import { useNavigate } from "react-router-dom";

const Submission = () => {
  const navigate = useNavigate();

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

      {/* PROCEED BUTTON */}
      {/* <div className="bottom-right-nav" onClick={() => navigate("/analysis")}>
        <span className="proceed-text">PROCEED</span>
        <div className="diamond small-diamond">
          <span className="arrow" style={{ transform: "rotate(135deg)" }}>▶</span>
        </div>
      </div> */}

      {/* CENTERED MESSAGE */}
      <div className="center-input">
        <h1 className="submission-title">Results has been submitted!</h1>
        <p className="submission-subtext">Proceed to the next step</p>

        {/* GO TO IMAGE UPLOAD BUTTON */}
        <div className="go-to-upload-button" onClick={() => navigate("/image-upload")}>
          GO TO IMAGE UPLOAD
        </div>
      </div>
    </div>
  );
};

export default Submission;
