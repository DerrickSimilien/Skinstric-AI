import React from "react";

const DiamondTrio = () => {
  const sizes = [48, 64, 80];
  return (
    <div className="absolute left-12 top-1/2 transform -translate-y-1/2 flex flex-col items-center z-10">
      {sizes.map((size, i) => (
        <div
          key={i}
          className="absolute border border-black rotate-45"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            opacity: 0.1 + i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

export default DiamondTrio;
