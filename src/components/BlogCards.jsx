import React from 'react'
import { useNavigate } from 'react-router-dom'

const blogData = [
  {
    id: "1",
    title: "Organic Farming Practices",
    content: "Learn about sustainable and organic farming methods that protect the environment and yield healthy crops.",
    blogImageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    category: "Agriculture",
    date: "June 2, 2025"
  },
  {
    id: "2",
    title: "Water Conservation Tips",
    content: "Discover practical tips for conserving water on your farm and reducing your ecological footprint.",
    blogImageUrl: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    category: "Environment",
    date: "June 5, 2025"
  },
  {
    id: "3",
    title: "Modern Tools for Farmers",
    content: "Explore the latest technology and tools that are transforming agriculture for the better.",
    blogImageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    category: "Technology",
    date: "June 10, 2025"
  }
];

const BlogCards = () => {
  const navigate = useNavigate();

  const handleReadMore = (id) => {
    navigate(`/blogpost?id=${id}`);
  };

  return (
    <div className="flex flex-col gap-8 items-center px-2 py-6 bg-gray-50 min-h-screen">
      {blogData.map((data) => (
        <div
          key={data.id}
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
              <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                {data.category}
              </span>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{data.title}</h2>
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">{data.content}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <p className="text-gray-400 text-xs mb-2 sm:mb-0">
                ADTMarathi &middot; {data.date} &middot; <span className="italic">Blog</span>
              </p>
              <button
                className="bg-[#74c69d] h-12 hover:bg-[#5cb984] text-white px-4 py-2 rounded-full text-sm font-medium transition w-full sm:w-auto"
                onClick={() => handleReadMore(data.id)}
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BlogCards