import React, { useState } from "react";
import { assets } from "../assets/assets";

const BgSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (event) => {
    setSliderPosition(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">

      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
          Remove Background With High
          <br />
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Quality and Accuracy
          </span>
        </h1>

        <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
          See the difference instantly. Compare the original image with the
          background-removed result using the slider.
        </p>
      </div>

      {/* Image Comparison */}
      <div className="relative max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-2xl select-none">

        {/* Background / Original Image */}
        <img
          src={assets.image_w_bg}
          alt="Original image"
          className="block w-full h-auto"
        />

        {/* Background Removed Image */}
        <div
          className="absolute top-0 left-0 w-full h-full overflow-hidden"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
        >
          <img
            src={assets.image_wo_bg}
            alt="Background removed image"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
          style={{
            left: `${sliderPosition}%`,
            transform: "translateX(-50%)",
          }}
        />

        {/* Slider Button */}
        <div
          className="
            absolute top-1/2
            w-12 h-12
            rounded-full
            bg-white
            shadow-xl
            flex items-center justify-center
            -translate-y-1/2 -translate-x-1/2
            pointer-events-none
          "
          style={{
            left: `${sliderPosition}%`,
          }}
        >
          <div className="flex items-center gap-1 text-slate-600">
            <span className="text-lg">‹</span>
            <span className="text-lg">›</span>
          </div>
        </div>

        {/* Range Slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="
            absolute
            inset-0
            w-full
            h-full
            opacity-0
            cursor-ew-resize
          "
        />

        {/* Labels */}
        <div className="absolute top-5 left-5 px-4 py-2 bg-black/60 text-white rounded-lg text-sm font-medium">
          Original
        </div>

        <div className="absolute top-5 right-5 px-4 py-2 bg-black/60 text-white rounded-lg text-sm font-medium">
          Removed Background
        </div>

      </div>
    </div>
  );
};

export default BgSlider;

