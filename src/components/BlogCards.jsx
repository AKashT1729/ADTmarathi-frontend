import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogCards = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`/api/v1/blogs/blogs`);
        // Adjust for API response shape: response.data.data.data is the array
        const blogArray =
          response.data?.data?.data ||
          response.data?.data ||
          response.data?.blogs ||
          [];
        setBlogs(Array.isArray(blogArray) ? blogArray : []);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleReadMore = (id) => {
    navigate(`/singleblog?id=${id}`);
  };

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading blogs...</div>;

  return (
    <div className="flex flex-col gap-8 items-center px-2 py-6 bg-gray-50 min-h-screen">
      {blogs.length === 0 && (
        <p className="text-gray-500 text-center text-sm">No blogs available.</p>
      )}

      {blogs.map((data) => (
        <div
          key={data._id}
          className="w-full max-w-md p-0 sm:p-0 bg-white rounded-2xl shadow-lg flex flex-col sm:flex-row overflow-hidden border border-gray-200"
        >
          {/* Image */}
          <img
            src={data.blogImageUrl}
            alt={data.title}
            className="w-full sm:w-48 h-48 sm:h-auto object-cover"
          />
          {/* Text */}
          <div className="flex-1 flex flex-col justify-between p-5">
            <div>
              <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-2 capitalize">
                {data.category || 'General'}
              </span>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{data.title}</h2>
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {data.content}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <p className="text-gray-400 text-xs mb-2 sm:mb-0">
                ADTMarathi &middot; {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : ''} &middot; <span className="italic">Blog</span>
              </p>
              <button
                className="bg-[#74c69d] h-12 hover:bg-[#5cb984] text-white px-4 py-2 rounded-full text-sm font-medium transition w-full sm:w-auto"
                onClick={() => handleReadMore(data._id)}
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCards;
