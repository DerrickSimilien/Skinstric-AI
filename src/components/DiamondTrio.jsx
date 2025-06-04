import React from "react";

const DiamondTrio = () => {
  return (
    <>
      {/* Top Left Angular Line */}
      <div
        className="absolute top-0 left-0 z-10"
        style={{
          width: "300px",
          height: "1px",
          backgroundColor: "#999", // soft gray
          transform: "rotate(45deg)",
          transformOrigin: "top left",
          opacity: 0.3,
        }}
      />

      {/* Bottom Left Angular Line */}
      <div
        className="absolute bottom-0 left-0 z-10"
        style={{
          width: "300px",
          height: "1px",
          backgroundColor: "#999",
          transform: "rotate(-45deg)",
          transformOrigin: "bottom left",
          opacity: 0.3,
        }}
      />

      {/* Top Right Angular Line */}
      <div
        className="absolute top-0 right-0 z-10"
        style={{
          width: "300px",
          height: "1px",
          backgroundColor: "#999",
          transform: "rotate(-45deg)",
          transformOrigin: "top right",
          opacity: 0.3,
        }}
      />

      {/* Bottom Right Angular Line */}
      <div
        className="absolute bottom-0 right-0 z-10"
        style={{
          width: "300px",
          height: "1px",
          backgroundColor: "#999",
          transform: "rotate(45deg)",
          transformOrigin: "bottom right",
          opacity: 0.3,
        }}
      />
    </>
  );
};

export default DiamondTrio;
