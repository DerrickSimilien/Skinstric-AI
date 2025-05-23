import React, { useRef, useState, useEffect } from "react";
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
    console.log("startCamera called. Current facingMode:", facingMode);
    if (!videoRef.current) {
        console.error("Critical: videoRef.current is null in startCamera. This should be handled by useEffect's condition.");
        setIsLoading(false);
        return;
    }

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
      });
      console.log("getUserMedia successful. Stream:", mediaStream);

      // Assign the stream to the video element
      videoRef.current.srcObject = mediaStream;

      // Use a Promise to await the video playing
      const playPromise = videoRef.current.play();

      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log("Video played successfully.");
          setIsLoading(false); // Camera is visible and playing, so no longer loading
          setCameraStarted(true); // Camera is now active
        }).catch(playErr => {
          console.error("Error playing video:", playErr);
          setIsLoading(false);
          setCameraStarted(false);
          // Potentially navigate to error or show message if play fails
        });
      } else {
        // Fallback for browsers that don't return a Promise from play()
        console.warn("video.play() did not return a Promise. Assuming immediate play.");
        setIsLoading(false);
        setCameraStarted(true);
      }
      setStream(mediaStream); // Store the stream for stopping later
    } catch (err) {
      console.error("Camera access denied or error getting media:", err);
      setIsLoading(false); // Stop loading on error
      setCameraStarted(false); // Camera failed to start
      navigate("/camera-error");
    }
  };

  const stopCamera = () => {
    console.log("stopCamera called. Current stream:", stream);
    if (stream) {
      stream.getTracks().forEach((track) => {
        console.log("Stopping track:", track);
        track.stop();
      });
      setStream(null); // Clear the stream state
      setCameraStarted(false); // Explicitly set to false
    }
  };

  // This useEffect triggers startCamera only when:
  // 1. Prompt is gone
  // 2. We've decided to start the camera (isLoading is true - our flag to initiate)
  // 3. Camera isn't already started
  // 4. The videoRef is available
  // It will NOT trigger when cameraStarted goes from false to true, preventing the loop.
  useEffect(() => {
    console.log("useEffect triggered. showPrompt:", showPrompt, "isLoading:", isLoading, "cameraStarted:", cameraStarted, "facingMode:", facingMode, "videoRef.current:", videoRef.current);

    if (!showPrompt && isLoading && !cameraStarted && videoRef.current) {
      console.log("Attempting to start camera from useEffect as all conditions met.");
      startCamera();
    }

    // Cleanup: stop camera when component unmounts or facingMode/prompt changes
    return () => {
      console.log("useEffect cleanup. Stopping camera.");
      stopCamera();
    };
  }, [showPrompt, isLoading, facingMode, videoRef.current]); // REMOVED 'cameraStarted' from dependencies

  // --- Control Functions ---
  const retakeCamera = () => {
    console.log("Retake Camera clicked.");
    stopCamera(); // Stop the current stream
    setCameraStarted(false); // Explicitly set to false for clarity
    setIsLoading(true); // Re-enter loading state to trigger startCamera via useEffect
  };

  const capturePhoto = () => {
    console.log("Capture Photo clicked. videoRef.current:", videoRef.current, "cameraStarted:", cameraStarted);
    if (!videoRef.current || !cameraStarted) {
      console.warn("Cannot capture photo: Camera not active.");
      return;
    }
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataURL = canvas.toDataURL("image/png");
    console.log("📸 Captured Photo:", dataURL.substring(0, 100) + "...");
    // alert("Photo captured! (Check console)");
    navigate("/image-upload", { state: { capturedImage: dataURL } });
  };

  const toggleCamera = () => {
    console.log("Toggle Camera clicked. Current facingMode:", facingMode);
    stopCamera(); // Stop current stream
    setFacingMode((prev) => (prev === "user" ? "environment" : "user")); // Change facingMode
    setCameraStarted(false); // Explicitly set to false for clarity
    setIsLoading(true); // Re-enter loading state to trigger startCamera via useEffect
  };
  // --- End Control Functions ---

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
                console.log("ALLOW button clicked. Hiding prompt and setting loading.");
                setShowPrompt(false);
                setIsLoading(true); // Start loading immediately after hiding prompt
              }}
            >
              ALLOW
            .            </button>
          </div>
        </div>
      )}

      {!showPrompt && ( // Render video element if prompt is hidden
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="camera-feed"
          // Hide video if still loading or not started
          style={{ display: (!isLoading && cameraStarted) ? 'block' : 'none' }}
        />
      )}

      {isLoading && ( // Show loading text when isLoading is true
        <div className="loading-text">SETTING UP CAMERA...</div>
      )}

      {/* Show controls only when camera is started and not loading */}
      {!isLoading && cameraStarted && (
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
      )}
    </div>
  );
};

export default CameraPage;









