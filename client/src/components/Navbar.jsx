import { useClerk, UserButton, useAuth, useUser } from "@clerk/react";
import { assets } from "../assets/assets";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCredit } from "../AuthSlice";

const Navbar = () => {
  const { openSignIn } = useClerk();

  const { isSignedIn, getToken } = useAuth();

  const {user} = useUser();

  const dispatch = useDispatch();

  const { creditBalance, loading } = useSelector(
    (state) => state.credit
  );

  useEffect(() => {
    if (isSignedIn) {
      dispatch(getCredit(getToken));
    }
  }, [isSignedIn, getToken, dispatch]);

  return (
    <nav className="w-full bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/">
          <img
            src={assets.logo}
            alt="BG Remover"
            className="w-32 md:w-36 object-contain"
          />
        </Link>

        {/* Right Side */}
           {isSignedIn ? (
            <div className="flex items-center gap-4">

           {/* User Name */}
           <p className="hidden sm:block text-sm font-medium text-slate-700">
             Hi, {user?.firstName || "User"}
                </p>

    {/* Credits */}
                 <Link
               to="/buy"
                className="
                flex items-center gap-2
        px-4 py-2
        rounded-full
        bg-purple-50
        border border-purple-100
        text-purple-700
        text-sm font-medium
        hover:bg-purple-100
        hover:border-purple-200
        transition-all duration-200
      "
    >
      <img
        src={assets.credit_icon}
        alt="Credits"
        className="w-5 h-5 object-contain"
      />

      <span>
        Credits :{" "}
        <span className="font-bold text-purple-800">
          {loading ? "..." : creditBalance}
        </span>
      </span>
    </Link>

    {/* Clerk User Button */}
    <UserButton />
  </div>
) : (
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
    onClick={() => openSignIn({})}
  >
    Get Started
    <FaArrowRight className="text-xs" />
  </button>
)}


      </div>
    </nav>
  );
};

export default Navbar;

