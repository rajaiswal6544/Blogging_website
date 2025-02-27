import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const EditPostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const categories = ["Technology", "Health", "Lifestyle", "Education"];

  useEffect(() => {
    const fetchPost = async () => {
      setFetching(true);
      setError(null);

      try {
        const res = await fetch(`https://blogging-website-backend-eight.vercel.app/api/posts/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post");

        const data = await res.json();
        if (!data || !data.title) throw new Error("Post not found");

        setFormData({
          title: data.title,
          content: data.content,
          category: data.category || "",
          image: data.image || null,
        });
        setPreview(data.image ? `https://blogging-website-backend-eight.vercel.app/uploads/${data.image}` : null);
      } catch (error) {
        setError(error.message);
      } finally {
        setFetching(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.category) {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);
    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("content", formData.content);
    formDataObj.append("category", formData.category);
    if (formData.image) formDataObj.append("image", formData.image);

    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formDataObj,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed!");

      alert("Post updated successfully!");
      navigate(`/blog/${id}`);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch(`https://blogging-website-backend-eight.vercel.app/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed!");

      alert("Post deleted successfully!");
      navigate("/"); // Redirect to home
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg relative mt-16">
      <h2 className="text-2xl font-bold mb-4">Edit Blog Post</h2>

      {fetching ? (
        <p className="text-center text-gray-500">Loading post...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
          >
            <FaTrash size={20} />
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block font-medium">Content:</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows="5"
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            <div>
              <label className="block font-medium">Category:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium">Image:</label>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-md mb-2"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border p-2 rounded-lg"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Post"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default EditPostForm;
