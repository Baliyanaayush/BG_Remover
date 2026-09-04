import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const imageUrl = location.state?.imageUrl;

  // If user directly opens /result without processing an image
  useEffect(() => {
    if (!imageUrl) {
      navigate("/");
    }
  }, [imageUrl, navigate]);

  if (!imageUrl) {
    return null;
  }

  const handleDownload = () => {
    const link = document.createElement("a");

    link.href = imageUrl;
    link.download = "background-removed.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-4xl">

        {/* Heading */}
        <div className="text-center mb-10">

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Your image is ready!
          </h1>

          <p className="mt-3 text-slate-500">
            Background removed successfully.
          </p>

        </div>

        {/* Result Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-5 md:p-8">

          <div
            className="
              rounded-xl
              overflow-hidden
              bg-[linear-gradient(45deg,#f1f5f9_25%,transparent_25%),
              linear-gradient(-45deg,#f1f5f9_25%,transparent_25%),
              linear-gradient(45deg,transparent_75%,#f1f5f9_75%),
              linear-gradient(-45deg,transparent_75%,#f1f5f9_75%)]
              bg-[length:30px_30px]
              bg-[position:0_0,0_15px,15px_-15px,-15px_0px]
            "
          >
            <img
              src={imageUrl}
              alt="Background removed"
              className="w-full max-h-[600px] object-contain"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">

            <button
              onClick={handleDownload}
              className="
                w-full sm:w-auto
                px-8 py-3
                rounded-xl
                bg-slate-900
                text-white
                font-medium
                hover:bg-slate-800
                transition
                cursor-pointer
              "
            >
              Download Image
            </button>

            <button
              onClick={() => navigate("/")}
              className="
                w-full sm:w-auto
                px-8 py-3
                rounded-xl
                border border-slate-300
                text-slate-700
                font-medium
                hover:bg-slate-50
                transition
                cursor-pointer
              "
            >
              Remove Another
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Result;