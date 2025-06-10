import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdKeyboardBackspace } from "react-icons/md";
import { FaRegThumbsUp, FaRegCommentDots, FaShareAlt } from "react-icons/fa";
import axios from 'axios';
import BlogCards from '../components/BlogCards';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const BlogPost = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const blogId = query.get('id');
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!blogId) {
      navigate('/'); // redirect if no id
      return;
    }

    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/v1/blogs/blogs/${blogId}`);
        setBlog(data.blog);
      } catch (error) {
        console.error("Error fetching blog:", error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId, navigate]);

  if (loading) return <div className="text-center mt-20 text-lg text-gray-500">Loading blog post...</div>;
  if (!blog) return null;

  const paragraphs = blog.content.split(/\n{2,}|\r\n\r\n/);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-2 py-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 mb-8">
        {/* Header */}
        <div className="flex items-center mb-6 h-14 bg-green-100 rounded-md px-3">
          <button
            className="text-2xl text-gray-600 mr-2 p-2 rounded-full hover:bg-gray-200 transition"
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            <MdKeyboardBackspace />
          </button>
          <h1 className="flex-1 text-center font-bold text-xl text-gray-900 truncate">{blog.title}</h1>
          <div className="w-8" />
        </div>

        {/* Category Tag */}
        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-2 capitalize">
          {blog.category || 'General'}
        </span>

        {/* Blog Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{blog.title}</h1>

        {/* Date Info */}
        <p className="text-gray-400 text-xs mb-4">
          ADTMarathi &middot; {new Date(blog.createdAt).toLocaleDateString()} &middot; <span className="italic">Blog</span>
        </p>

        {/* Blog Image */}
        <img
          src={blog.blogImageUrl}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        {/* Content */}
        <div className="text-gray-700 text-base mb-6 leading-7">
          {paragraphs.map((para, idx) => (
            <p key={idx} className="mb-4">{para}</p>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-6 mb-4 justify-center text-sm">
          <button className="flex items-center gap-2 text-gray-600 hover:text-green-700 transition">
            <FaRegThumbsUp /> <span>Like</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-green-700 transition">
            <FaRegCommentDots /> <span>Comment</span>
          </button>
          <button className="flex items-center gap-2 text-gray-600 hover:text-green-700 transition">
            <FaShareAlt /> <span>Share</span>
          </button>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="w-full max-w-2xl">
        <h2 className="text-lg font-semibold mb-4 text-green-700">Recent Posts</h2>
        <BlogCards />
      </div>

      <div className="h-10" />
    </div>
  );
};

export default BlogPost;
