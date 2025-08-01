import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MdKeyboardBackspace,
  MdBookmark,
  MdBookmarkBorder,
} from "react-icons/md";
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegCommentDots,
  FaShareAlt,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { BiCopy } from "react-icons/bi";
import axios from "axios";
import BlogCards from "../components/BlogCards";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SingleBlog = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const blogId = query.get("id");
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showShareMenu && !event.target.closest(".share-menu-container")) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showShareMenu]);

  useEffect(() => {
    if (!blogId) {
      navigate("/"); // redirect if no id
      return;
    }

    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`/api/v1/blogs/blogs/${blogId}`);
        // The blog is inside data.data
        setBlog(data.data);
        // Initialize like count (you can get this from API)
        setLikeCount(Math.floor(Math.random() * 100) + 1); // Mock data
      } catch (error) {
        console.error("Error fetching blog:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId, navigate]);

  if (loading)
    return (
      <div className="text-center mt-20 text-lg text-gray-500">
        Loading blog post...
      </div>
    );
  if (!blog)
    return (
      <div className="text-center mt-20 text-lg text-gray-500">
        No blog data found.
      </div>
    );

  const paragraphs = blog.content ? blog.content.split(/\n{2,}|\r\n\r\n/) : [];

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blog.title;
    const text = `Check out this blog: ${title}`;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            text
          )}&url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url).then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        });
        break;
      default:
        break;
    }
    setShowShareMenu(false);
  };

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
          <h1 className="flex-1 text-center font-bold text-xl text-gray-900 truncate">
            {blog.title}
          </h1>
          <div className="w-8" />
        </div>

        {/* Category Tag */}
        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-2 capitalize">
          {blog.category || "General"}
        </span>

        {/* Blog Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{blog.title}</h1>

        {/* Date Info */}
        <p className="text-gray-400 text-xs mb-4">
          ADTMarathi &middot;{" "}
          {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}{" "}
          &middot; <span className="italic">Blog</span>
        </p>

        {/* Blog Image */}
        <img
          src={blog.blogImageUrl}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        {/* Content */}
        <div className="text-gray-700 text-base mb-6 leading-7">
          {paragraphs.length > 0 ? (
            paragraphs.map((para, idx) => (
              <p
                key={idx}
                className={idx !== paragraphs.length - 1 ? "mb-4" : ""}
              >
                {para}
              </p>
            ))
          ) : (
            <p>No content available.</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-200 pt-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                liked
                  ? "bg-red-50 text-red-600 shadow-md"
                  : "bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              <div
                className={`text-xl transition-transform duration-300 ${
                  liked ? "animate-pulse" : "group-hover:scale-110"
                }`}
              >
                {liked ? <FaThumbsUp /> : <FaRegThumbsUp />}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">Like</span>
                <span className="text-xs opacity-75">{likeCount}</span>
              </div>
            </button>

            {/* Comment Button */}
            <button className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
              <div className="text-xl transition-transform duration-300 group-hover:scale-110">
                <FaRegCommentDots />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">Comment</span>
                <span className="text-xs opacity-75">0</span>
              </div>
            </button>

            {/* Bookmark Button */}
            <button
              onClick={handleBookmark}
              className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                bookmarked
                  ? "bg-yellow-50 text-yellow-600 shadow-md"
                  : "bg-gray-50 text-gray-600 hover:bg-yellow-50 hover:text-yellow-600"
              }`}
            >
              <div
                className={`text-xl transition-transform duration-300 ${
                  bookmarked ? "animate-bounce" : "group-hover:scale-110"
                }`}
              >
                {bookmarked ? <MdBookmark /> : <MdBookmarkBorder />}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">Save</span>
                <span className="text-xs opacity-75">
                  {bookmarked ? "Saved" : "Save"}
                </span>
              </div>
            </button>

            {/* Share Button */}
            <div className="relative share-menu-container">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  showShareMenu
                    ? "bg-green-50 text-green-600 shadow-md"
                    : "bg-gray-50 text-gray-600 hover:bg-green-50 hover:text-green-600"
                }`}
              >
                <div
                  className={`text-xl transition-transform duration-300 ${
                    showShareMenu ? "rotate-12" : "group-hover:scale-110"
                  }`}
                >
                  <FaShareAlt />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">Share</span>
                  <span className="text-xs opacity-75">Share</span>
                </div>
              </button>

              {/* Share Menu */}
              {showShareMenu && (
                <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-20 min-w-[220px] animate-in slide-in-from-top-2 duration-200">
                  <div className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">
                    Share this post
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleShare("twitter")}
                      className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 text-blue-500 transition-all duration-200 hover:scale-105"
                    >
                      <FaTwitter className="text-lg" />
                      <span className="text-sm font-medium">Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare("facebook")}
                      className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 text-blue-600 transition-all duration-200 hover:scale-105"
                    >
                      <FaFacebook className="text-lg" />
                      <span className="text-sm font-medium">Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare("linkedin")}
                      className="flex items-center gap-2 p-3 rounded-lg hover:bg-blue-50 text-blue-700 transition-all duration-200 hover:scale-105"
                    >
                      <FaLinkedin className="text-lg" />
                      <span className="text-sm font-medium">LinkedIn</span>
                    </button>
                    <button
                      onClick={() => handleShare("whatsapp")}
                      className="flex items-center gap-2 p-3 rounded-lg hover:bg-green-50 text-green-600 transition-all duration-200 hover:scale-105"
                    >
                      <FaWhatsapp className="text-lg" />
                      <span className="text-sm font-medium">WhatsApp</span>
                    </button>
                  </div>
                  <div className="border-t border-gray-200 mt-3 pt-3">
                    <button
                      onClick={() => handleShare("copy")}
                      className={`flex items-center gap-2 p-3 rounded-lg w-full transition-all duration-200 hover:scale-105 ${
                        copySuccess
                          ? "bg-green-50 text-green-600 shadow-sm"
                          : "hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      <BiCopy className="text-lg" />
                      <span className="text-sm font-medium">
                        {copySuccess ? "Link Copied!" : "Copy Link"}
                      </span>
                      {copySuccess && (
                        <div className="ml-auto">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="w-full max-w-2xl">
        <h2 className="text-lg font-semibold mb-4 text-green-700">
          Recent Posts
        </h2>
        <BlogCards />
      </div>

      <div className="h-10" />
    </div>
  );
};

export default SingleBlog;
