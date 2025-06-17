import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BlogPost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    content: "",
    blogImageUrl: "",
    applyUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // Assumes JWT is stored in localStorage
      const response = await axios.post(
        `/api/v1/blogs/blogs`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        navigate("/"); // redirect to blog list/home
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(
        error.response?.data?.message ||
          "Something went wrong while posting the blog."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 mt-10 bg-white rounded-xl shadow-md border">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Blog Post</h2>

      {errorMsg && <div className="text-red-600 text-sm mb-4">{errorMsg}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-3 border rounded-lg"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Content"
          className="w-full p-3 border rounded-lg h-32"
          value={form.content}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="blogImageUrl"
          placeholder="Image URL"
          className="w-full p-3 border rounded-lg"
          value={form.blogImageUrl}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="applyUrl"
          placeholder="Apply URL (optional)"
          className="w-full p-3 border rounded-lg"
          value={form.applyUrl}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Posting..." : "Post Blog"}
        </button>
      </form>
    </div>
  );
};

export default BlogPost;
