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
          <span className="arrow">◀</span>
        </div>
        <span className="back-text">BACK</span>
      </div>

      {/* IMAGE OPTIONS */}
      <div className="image-options-wrapper">
  {/* SCAN FACE OPTION */}
  <div className="image-option">
    <img src="/Camera.png" alt="Scan Face" className="icon-img" />
    <p className="option-label">
      ALLOW A.I.<br />TO SCAN YOUR FACE
    </p>
  </div>

        {/* ACCESS GALLERY OPTION */}
        <div className="image-option">
    <img src="/image-gallery.png" alt="Access Gallery" className="icon-img" />
    <p className="option-label">
      ALLOW A.I.<br />ACCESS GALLERY
    </p>
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
