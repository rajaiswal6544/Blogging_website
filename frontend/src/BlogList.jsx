import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);  // Ensure blogs is always an array
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ["All", "Health", "Education", "Technology", "Lifestyle"];

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      const url =
        selectedCategory && selectedCategory !== "All"
          ? `http://localhost:5000/api/posts/filter?category=${selectedCategory}`
          : "http://localhost:5000/api/posts";

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(Array.isArray(data) ? data : []); // Ensure it's an array
      } catch (error) {
        setError(error.message);
        setBlogs([]); // Avoid undefined state
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [selectedCategory]);

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Category Filter */}
      <div className="flex justify-end mb-6">
        <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-lg p-3 rounded-xl shadow-lg border">
          <FaFilter className="text-gray-600 text-sm" />
          <span className="font-medium text-sm">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1 border rounded-lg bg-white shadow-sm text-sm focus:ring-2 focus:ring-green-500"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Blog Cards or Loading Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(6)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="bg-gray-200 animate-pulse p-6 rounded-lg shadow-md h-80"></div>
            ))
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-300"
            >
              <div className="relative">
                <img
                  src={`http://localhost:5000/uploads/${blog.image}`}
                  alt={blog.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 text-xs rounded-full">
                  {blog.category}
                </div>
              </div>
              <h2 className="text-xl font-semibold mt-4 mb-2">{blog.title}</h2>
              <p className="text-gray-600 text-sm">
                {blog.description?.length > 100 ? `${blog.description.substring(0, 100)}...` : blog.description}
              </p>
              <Link to={`/blog/${blog._id}`} className="text-green-500 font-medium hover:underline mt-3 inline-block">
                Read More →
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
