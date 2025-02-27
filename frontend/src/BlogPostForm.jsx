import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUpload } from "react-icons/fa";

const BlogPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("category", selectedCategory);
    if (formData.image) formDataToSend.append("image", formData.image);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized: Please log in first.");
      return;
    }

    try {
      const response = await fetch("https://blogging-website-backend-eight.vercel.app/api/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Post created successfully!");
        navigate("/");
      } else {
        alert("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-200 to-gray-300 mt-4 px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          ✍️ Create Your Blog Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category Dropdown */}
          <div className="relative">
            <label className="block text-gray-700 font-semibold">Category</label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-300 transition"
              required
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Education">Education</option>
            </select>
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-gray-700 font-semibold">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter your blog title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-300 transition"
              required
            />
          </div>

          {/* Content Textarea */}
          <div>
            <label className="block text-gray-700 font-semibold">Content</label>
            <textarea
              name="content"
              placeholder="Write your blog content..."
              value={formData.content}
              onChange={handleChange}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-300 transition"
              rows="5"
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col items-center">
            <label className="flex items-center gap-3 bg-blue-500 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-600 transition">
              <FaUpload />
              <span>Upload Image</span>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            {formData.image && (
              <p className="text-sm text-gray-700 mt-2">
                Selected: {formData.image.name}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
          >
            🚀 Publish Post
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default BlogPostForm;
