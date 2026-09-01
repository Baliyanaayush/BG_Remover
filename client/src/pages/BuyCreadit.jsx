
import React from "react";
import { assets, plans } from "../assets/assets";

const BuyCreadit = () => {
  return (
    <div className="min-h-[80vh] text-center pt-14 pb-20 px-4">

      {/* Heading */}
      <button
        className=" px-5 py-2 rounded-full border border-purple-200 bg-purple-50 text-purple-600 text-sm font-medium"
      >
        Our Plans
      </button>

      <h1 className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
        Choose the plan that's
        <br />
        <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
          right for you
        </span>
      </h1>

      <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
        Get more credits and remove backgrounds from your images with ease.
        Choose a plan that works best for you.
      </p>

      {/* Plans */}
      <div
        className=" max-w-6xl mx-auto mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left"
      >
        {plans.map((item, index) => (
          <div
            key={index}
            className={`
              relative
              bg-white
              rounded-2xl
              border
              p-8
              shadow-sm
              hover:shadow-xl
              hover:-translate-y-2
              transition-all duration-300
              ${
                index === 1
                  ? "border-purple-400 ring-2 ring-purple-100"
                  : "border-slate-200"
              }
            `}
          >

            {/* Popular Badge */}
            {index === 1 && (
              <div
                className="
                  absolute
                  -top-4
                  left-1/2
                  -translate-x-1/2
                  px-4 py-1.5
                  rounded-full
                  bg-gradient-to-r from-purple-500 to-pink-500
                  text-white
                  text-xs font-semibold
                "
              >
                MOST POPULAR
              </div>
            )}

            {/* Icon */}
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-50 mb-6">
              <img
                src={assets.logo_icon}
                alt="Plan"
                className="w-8 h-8 object-contain"
              />
            </div>

            {/* Plan Name */}
            <p className="text-xl font-bold text-slate-900">
              {item.id}
            </p>

            {/* Description */}
            <p className="mt-2 text-sm text-slate-500 min-h-[45px]">
              {item.desc}
            </p>

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-slate-900">
                ${item.price}
              </span>

              <span className="text-sm text-slate-500">
                / {item.credits} credits
              </span>
            </div>

            {/* Purchase Button */}
            <button
              className="
                mt-8
                w-full
                py-3
                rounded-xl
                bg-slate-900
                text-white
                font-medium
                hover:bg-purple-600
                transition-colors duration-200
              "
            >
              Purchase
            </button>

          </div>
        ))}
      </div>

    </div>
  );
};

export default BuyCreadit;

