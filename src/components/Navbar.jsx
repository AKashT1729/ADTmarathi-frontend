import React, { useState } from 'react';
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to track sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar visibility
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
        <div className="fixed top-0 right-0 w-64 h-full text-white shadow-lg" style={{ backgroundColor: '#52b788' }}>
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              className="text-white"
              onClick={toggleSidebar}
            >
              <RxCross2 className="text-3xl" />
            </button>
          </div>

          {/* Sidebar Content */}
          <ul className="p-4">
            <li className="mb-2">
              <a href="#" className="hover:underline">Blog</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;

