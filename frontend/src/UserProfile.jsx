import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState({ _id: "", username: "", email: "" });
  const [posts, setPosts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized: Please log in first.");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.user) {
          setUser({ _id: data.user._id, username: data.user.username, email: data.user.email });
          setPosts(data.posts || []);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEdit = () => setEditMode(!editMode);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`http://localhost:5000/api/auth/profile/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: user.username, email: user.email }),
      });

      const result = await response.json();
      if (response.ok) {
        setUser(result.user);
        setEditMode(false);
        alert("Profile updated successfully!");
      } else {
        alert(result.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      {/* User Profile Card */}
      <div className="bg-gradient-to-r from-green-400 via-green-800 to-grey-500 shadow-xl rounded-2xl p-6 flex items-center gap-6 text-white">
        {/* User Avatar (Fallback to Initials) */}
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-gray-800 shadow-md">
          {user.username ? user.username.charAt(0).toUpperCase() : "U"}
        </div>

        {/* User Info */}
        <div className="flex-1">
          {editMode ? (
            <>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                className="w-full p-2 rounded-lg text-gray-800"
              />
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full p-2 mt-2 rounded-lg text-gray-800"
              />
              <button
                onClick={handleSave}
                className="mt-3 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-indigo-600 transition"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold">{user.username || "User"}</h1>
              <p className="text-lg">{user.email}</p>
              <button
                onClick={handleEdit}
                className="mt-2 px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-gray-200 transition"
              >
                Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      {/* User's Blog Posts */}
      <h2 className="text-3xl font-semibold text-gray-800 mt-8">My Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="bg-white shadow-lg rounded-lg overflow-hidden relative">
              {/* Post Image */}
              <img
                src={`http://localhost:5000/uploads/${post.image}`}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg"
              />

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>

                {/* Edit Button */}
                <button
                  onClick={() => navigate(`/edit/${post._id}`)}
                  className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition"
                >
                  <FaEdit />
                </button>

                <a
                  href={`/blog/${post._id}`}
                  className="text-green-600 font-semibold mt-2 inline-block"
                >
                  Read More
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
