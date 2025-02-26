import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AuthForm from "./AuthForm"
import BlogPostForm from "./BlogPostForm";
import BlogList from "./BlogList";
import UserBlog from "./UserBlog";
import UserProfile from "./UserProfile";
import EditPostForm from "./EditPostForm";
function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/signin" element={<AuthForm isSignup={false} />} />
        <Route path="/signup" element={<AuthForm isSignup={true} />} />
          <Route path="/post" element={<BlogPostForm />} />
          <Route path="/blog/:id" element={<UserBlog />} />
          <Route path="/edit/:id" element={<EditPostForm />} />
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
