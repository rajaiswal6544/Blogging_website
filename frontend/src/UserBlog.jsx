import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaThumbsUp, FaRegComment } from "react-icons/fa";

const API_BASE_URL = "http://localhost:5000/api";

const UserBlog = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`${API_BASE_URL}/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error("Error fetching blog post:", error));

    fetch(`${API_BASE_URL}/likes/${id}`)
      .then((response) => response.json())
      .then((data) => setLikeCount(data.likes || 0))
      .catch((error) => console.error("Error fetching like count:", error));

    fetch(`${API_BASE_URL}/likes/check/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => response.json())
      .then((data) => setLiked(data.liked || false))
      .catch((error) => console.error("Error checking like status:", error));

    fetch(`${API_BASE_URL}/comments/${id}`)
      .then((response) => response.json())
      .then((data) => setComments(data || []))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [id]);

  const handleLike = () => {
    fetch(`${API_BASE_URL}/likes/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
        setLiked((prev) => !prev);
        setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
      })
      .catch((error) => console.error("Error toggling like:", error));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    fetch(`${API_BASE_URL}/comments/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ content: newComment }),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments([...comments, data.comment]);
        setNewComment("");
      })
      .catch((error) => console.error("Error posting comment:", error));
  };

  if (!post) {
    return <div className="text-center text-gray-600 mt-6">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>

      {/* Author & Date */}
      <div className="mt-2 text-gray-500 text-sm text-right">
        <span className="font-semibold">{post.author?.username || "Unknown Author"}</span> -{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </div>

      {/* Blog Image */}
      <div className="mt-4">
        <img
          src={`http://localhost:5000/uploads/${post.image}` || "https://via.placeholder.com/800x400?text=No+Image+Available"}
          alt="Blog Cover"
          className="w-full h-80 object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Blog Content */}
      <div className="mt-6 text-gray-700 leading-relaxed text-lg">
        <p>{post.content}</p>
      </div>

      {/* Like & Comment Icons */}
      <div className="flex items-center mt-6 space-x-4">
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={handleLike}
          className="relative flex items-center space-x-2 focus:outline-none"
        >
          <motion.div
            animate={{ scale: liked ? [1, 1.4, 1] : 1 }}
            transition={{ duration: 0.3 }}
            className={`text-3xl ${liked ? "text-green-500" : "text-gray-500"}`}
          >
            <FaThumbsUp />
          </motion.div>
          <span className="text-gray-700 text-lg">{likeCount}</span>
        </motion.button>

        <div className="flex items-center space-x-2 text-gray-600">
          <FaRegComment className="text-2xl" />
          <span className="text-lg">{comments.length}</span>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Comments</h2>
        <form onSubmit={handleCommentSubmit} className="mt-4 flex space-x-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            placeholder="Leave a comment..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Comment
          </button>
        </form>

        {/* Display Comments */}
        <div className="mt-4 space-y-4">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm flex items-start">
                <div className="flex-grow">
                  <span className="font-semibold text-green-700">{comment?.author?.username || "Anonymous"}</span>
                  <p className="text-gray-700 mt-1">{comment?.content || "No content"}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No comments yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserBlog;
