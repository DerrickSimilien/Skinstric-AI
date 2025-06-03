import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const DiamondButton = ({ side, label, onHover, onLeave, onClick }) => {
  const isLeft = side === "left";

  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 ${
        isLeft ? "left-0" : "right-0"
      } w-64 h-64 transform rotate-45 border border-black z-10 cursor-pointer`}
      onMouseEnter={() => onHover(side)}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div className="absolute inset-0 rotate-[-45deg] flex flex-col items-center justify-center">
        <div className="text-lg mb-1">
          {isLeft ? <FaArrowLeft /> : <FaArrowRight />}
        </div>
        <p className="text-[10px] tracking-widest uppercase text-black">
          {label}
        </p>
      </div>
    </div>
  );
};

export default DiamondButton;
