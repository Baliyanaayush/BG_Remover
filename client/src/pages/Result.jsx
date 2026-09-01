import React from "react";
import { assets } from "../assets/assets";
import { FaDownload, FaRedo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-4 my-3 lg:mx-44 mt-14 min-h-[75vh]">

      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Your Image is{" "}
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Ready!
          </span>
        </h1>

        <p className="mt-3 text-slate-500">
          Compare your original image with the background removed result.
        </p>
      </div>

      {/* Image Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Original Image */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          <div className="px-5 py-4 border-b border-slate-100">
            <p className="font-semibold text-slate-800">
              Original
            </p>
          </div>

          <div className="bg-slate-100 p-4 flex items-center justify-center min-h-[350px]">
            <img
              src={assets.image_w_bg}
              alt="Original"
              className="max-w-full max-h-[450px] object-contain rounded-lg"
            />
          </div>

        </div>

        {/* Background Removed */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          <div className="px-5 py-4 border-b border-slate-100">
            <p className="font-semibold text-slate-800">
              Background Removed
            </p>
          </div>

          {/* Checkerboard Background */}
          <div
            className="
              p-4
              flex items-center justify-center
              min-h-[350px]
              bg-[linear-gradient(45deg,#f1f5f9_25%,transparent_25%),linear-gradient(-45deg,#f1f5f9_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f1f5f9_75%),linear-gradient(-45deg,transparent_75%,#f1f5f9_75%)]
              bg-[length:30px_30px]
              bg-[position:0_0,0_15px,15px_-15px,-15px_0px]
            "
          >
            <img
              src={assets.image_wo_bg}
              alt="Background removed"
              className="max-w-full max-h-[450px] object-contain"
            />
          </div>

        </div>

      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 pb-10">

        {/* Download */}
        <button
          className="
            flex items-center justify-center gap-2
            px-7 py-3
            rounded-full
            bg-slate-900
            text-white
            font-medium
            hover:bg-purple-600
            transition-all duration-200
            shadow-md
            cursor-pointer
          "
        >
          <FaDownload className="text-sm" />
          Download Image
        </button>

        {/* Try Again */}
        <button
          onClick={() => navigate("/")}
          className="
            flex items-center justify-center gap-2
            px-7 py-3
            rounded-full
            border border-slate-300
            text-slate-700
            font-medium
            hover:bg-slate-300
            transition-all duration-200
            cursor-pointer
          "
        >
          <FaRedo className="text-sm" />
          Try Another Image
        </button>

      </div>

    </div>
  );
};

export default Result;

