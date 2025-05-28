import React, { useEffect, useRef, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserDataContext } from "../UserDataContext";

const ImageUpload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, setUserData } = useContext(UserDataContext);
  const [capturedImage, setCapturedImage] = useState(null);
  const [tempImage, setTempImage] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (location.state?.capturedImage) {
      setCapturedImage(location.state.capturedImage);
      setUserData((prev) => ({
        ...prev,
        capturedImage: location.state.capturedImage,
      }));
    }
  }, [location, setUserData]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImage(reader.result);
        setShowConfirm(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const confirmImage = () => {
    setCapturedImage(tempImage);
    setUserData({ ...userData, capturedImage: tempImage });
    setTempImage(null);
    setShowConfirm(false);
  };

  const cancelImage = () => {
    setTempImage(null);
    setShowConfirm(false);
    fileInputRef.current.value = null;
  };

  const removeImage = () => {
    setCapturedImage(null);
    setUserData({ ...userData, capturedImage: null });
  };

  const goToAnalysis = () => {
    navigate("/demographics");
  };

  return (
    <div className="introduction-page">
      <div className="diamond-bg"></div>

      <div className="top-left-analysis">TO START ANALYSIS</div>

      <div className="top-right-code">
        <button className="enter-code-btn">ENTER CODE</button>
      </div>

      <div className="bottom-left-nav" onClick={() => navigate("/submission")}>
        <div className="diamond small-diamond">
          <span className="nav-arrow">◀</span>
        </div>
        <span className="back-text">BACK</span>
      </div>

      <div className="image-options-wrapper">
        {/* Camera Section */}
        <div className="image-option left-icon">
          <div className="spinning-square square-1"></div>
          <div className="spinning-square square-2"></div>
          <div className="icon-wrapper">
            <div className="label-heading no-glow">
              ALLOW A.I.<br />TO SCAN YOUR FACE
            </div>
            <img
              src="/Camera.png"
              alt="Camera"
              className="icon-img"
              onClick={() => navigate("/camera")}
            />
          </div>
        </div>

        {/* Gallery Section */}
        <div className="image-option right-icon">
          <div className="spinning-square square-1"></div>
          <div className="spinning-square square-2"></div>
          <div className="icon-wrapper" onClick={() => fileInputRef.current.click()}>
            <div className="label-heading no-glow">
              ALLOW A.I.<br />ACCESS GALLERY
            </div>
            <img src="/image-gallery.png" alt="Gallery" className="icon-img" />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && tempImage && (
        <div className="confirmation-modal">
          <p className="confirmation-text">Use this photo?</p>
          <div className="confirm-preview-box">
            <img src={tempImage} alt="Confirm Preview" />
          </div>
          <div className="confirm-buttons">
            <button className="confirm-btn" onClick={confirmImage}>
              Yes
            </button>
            <button className="cancel-btn" onClick={cancelImage}>
              No
            </button>
          </div>
        </div>
      )}

      {/* Preview Section */}
      <div className="preview-section">
        <p className="preview-title">Preview</p>
        <div className="preview-box">
          {capturedImage ? (
            <img src={capturedImage} alt="Captured Preview" className="preview-image" />
          ) : (
            <p className="preview-placeholder">No image selected</p>
          )}
        </div>

        {capturedImage && (
          <button className="remove-btn" onClick={removeImage}>
            Remove Photo
          </button>
        )}
      </div>

      {/* ✅ Proceed Button now correctly positioned */}
      {capturedImage && (
        <div className="bottom-right-nav" onClick={goToAnalysis}>
          <span className="proceed-text">PROCEED</span>
          <div className="diamond small-diamond">
            <span className="nav-arrow">▶</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
