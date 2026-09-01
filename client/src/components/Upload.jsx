import { assets } from "../assets/assets";

const Upload = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-center">

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
        See the magic.
        <br />
        <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
          Try it now.
        </span>
      </h1>

      {/* Description */}
      <p className="mt-5 text-slate-500 max-w-xl mx-auto text-base md:text-lg">
        Upload your image and remove the background instantly with our
        AI-powered background remover.
      </p>

      {/* Upload Area */}
  
{/* Upload Area */}
<div className="mt-10">

  <input
    type="file"
    name="image"
    id="upload1"
    hidden
    accept="image/*"
  />

  <label
    htmlFor="upload1"
    className="
      mx-auto
      w-full max-w-xl
      min-h-[260px]
      flex flex-col items-center justify-center
      gap-4
      cursor-pointer
      rounded-3xl
      border-2 border-dashed border-slate-200
      bg-white
      hover:border-purple-300
      hover:bg-purple-50/30
      transition-all duration-300
      shadow-sm
    "
  >

    {/* Upload Icon */}
    <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-purple-50">
      <img
        src={assets.upload_btn_icon}
        alt="Upload"
        className="w-8 h-8"
      />
    </div>

    {/* Text */}
    <div>
      <p className="text-lg font-semibold text-slate-800">
        Upload your image
      </p>

      <p className="mt-1 text-sm text-slate-400">
        Drag & drop or choose an image from your device
      </p>
    </div>

    {/* Actual Button */}
    <div
      className="
        mt-2
        px-7 py-3
        rounded-full
        bg-slate-900
        text-white
        text-sm font-medium
        hover:bg-purple-600
        transition-colors duration-200
        shadow-md
      "
    >
      Upload Image
    </div>

    {/* Supported Formats */}
    <p className="text-xs text-slate-400">
      JPG, PNG, JPEG • Max 5MB
    </p>

  </label>

</div>



      {/* Bottom Text */}
      <p className="mt-6 text-sm text-slate-400">
        No signup required • Fast processing • High quality results
      </p>

    </div>
  );
};

export default Upload;

