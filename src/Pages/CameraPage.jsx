import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CameraPage = () => {
  const videoRef = useRef(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [stream, setStream] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);
  const navigate = useNavigate();

  const startCamera = async () => {
    setIsLoading(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
      setStream(mediaStream);
      setCameraStarted(true);
    } catch (err) {
      console.error("Camera error:", err);
      navigate("/camera-error");
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    stream?.getTracks().forEach((track) => track.stop());
    setCameraStarted(false);
    setStream(null);
  };

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    setCapturedImage(dataURL);
  };

  useEffect(() => {
    return () => {
      stopCamera(); // Stop on unmount
    };
  }, []);

  return (
    <div className="camera-page">
      <div className="diamond-bg"></div>

      {showPrompt ? (
        <div className="camera-permission-modal">
          <p className="modal-title">ALLOW A.I. TO ACCESS YOUR CAMERA</p>
          <div className="modal-buttons">
            <button className="deny-btn" onClick={() => navigate("/camera-error")}>DENY</button>
            <button
              className="allow-btn"
              onClick={() => {
                setShowPrompt(false);
                startCamera();
              }}
            >
              ALLOW
            </button>
          </div>
        </div>
      ) : (
        <>
          <video ref={videoRef} autoPlay playsInline className="camera-feed" />

          {isLoading && <div className="loading-text">SETTING UP CAMERA...</div>}

          {cameraStarted && !capturedImage && (
            <div className="camera-controls">
              <button className="control-btn" onClick={capturePhoto}>CAPTURE</button>
              <button className="control-btn" onClick={() => navigate(-1)}>BACK</button>
            </div>
          )}

          {capturedImage && (
            <>
              <img
                src={capturedImage}
                alt="Captured Preview"
                style={{
                  width: "200px",
                  marginTop: "20px",
                  border: "2px solid hotpink",
                  borderRadius: "8px",
                }}
              />
              <div className="camera-controls">
                <button className="control-btn" onClick={() => setCapturedImage(null)}>
                  RETAKE
                </button>

                <div className="bottom-right-nav" onClick={() => {
                  stopCamera();
                  navigate("/image-upload", {
                    replace: true,
                    state: { capturedImage },
                  });
                }}>
                  <span className="proceed-text">PROCEED</span>
                  <div className="diamond small-diamond">
                    <span className="nav-arrow">▶</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CameraPage;
