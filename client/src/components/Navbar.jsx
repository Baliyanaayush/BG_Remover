
import { useClerk, UserButton, useUser } from "@clerk/react";
import { assets } from "../assets/assets";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {

const {openSignIn} = useClerk()
const {isSignedIn, user} = useUser()



  return (
    <nav className="w-full bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/"><img
          src={assets.logo}
          alt="BG Remover"
          className="w-32 md:w-36 object-contain"
        /></Link>

        {
          isSignedIn?<div><UserButton /></div> :
           <button
          className="
            flex items-center gap-2
            bg-slate-900
            cursor-pointer
            text-white
            px-5 py-2.5
            rounded-full
            text-sm font-medium
            hover:bg-slate-800
            transition-all duration-200
            shadow-sm
            hover:shadow-md
          "
          onClick={()=>openSignIn({})}
        >
          Get Started
          <FaArrowRight className="text-xs" />
        </button>
        }

        {/* Get Started Button */}
       

      </div>
    </nav>
  );
};

export default Navbar;

