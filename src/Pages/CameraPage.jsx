import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const CameraPage = () => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [stream, setStream] = useState(null);
  const [facingMode, setFacingMode] = useState("user"); // front by default
  const navigate = useNavigate();

  const startCamera = async () => {
    try {
      setIsLoading(true);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
      setStream(mediaStream);
      setTimeout(() => {
        setIsLoading(false);
        setCameraStarted(true);
      }, 1500);
    } catch (err) {
      console.error("Camera access denied", err);
      navigate("/camera-error");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setCameraStarted(false);
    }
  };

  const retakeCamera = () => {
    stopCamera();
    startCamera();
  };

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    console.log("📸 Captured Photo:", dataURL); // or save/send it
    alert("Photo captured! (Check console)");
  };

  const toggleCamera = () => {
    stopCamera();
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
    setTimeout(() => {
      startCamera();
    }, 300);
  };

  return (
    <div className="camera-page">
      <div className="diamond-bg"></div>

      {showPrompt ? (
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
                setTimeout(() => startCamera(), 200);
              }}
            >
              ALLOW
            </button>
          </div>
        </div>
      ) : isLoading ? (
        <div className="loading-text">SETTING UP CAMERA...</div>
      ) : (
        <>
          <video ref={videoRef} autoPlay className="camera-feed" />
          <div className="camera-controls">
            <button className="control-btn" onClick={retakeCamera}>
              RETAKE
            </button>
            <button className="control-btn" onClick={capturePhoto}>
              CAPTURE
            </button>
            <button className="control-btn" onClick={toggleCamera}>
              SWITCH CAM
            </button>
            <button className="control-btn" onClick={() => navigate(-1)}>
              BACK
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CameraPage;
