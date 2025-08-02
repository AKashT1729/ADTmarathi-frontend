import React, { useState } from 'react';
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { FiPlus, FiLogOut, FiUser } from "react-icons/fi";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isAdmin, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNewPost = () => {
    navigate('/admin/new-post');
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsSidebarOpen(false);
    navigate('/');
  };


  return (
    <div>
      <nav className="flex flex-wrap justify-between items-center p-4 h-14" style={{ backgroundColor: '#95d5b2', color: 'white' }}>
        <div className="text-2xl font-bold ">ADT मराठी</div>
        <div className="flex gap-x-6 mt-2 sm:mt-0">
          <button
            className="text-white font-bold py-2 px-4 rounded w-full sm:w-auto flex items-center space-x-2 cursor-pointer"
            onClick={toggleSidebar}
          >
            <RxHamburgerMenu className="text-3xl" />
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 w-64 h-full text-white shadow-lg z-50" style={{ backgroundColor: '#52b788' }}>
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              className="text-white hover:text-gray-200"
              onClick={toggleSidebar}
            >
              <RxCross2 className="text-3xl" />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="p-4">
            {/* User Info */}
            {isAuthenticated() && (
              <div className="mb-6 pb-4 border-b border-green-400">
                <div className="flex items-center space-x-2 mb-2">
                  <FiUser className="text-lg" />
                  <span className="font-medium">{user?.fullName}</span>
                </div>
                {isAdmin() && (
                  <span className="text-xs bg-green-600 px-2 py-1 rounded">Admin</span>
                )}
              </div>
            )}

            {/* Navigation Links */}
            <ul className="space-y-3">
              <li>
                <a href="/" className="block hover:underline py-2">Home</a>
              </li>
              <li>
                <a href="/blog" className="block hover:underline py-2">Blog</a>
              </li>
              <li>
                <a href="/contact" className="block hover:underline py-2">Contact</a>
              </li>
              
              {/* Admin-only buttons */}
              {isAdmin() && (
                <>
                  <li className="pt-4 border-t border-green-400">
                    <button
                      onClick={handleNewPost}
                      className="flex items-center space-x-2 w-full text-left hover:bg-green-600 p-2 rounded transition-colors"
                    >
                      <FiPlus className="text-lg" />
                      <span>New Post</span>
                    </button>
                  </li>
                </>
              )}

              {/* Authentication buttons */}
              {isAuthenticated() && (
                <li className="pt-4">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full text-left hover:bg-red-600 p-2 rounded transition-colors"
                  >
                    <FiLogOut className="text-lg" />
                    <span>Logout</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Navbar;

