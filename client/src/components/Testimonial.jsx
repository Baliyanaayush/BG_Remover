
import React from "react";
import { testimonialsData } from "../assets/assets";

const Testimonial = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">

      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
          Customer{" "}
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
            Testimonials
          </span>
        </h1>

        <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
          See what our customers have to say about their experience with
          BG Remover.
        </p>
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {testimonialsData.map((item, index) => (
          <div
            key={index}
            className="group bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >

            {/* Quote */}
            <div className="text-5xl font-serif text-purple-200 leading-none mb-4">
              "
            </div>

            {/* Testimonial Text */}
            <p className="text-slate-600 leading-relaxed min-h-[100px]">
              {item.text}
            </p>

            {/* Divider */}
            <div className="border-t border-slate-100 my-6" />

            {/* User Info */}
            <div className="flex items-center gap-4">

              {/* Profile Image */}
              <img
                src={item.image}
                alt={item.author}
                className="
                  w-12 h-12
                  rounded-full
                  object-cover
                  ring-2 ring-purple-100
                "
              />

              {/* Name + Job */}
              <div>
                <p className="font-semibold text-slate-800">
                  {item.author}
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  {item.jobTitle}
                </p>
              </div>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Testimonial;

