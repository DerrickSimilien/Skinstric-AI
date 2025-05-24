import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const GalleryAccess = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        navigate("/image-upload", { state: { capturedImage: imageDataUrl } });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {/* Clickable Gallery Card */}
      <div className="gallery-card" onClick={() => fileInputRef.current.click()}>
        <p>ALLOW A.I. ACCESS GALLERY</p>
        {/* Insert your actual icon here if needed */}
        <img src="/path-to-your-icon.png" alt="Gallery Icon" />
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default GalleryAccess;
