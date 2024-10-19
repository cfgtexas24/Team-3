// src/components/BubbleText.jsx

import React from "react";

const BubbleText = () => {
  return (
    <div className="grid h-screen place-content-center bg-black">
      <h2 className="text-center text-5xl font-thin text-indigo-300">
        {"STORM Center of Hope and Service".split("").map((child, idx) => (
          <span
            className="transition-transform duration-200 hover:scale-125"
            key={idx}
          >
            {child}
          </span>
        ))}
      </h2>
    </div>
  );
};

export default BubbleText;
