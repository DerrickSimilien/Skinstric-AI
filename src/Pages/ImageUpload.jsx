import React, { useEffect, useRef, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserDataContext } from "../UserDataContext";

const ImageUpload = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, setUserData } = useContext(UserDataContext);
  const [capturedImage, setCapturedImage] = useState(userData?.capturedImage || null);
  const [tempImage, setTempImage] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [cameraClicked, setCameraClicked] = useState(false);
  const fileInputRef = useRef(null);

 useEffect(() => {
  const imageFromLocation = location.state?.capturedImage;

  // Always reset state on load
  setCapturedImage(null);
  setTempImage(null);
  setUserData((prev) => ({
    ...prev,
    capturedImage: null,
  }));

  // If coming from camera with image, set it
  if (imageFromLocation) {
    setCapturedImage(imageFromLocation);
    setUserData((prev) => ({
      ...prev,
      capturedImage: imageFromLocation,
    }));

    // Clear state from navigation
    navigate(location.pathname, { replace: true, state: {} });
  }
}, [location.pathname, navigate, setUserData]);

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
    navigate("/analysis");
  };

  const handleAllowCamera = () => {
    setShowCameraModal(false);
    navigate("/camera", { state: { autoStart: true } });
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
          <div className="camera-block">
            <div className="spinning-square square-small"></div>
            <div className="spinning-square square-medium"></div>
            <div className="spinning-square square-large"></div>
            <div className="icon-wrapper">
              <img
                src="/Camera.png"
                alt="Camera"
                className="icon-img"
                onClick={() => {
                  setCameraClicked(true);
                  setShowCameraModal(true);
                }}
              />
              <div className="line-to-icon-camera" />
              <div className="label-heading-camera">
                ALLOW A.I.<br />TO SCAN YOUR FACE
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className={`image-option right-icon ${cameraClicked ? "faded" : ""}`}>
          <div className="spinning-square square-small"></div>
          <div className="spinning-square square-medium"></div>
          <div className="spinning-square square-large"></div>
          <div className="icon-wrapper" onClick={() => fileInputRef.current.click()}>
            <div className="line-to-icon-gallery" />
            <div className="label-heading-gallery">
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

      {/* Show instruction if no image is chosen yet
      {!capturedImage && !showConfirm && !showCameraModal && (
        <div className="upload-reminder">
          Please upload an image or allow camera access to continue.
        </div>
      )} */}

      {/* Confirmation Modal */}
      {showConfirm && tempImage && (
        <div className="confirmation-modal">
          <p className="confirmation-text">Use this photo?</p>
          <div className="confirm-preview-box">
            <img src={tempImage} alt="Confirm Preview" />
          </div>
          <div className="confirm-buttons">
            <button className="confirm-btn" onClick={confirmImage}>Yes</button>
            <button className="cancel-btn" onClick={cancelImage}>No</button>
          </div>
        </div>
      )}

      {/* Camera Permission Modal */}
      {showCameraModal && (
        <div className="camera-permission-modal">
          <p className="modal-title">ALLOW A.I. TO ACCESS YOUR CAMERA</p>
          <div className="modal-divider"></div>
          <div className="modal-buttons">
            <button className="deny-btn" onClick={() => setShowCameraModal(false)}>DENY</button>
            <button className="allow-btn" onClick={handleAllowCamera}>ALLOW</button>
          </div>
        </div>
      )}

      {/* Preview Box (Top Right Corner) */}
     {!showConfirm && !showCameraModal && (
  <div className="image-preview-box">
    <p className="preview-label">Preview</p>
    <div className="preview-frame">
      {capturedImage || tempImage ? (
        <img
          src={capturedImage || tempImage}
          alt="Selected Preview"
          className="preview-img"
        />
      ) : (
        <div className="preview-placeholder">No image selected</div>
      )}
    </div>
  </div>
)}

      {/* Proceed Button */}
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
