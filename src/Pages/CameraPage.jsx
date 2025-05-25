import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CameraPage = () => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [stream, setStream] = useState(null);
  const [facingMode, setFacingMode] = useState("user");
  const [capturedImage, setCapturedImage] = useState(null); // final image for preview
  const [tempImage, setTempImage] = useState(null); // temporary captured image for confirmation
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();

  const startCamera = async () => {
    if (!videoRef.current) {
      setIsLoading(false);
      return;
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });

      videoRef.current.srcObject = mediaStream;

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        await playPromise;
      }

      setStream(mediaStream);
      setIsLoading(false);
      setCameraStarted(true);
    } catch (err) {
      setIsLoading(false);
      setCameraStarted(false);
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

    return () => {
      stopCamera();
    };
  }, [showPrompt, isLoading, facingMode, videoRef.current]);

  const retakeCamera = () => {
    stopCamera();
    setCameraStarted(false);
    setCapturedImage(null);
    setTempImage(null);
    setShowConfirmModal(false);
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
    setTempImage(dataURL);
    setShowConfirmModal(true); // 🔥 Show confirmation modal
  };

  const confirmImage = () => {
    setCapturedImage(tempImage); // Set the final image
    setShowConfirmModal(false); // Hide modal
    stopCamera(); // Optional: turn off camera once confirmed
  };

  const toggleCamera = () => {
    stopCamera();
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
    setCameraStarted(false);
    setIsLoading(true);
  };

  const proceedWithImage = () => {
    if (capturedImage) {
      navigate("/image-upload", {
        state: { capturedImage },
      });
    }
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

      {!showPrompt && (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="camera-feed"
            style={{ display: !isLoading && cameraStarted && !capturedImage ? "block" : "none" }}
          />

          {isLoading && (
            <div className="loading-text">SETTING UP CAMERA...</div>
          )}

          {/* Final Preview (after confirmation) */}
          {!isLoading && capturedImage && (
            <div className="preview-box">
              <img src={capturedImage} alt="Captured Preview" className="preview-image" />
            </div>
          )}

          {/* Buttons */}
          {!isLoading && cameraStarted && !capturedImage && (
            <div className="camera-controls">
              <button className="control-btn" onClick={retakeCamera}>RETAKE</button>
              <button className="control-btn" onClick={capturePhoto}>CAPTURE</button>
              <button className="control-btn" onClick={toggleCamera}>SWITCH CAM</button>
              <button className="control-btn" onClick={() => navigate(-1)}>BACK</button>
            </div>
          )}

          {!isLoading && capturedImage && (
            <div className="camera-controls">
              <button className="control-btn" onClick={retakeCamera}>RETAKE</button>
              <button className="control-btn" onClick={proceedWithImage}>PROCEED</button>
              <button className="control-btn" onClick={() => navigate(-1)}>BACK</button>
            </div>
          )}
        </>
      )}

      {/* 🔥 Confirmation Modal */}
      {showConfirmModal && (
        <div className="confirmation-modal">
          <div className="confirm-preview-box">
            <img src={tempImage} alt="Confirm" />
          </div>
          <p className="confirmation-text">Use this photo?</p>
          <div className="confirm-buttons">
            <button className="confirm-btn" onClick={confirmImage}>YES, USE PHOTO</button>
            <button className="cancel-btn" onClick={retakeCamera}>RETAKE</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraPage;
