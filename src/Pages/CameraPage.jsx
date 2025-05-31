import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserDataContext } from "../UserDataContext";

const CameraPage = () => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [stream, setStream] = useState(null);
  const [facingMode, setFacingMode] = useState("user");
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, setUserData } = useContext(UserDataContext);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
      setStream(mediaStream);
      setIsLoading(false);
      setCameraStarted(true);
    } catch (err) {
      console.error("Camera error:", err);
      setIsLoading(false);
      navigate("/camera-error");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setCameraStarted(false);
    }
  };

  useEffect(() => {
    if (location.state?.autoStart) {
      setShowPrompt(false);
      setIsLoading(true);
    }
  }, [location]);

  useEffect(() => {
    if (!showPrompt && isLoading && !cameraStarted) {
      startCamera();
    }
    return () => stopCamera();
  }, [showPrompt, isLoading, cameraStarted, facingMode]);

  const capturePhoto = () => {
    if (!videoRef.current || !cameraStarted) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    setCapturedPhoto(dataURL);
    stopCamera();

    // Save and redirect
    setUserData({ ...userData, capturedImage: dataURL });
    navigate("/image-upload", { state: { capturedImage: dataURL } });
  };

  return (
    <div className="camera-page">
      {/* 🔳 Diamond Background */}
      <div className="diamond-bg"></div>

      {/* 🟣 Camera Permission Modal */}
      {showPrompt && (
        <div className="camera-permission-modal">
          <p className="modal-title">ALLOW A.I. TO ACCESS YOUR CAMERA</p>
          <div className="modal-buttons">
            <button className="deny-btn" onClick={() => navigate("/camera-error")}>
              DENY
            </button>
            <button
              className="allow-btn"
              onClick={() => {
                setShowPrompt(false);
                setIsLoading(true);
              }}
            >
              ALLOW
            </button>
          </div>
        </div>
      )}

      {/* 🟣 Loading Text */}
      {isLoading && <div className="loading-text">SETTING UP CAMERA...</div>}

      {/* 🟣 Navbar Style Text (Skinstric [Intro]) */}
      <div className="camera-custom-top-text">
  <span className="brand-name">SKINSTRIC</span>
  <span className="intro-label">[ INTRO ]</span>
</div>

      {/* 🟣 Live Camera Feed */}
      {!showPrompt && !capturedPhoto && (
        <div className="camera-feed-wrapper">
          <div className="camera-feed-container">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="camera-feed"
              style={{
                display: !isLoading && cameraStarted ? "block" : "none",
              }}
            />
            {cameraStarted && (
              <>
                {/* Tips */}
                <div className="camera-tips-inside-feed">
                  <p className="tip-heading">TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
                  <div className="tip-icons">
                    <span>◇ NEUTRAL EXPRESSION</span>
                    <span>◇ FRONTAL POSE</span>
                    <span>◇ ADEQUATE LIGHTING</span>
                  </div>
                </div>

                {/* Camera Icon (Right side, clickable) */}
                <div
                  className="floating-capture-icon"
                  title="Take Picture"
                  onClick={capturePhoto}
                >
    <span className="camera-label-text">TAKE PICTURE</span>
        <div className="camera-icon-circle">
    <img
      src="/action-cam-icon.png"
      alt="Capture"
      className="camera-icon-img"
    />
  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraPage;
