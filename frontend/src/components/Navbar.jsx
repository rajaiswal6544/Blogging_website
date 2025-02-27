import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    setIsAuthenticated(false); // Update state
    navigate("/"); // Redirect to home page
  };

  return (
    <nav className="flex items-center justify-between px-8 py-3 bg-white shadow-md rounded-full w-[90%] max-w-6xl mx-auto mt-4">
      {/* Logo on the Left */}
      <div className="text-green-600 font-bold text-2xl">panini8</div>

      {/* Navigation Links in the Center */}
      <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <Link to="/" className="hover:text-green-600">Home</Link>
        <Link to="/user" className="hover:text-green-600">Profile</Link>
         <Link to="/post" className="hover:text-green-600">Create Blog</Link>
      </div>

      {/* Auth Buttons on the Right */}
      <div className="flex space-x-4">
        {isAuthenticated ? (
          <button 
            onClick={handleLogout} 
            className="text-red-600 font-medium hover:text-red-800 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/signin" className="text-green-600 font-medium">Sign In</Link>
            <Link to="/signup" className="text-green-600 font-medium">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
