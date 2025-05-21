import React from "react";
import { useNavigate } from "react-router-dom";

const ImageUpload = () => {
  const navigate = useNavigate();

  return (
    <div className="introduction-page">
      {/* Diamond Background */}
      <div className="diamond-bg"></div>

      {/* TOP LEFT TEXT */}
      <div className="top-left-analysis">TO START ANALYSIS</div>

      {/* ENTER CODE BUTTON */}
      <div className="top-right-code">
        <button className="enter-code-btn">ENTER CODE</button>
      </div>

      {/* BACK BUTTON */}
      <div className="bottom-left-nav" onClick={() => navigate("/submission")}>
        <div className="diamond small-diamond">
          <span className="nav-arrow">◀</span>
        </div>
        <span className="back-text">BACK</span>
      </div>

      {/* IMAGE OPTIONS */}
      <div className="image-options-wrapper">
        {/* LEFT ICON */}
        <div className="image-option left-icon">
          <div className="icon-with-label">
            <div className="floating-label">ALLOW A.I.<br />TO SCAN YOUR FACE</div>
            <div className="arrow-down">⬇</div>
            <img src="public/Camera.png" alt="Camera" className="icon-img" />
          </div>
        </div>

        {/* RIGHT ICON */}
        <div className="image-option right-icon">
          <div className="icon-with-label">
            <div className="floating-label">ALLOW A.I.<br />ACCESS GALLERY</div>
            <div className="arrow-down">⬇</div>
            <img src="/image-gallery.png" alt="Gallery" className="icon-img" />
          </div>
        </div>
      </div>

      {/* PREVIEW SECTION */}
      <div className="preview-section">
        <p className="preview-title">Preview</p>
        <div className="preview-box"></div>
      </div>
    </div>
  );
};

export default ImageUpload;
