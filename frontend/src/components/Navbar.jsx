import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-3 bg-white shadow-md rounded-full w-[90%] max-w-6xl mx-auto mt-4">
      {/* Logo on the Left */}
      <div className="text-green-600 font-bold text-2xl">panini8</div>

      {/* Navigation Links in the Center */}
      <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <a href="/" className="hover:text-green-600">Home</a>
        <a href="/user" className="hover:text-green-600">Profile</a>
        <a href="/post" className="hover:text-green-600">Create Blog</a>
      </div>

      {/* Sign In and Sign Up on the Right */}
      <div className="flex space-x-4">
        <Link to="/signin" className="text-green-600 font-medium">Sign In</Link>
        <Link to="/signup" className="text-green-600 font-medium">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
