import React from 'react'
import { IoBarChart, IoBarChartOutline, IoHome, IoHomeOutline } from "react-icons/io5";
import { MdEmail, MdOutlineMailOutline } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  const isMarketPage = location.pathname === '/market';
  const isContactPage = location.pathname === '/contact';

  return (
    <footer className="text-gray-600 py-4 fixed bottom-0 w-full bg-white border-t border-gray-200">
      <div className="container mx-auto flex justify-evenly items-center h-20">
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => navigate('/')}
        >
          {isHomePage ? <IoHome className="text-2xl mb-1" /> : <IoHomeOutline className="text-2xl mb-1" />}
          <span>Home</span>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => navigate('/market')}
        >
          {isMarketPage ? <IoBarChart className="text-2xl mb-1" /> : <IoBarChartOutline className="text-2xl mb-1" />}
          <span>Market</span>
        </div>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => navigate('/contact')}
        >
          {isContactPage ? <MdEmail className="text-2xl mb-1" /> : <MdOutlineMailOutline className="text-2xl mb-1" />}
          <span>Contact</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer