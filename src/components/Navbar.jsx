import React, { useState } from 'react';
import { CgPlayButtonO, CgPlayPauseO } from "react-icons/cg";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [isPlaying, setIsPlaying] = useState(false); // State to track play/pause
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to track sidebar visibility

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying); // Toggle the play/pause state
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle the sidebar visibility
  };

  return (
    <div>
      <nav className="flex flex-wrap justify-between items-center p-4" style={{ backgroundColor: '#40916c', color: 'white' }}>
        <div className="text-xl font-bold">ADT मराठी</div>
        <div className="flex gap-x-4 mt-2 sm:mt-0">
          <button
            className="font-bold py-2 w-full sm:w-auto flex items-center space-x-1"
            onClick={handlePlayPause}
          >
            {isPlaying ? <CgPlayPauseO /> : <CgPlayButtonO />}
          </button>
          <button
            className="text-white font-bold py-2 px-4 rounded w-full sm:w-auto flex items-center space-x-2"
            onClick={toggleSidebar}
          >
            <RxHamburgerMenu />
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 w-64 h-full text-white shadow-lg" style={{ backgroundColor: '#95d5b2' }}>
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button
              className="text-white text-2xl"
              onClick={toggleSidebar}
            >
              <RxCross2 />
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

