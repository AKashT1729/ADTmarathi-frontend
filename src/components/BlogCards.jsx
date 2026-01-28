import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogCards = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = useCallback(async (page = 1, isLoadMore = false) => {
    try {
      if (!isLoadMore) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      const response = await axios.get(`/api/v1/blogs?page=${page}&limit=5`);
      const responseData = response.data?.data;
      
      if (responseData) {
        const newBlogs = responseData.blogs || [];
        const pagination = responseData.pagination || {};
        
        if (isLoadMore) {
          setBlogs(prevBlogs => [...prevBlogs, ...newBlogs]);
        } else {
          setBlogs(newBlogs);
        }
        
        setHasMore(pagination.hasMore || false);
        setCurrentPage(pagination.currentPage || page);
      }
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setError("Failed to load blogs. Please try again.");
      if (!isLoadMore) {
        setBlogs([]);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs(1, false);
  }, [fetchBlogs]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000 &&
        hasMore &&
        !loadingMore &&
        !loading
      ) {
        fetchBlogs(currentPage + 1, true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage, hasMore, loadingMore, loading, fetchBlogs]);

  const handleReadMore = (id) => {
    navigate(`/singleblog?id=${id}`);
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  if (loading && blogs.length === 0) {
    return <div className="text-center mt-10 text-gray-500">Loading blogs...</div>;
  }

  if (error && blogs.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => fetchBlogs(1, false)}
          className="bg-[#74c69d] hover:bg-[#5cb984] text-white px-4 py-2 rounded-full text-sm font-medium transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6 items-center px-3 md:px-4 lg:px-2 py-6 bg-gray-50 min-h-screen">
      {blogs.length === 0 && !loading && (
        <p className="text-gray-500 text-center text-sm">No blogs available.</p>
      )}

      {blogs.map((data, idx) => (
        <div
          key={data._id ? data._id + idx : idx}
          className="w-full max-w-xs md:max-w-md lg:max-w-2xl bg-white rounded-lg md:rounded-2xl shadow-md md:shadow-lg flex flex-col md:flex-row border border-gray-200 overflow-hidden"
        >
          {/* Image */}
          {data.blogImageUrl ? (
            <img
              src={data.blogImageUrl}
              alt={data.title}
              className="w-full md:w-56 h-48 md:h-52 object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-full md:w-56 h-48 md:h-52 bg-gray-200 flex items-center justify-center text-gray-400 text-2xl md:text-3xl flex-shrink-0">
              <span>No Image</span>
            </div>
          )}
          {/* Text */}
          <div className="flex-1 flex flex-col justify-between p-3 md:p-5 lg:p-6">
            <div>
              <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-2 capitalize">
                {data.category || 'General'}
              </span>
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2">{data.title}</h2>
              <p className="text-gray-700 text-xs md:text-sm mb-4 line-clamp-3 break-words">
                {data.content}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-gray-400 text-xs">
                ADTMarathi &middot; {data.createdAt ? new Date(data.createdAt).toLocaleDateString() : ''} &middot; <span className="italic">Blog</span>
              </p>
              <button
                className="bg-[#74c69d] hover:bg-[#5cb984] text-white px-4 py-2 md:py-2.5 rounded-full text-sm font-medium transition w-full"
                onClick={() => handleReadMore(data._id)}
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Loading more indicator */}
      {loadingMore && (
        <div className="text-center py-4">
          <div className="inline-flex items-center px-4 py-2 text-sm text-gray-600">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading more blogs...
          </div>
        </div>
      )}

      {/* End of content indicator */}
      {!hasMore && blogs.length > 0 && (
        <div className="text-center py-4 text-gray-500 text-sm">
          You've reached the end of all blogs!
        </div>
      )}
    </div>
  );
};

export default BlogCards;
