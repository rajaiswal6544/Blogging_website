import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const AuthForm = ({ isSignup }) => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const url = isSignup
        ? "http://localhost:5000/api/auth/register"
        : "http://localhost:5000/api/auth/login";
      const response = await axios.post(url, formData);
      console.log("Response:", response.data);
      if (!isSignup) {
        localStorage.setItem("token", response.data.token);
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-200 to-gray-300 mt-2 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900">
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-gray-500">{isSignup ? "Join us today!" : "Sign in to continue"}</p>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          {isSignup && (
            <div>
              <label className="block text-gray-700 font-semibold">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              required
            />
          </div>
          {isSignup && (
            <div>
              <label className="block text-gray-700 font-semibold">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p className="text-center mt-4 text-gray-700">
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <Link
            to={isSignup ? "/signin" : "/signup"}
            className="text-green-600 font-semibold hover:underline"
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthForm;
