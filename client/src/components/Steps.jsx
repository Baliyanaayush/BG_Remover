
import { assets } from "../assets/assets";

const Steps = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">

      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
          Steps to remove image
          <br />
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            background
          </span>{" "}
          in seconds.
        </h1>

        <p className="mt-4 text-slate-500 max-w-xl mx-auto">
          Remove backgrounds from your images in just three simple steps.
          No design skills required.
        </p>
      </div>

      {/* Steps Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Step 1 */}
        <div
          className="group flex flex-col items-center text-center p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 " >
          <div
            className="
              w-16 h-16
              flex items-center justify-center
              rounded-2xl
              bg-purple-50
              mb-6
              group-hover:scale-110
              transition-transform duration-300
            "
          >
            <img
              src={assets.upload_icon}
              alt="Upload image"
              className="w-8 h-8 object-contain"
            />
          </div>

          <span className="text-sm font-semibold text-purple-500 mb-2">
            STEP 01
          </span>

          <p className="text-xl font-semibold text-slate-800">
            Upload image
          </p>

          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            Choose the image you want to edit from your device. We support
            popular image formats like JPG and PNG.
          </p>
        </div>

        {/* Step 2 */}
        <div
          className="
            group
            flex flex-col items-center text-center
            p-8
            bg-white
            border border-slate-100
            rounded-2xl
            shadow-sm
            hover:shadow-xl
            hover:-translate-y-2
            transition-all duration-300
          "
        >
          <div
            className="
              w-16 h-16
              flex items-center justify-center
              rounded-2xl
              bg-pink-50
              mb-6
              group-hover:scale-110
              transition-transform duration-300
            "
          >
            <img
              src={assets.remove_bg_icon}
              alt="Remove background"
              className="w-8 h-8 object-contain"
            />
          </div>

          <span className="text-sm font-semibold text-pink-500 mb-2">
            STEP 02
          </span>

          <p className="text-xl font-semibold text-slate-800">
            Remove background
          </p>

          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            Our AI automatically detects the subject and removes the
            background while keeping the important details intact.
          </p>
        </div>

        {/* Step 3 */}
        <div
          className="
            group
            flex flex-col items-center text-center
            p-8
            bg-white
            border border-slate-100
            rounded-2xl
            shadow-sm
            hover:shadow-xl
            hover:-translate-y-2
            transition-all duration-300
          "
        >
          <div
            className="
              w-16 h-16
              flex items-center justify-center
              rounded-2xl
              bg-blue-50
              mb-6
              group-hover:scale-110
              transition-transform duration-300
            "
          >
            <img
              src={assets.download_icon}
              alt="Download image"
              className="w-8 h-8 object-contain"
            />
          </div>

          <span className="text-sm font-semibold text-blue-500 mb-2">
            STEP 03
          </span>

          <p className="text-xl font-semibold text-slate-800">
            Download image
          </p>

          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            Preview your transparent image and download the final result
            instantly in high quality.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Steps;
