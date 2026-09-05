import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useAuth } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getCredit,
  removeBackground,
} from "../AuthSlice";

const Header = () => {
  const { getToken, isSignedIn } = useAuth();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    
    // Check login
    
    if (!isSignedIn) {
      alert("Please login first.");
      return;
    }

    
    // Check file type
    
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Please upload a JPG, JPEG, PNG or WEBP image."
      );

      event.target.value = "";
      return;
    }

    
    // Check file size
    
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");

      event.target.value = "";
      return;
    }

    try {
      setLoading(true);

      
      // Remove background using Redux
      
      const imageUrl = await dispatch(
        removeBackground({
          file,
          getToken,
        })
      ).unwrap();
      // Refresh user's credits 
      dispatch(getCredit(getToken));

      
      // Navigate to result page
      
      navigate("/result", {
        state: {
          imageUrl,
        },
      });

    } catch (error) {
      console.error(
        "Background removal error:",
        error
      );

      alert(
        error?.message ||
          "Failed to remove background. Please try again."
      );

    } finally {
      setLoading(false);

      // Clear file input
      event.target.value = "";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12">

     
         {/* Left Side */}
     
      <div className="w-full md:w-1/2">

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">

          Remove the <br />

          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            background
          </span>

          {" "}from <br />

          images for free.

        </h1>

        {/* Description */}
        <p className="mt-6 text-slate-500 text-base md:text-lg leading-relaxed max-w-xl">
          Remove backgrounds from your images instantly
          with our AI-powered background remover.
          Fast, simple and completely free.
        </p>

        {/* Upload Button */}
        <div className="mt-8">

          <input
            type="file"
            name="image"
            id="upload1"
            hidden
            accept="image/jpeg,image/png,image/jpg,image/webp"
            onChange={handleImageUpload}
            disabled={loading}
          />

          <label
            htmlFor="upload1"
            className={`
              inline-flex items-center gap-4
              px-7 py-4
              rounded-xl
              bg-slate-900
              text-white
              shadow-lg
              transition-all duration-200
              ${
                loading
                  ? "opacity-60 cursor-not-allowed"
                  : "cursor-pointer hover:bg-slate-800 hover:scale-[1.02]"
              }
            `}
          >

            {/* Upload Icon */}
            <img
              src={assets.upload_btn_icon}
              alt="Upload"
              className="w-6 h-6"
            />

            {/* Button Text */}
            <p className="font-medium">
              {loading
                ? "Removing Background..."
                : "Upload your image"}
            </p>

          </label>

          {/* File Information */}
          <p className="mt-3 text-sm text-slate-400">
            JPG, PNG or JPEG • Max 5MB
          </p>

          {/* Loading Message */}
          {loading && (
            <div className="mt-4 flex items-center gap-2">

              {/* Spinner */}
              <div
                className="
                  w-4 h-4
                  border-2
                  border-purple-200
                  border-t-purple-600
                  rounded-full
                  animate-spin
                "
              />

              <p className="text-sm text-purple-500 font-medium">
                AI is removing the background. Please wait...
              </p>

            </div>
          )}

        </div>
      </div>


      
          {/* Right Side */}
      

      <div className="w-full md:w-1/2 flex justify-center">

        <div className="relative w-full max-w-lg">

          {/* Decorative Background */}
          <div
            className="
              absolute
              -top-6
              -right-6
              w-32
              h-32
              bg-purple-200
              rounded-full
              blur-3xl
              opacity-60
            "
          />

          <div
            className="
              absolute
              -bottom-6
              -left-6
              w-32
              h-32
              bg-blue-200
              rounded-full
              blur-3xl
              opacity-60
            "
          />

          {/* Header Image */}
          <img
            src={assets.header_img}
            alt="Background remover"
            className="
              relative
              w-full
              object-contain
              drop-shadow-2xl
            "
          />

        </div>

      </div>

    </div>
  );
};

export default Header;

