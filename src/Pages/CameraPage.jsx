import React, { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
  const { userData, setUserData } = useContext(UserDataContext);

  const startCamera = async () => {
    if (!videoRef.current) return;
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });
      videoRef.current.srcObject = mediaStream;
      await videoRef.current.play();
      setIsLoading(false);
      setCameraStarted(true);
      setStream(mediaStream);
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
    if (!showPrompt && isLoading && !cameraStarted && videoRef.current) {
      startCamera();
    }
    return () => stopCamera();
  }, [showPrompt, isLoading, facingMode]);

  const retakeCamera = () => {
    setCapturedPhoto(null);
    stopCamera();
    setIsLoading(true);
  };

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
  };

  const confirmPhoto = () => {
    setUserData({ ...userData, capturedImage: capturedPhoto });
    navigate("/image-upload", { state: { capturedImage: capturedPhoto } });
  };

  const toggleCamera = () => {
    stopCamera();
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
    setIsLoading(true);
  };

  return (
    <div className="camera-page">
      <div className="diamond-bg"></div>

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
              <div className="camera-tips-inside-feed">
                <p className="tip-heading">TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
                <div className="tip-icons">
                  <span>◇ NEUTRAL EXPRESSION</span>
                  <span>◇ FRONTAL POSE</span>
                  <span>◇ ADEQUATE LIGHTING</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {isLoading && <div className="loading-text">SETTING UP CAMERA...</div>}

      {capturedPhoto && (
        <div className="capture-preview">
          <img src={capturedPhoto} alt="Captured" />
          <div className="camera-controls">
            <button className="control-btn" onClick={retakeCamera}>Retake</button>
            <button className="control-btn" onClick={confirmPhoto}>Use</button>
          </div>
        </div>
      )}

      {!isLoading && cameraStarted && !capturedPhoto && (
        <div className="camera-controls">
          <button className="control-btn" onClick={retakeCamera}>Retake</button>
          <button className="control-btn" onClick={capturePhoto}>Capture</button>
          <button className="control-btn" onClick={toggleCamera}>Switch Cam</button>
          <button className="control-btn" onClick={() => navigate(-1)}>Back</button>
        </div>
      )}
    </div>
  );
};

export default CameraPage;
