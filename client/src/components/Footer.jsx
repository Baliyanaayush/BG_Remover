
import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="mt-20 bg-gray-900 text-white">

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">

        {/* Main Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Logo + Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <img
              src={assets.logo}
              alt="BG Remover"
              className="w-36"
            />

            <p className="text-sm text-slate-400 text-center md:text-left">
              Copyright © BG Remover | All rights reserved
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">

            <a
              href="#"
              className="
                w-10 h-10
                flex items-center justify-center
                rounded-full
                bg-slate-800
                hover:bg-white
                transition-all duration-200
              "
            >
              <img
                src={assets.facebook_icon}
                alt="Facebook"
                className="w-5 h-5 object-contain"
              />
            </a>

            <a
              href="#"
              className="
                w-10 h-10
                flex items-center justify-center
                rounded-full
                bg-slate-800
                hover:bg-white
                transition-all duration-200
              "
            >
              <img
                src={assets.twitter_icon}
                alt="Twitter"
                className="w-5 h-5 object-contain"
              />
            </a>

            <a
              href="#"
              className="
                w-10 h-10
                flex items-center justify-center
                rounded-full
                bg-slate-800
                hover:bg-white
                transition-all duration-200
              "
            >
              <img
                src={assets.google_plus_icon}
                alt="Google Plus"
                className="w-5 h-5 object-contain"
              />
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

