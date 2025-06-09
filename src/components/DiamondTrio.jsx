import React from "react";

const DiamondTrio = ({ hoverState }) => {
  return (
    <>
      {/* Angular Lines (unchanged) */}
      {/* <div className="absolute top-0 left-0 z-10" style={{
        width: "300px", height: "1px", backgroundColor: "#999",
        transform: "rotate(45deg)", transformOrigin: "top left", opacity: 0.3,
      }} /> */}
      <div className="absolute bottom-0 left-0 z-10" style={{
        width: "300px", height: "1px", backgroundColor: "#999",
        transform: "rotate(-45deg)", transformOrigin: "bottom left", opacity: 0.3,
      }} />
      {/* <div className="absolute top-0 right-0 z-10" style={{
        width: "300px", height: "1px", backgroundColor: "#999",
        transform: "rotate(-45deg)", transformOrigin: "top right", opacity: 0.3,
      }} /> */}
      <div className="absolute bottom-0 right-0 z-10" style={{
        width: "300px", height: "1px", backgroundColor: "#999",
        transform: "rotate(45deg)", transformOrigin: "bottom right", opacity: 0.3,
      }} />

      {/* Dotted Diamond Left */}
      <div className={`diamond-bracket left-diamond ${hoverState === "right" ? "fade-out" : ""}`} />

      {/* Dotted Diamond Right */}
      <div className={`diamond-bracket right-diamond ${hoverState === "left" ? "fade-out" : ""}`} />
    </>
  );
};

export default DiamondTrio;
