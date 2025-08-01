import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogOutBtn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/v1/users/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies for authentication
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Logout successful
        console.log('Logout successful');
        // You can add navigation logic here, e.g., redirect to login page
        // window.location.href = '/login';
        // or if using React Router: navigate('/login');
        navigate('/admin');
      } else {
        // Handle logout error
        const errorData = await response.json();
        console.error('Logout failed:', errorData.message);
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Network error during logout:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`
        inline-flex items-center justify-center
        px-4 py-2 text-sm font-medium
        text-white bg-red-600 
        border border-transparent rounded-md
        shadow-sm hover:bg-red-700 
        focus:outline-none focus:ring-2 
        focus:ring-offset-2 focus:ring-red-500
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200
        ${isLoading ? 'cursor-wait' : 'cursor-pointer'}
      `}
    >
      {isLoading ? (
        <>
          <svg
            className="w-4 h-4 mr-2 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Logging out...
        </>
      ) : (
        <>
          <svg
            className="w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Log Out
        </>
      )}
    </button>
  );
};

export default LogOutBtn;
