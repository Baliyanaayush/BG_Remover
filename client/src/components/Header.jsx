
import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12">

      {/* Left Side */}
      <div className="w-full md:w-1/2">

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
          Remove the <br />

          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            background
          </span>

          {" "}from <br />
          images for free.
        </h1>

        <p className="mt-6 text-slate-500 text-base md:text-lg leading-relaxed max-w-xl">
          Remove backgrounds from your images instantly with our
          AI-powered background remover. Fast, simple and completely free.
        </p>

        {/* Upload Box */}
        <div className="mt-8">
          <input type="file" name="image"id="upload1" hidden accept="image/*"/>

          <label
            htmlFor="upload1"className="inline-flex items-center gap-4 cursor-pointer px-7 py-4 rounded-xl bg-slate-900 text-white shadow-lg hover:bg-slate-800 hover:scale-[1.02] transition-all duration-200"
          >
            <img src={assets.upload_btn_icon} alt="Upload" className="w-6 h-6"/>

            <p className="font-medium">
              Upload your image
            </p>
          </label>

          <p className="mt-3 text-sm text-slate-400">
            JPG, PNG or JPEG • Max 5MB
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="relative w-full max-w-lg">

          {/* Decorative Background */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-60" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-60" />

          {/* Image */}
          <img
            src={assets.header_img}
            alt="Background remover"
            className="relative w-full object-contain drop-shadow-2xl"
          />

        </div>
      </div>

    </div>
  );
};

export default Header;

