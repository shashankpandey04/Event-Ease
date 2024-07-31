import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    // Close the menu after navigation on mobile
    if (window.innerWidth < 768) {
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-[#312d39] fixed z-50 w-full h-20 flex justify-between items-center px-4">
        <div className="flex-shrink-0 flex items-center">
          <a
            className="text-white pl-5 text-3xl md:text-3xl font-bold sm:text-lg cursor-pointer hover:cursor-pointer"
            onClick={() => handleNavigate("/dashboard")}
          >
            EventEase
          </a>
        </div>

        {/* Hamburger menu icon */}
        <div className="block sm:hidden">
          <button
            className="text-[#6a50a7] focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5H20C20.5523 5 21 5.44772 21 6V8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8V6C3 5.44772 3.44772 5 4 5ZM4 13H20C20.5523 13 21 13.4477 21 14V16C21 16.5523 20.5523 17 20 17H4C3.44772 17 3 16.5523 3 16V14C3 13.4477 3.44772 13 4 13ZM20 21H4C3.44772 21 3 20.5523 3 20V18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18V20C21 20.5523 20.5523 21 20 21Z"
              />
            </svg>
          </button>
        </div>

        {/* Menu items */}
        <div
          className={`sm:flex pr-5 flex-col sm:flex-row items-center sm:space-x-4 ${
            isMenuOpen ? "block" : "hidden"
          }`}
          style={{
            transition: "max-height 0.5s ease-in-out",
            maxHeight: isMenuOpen ? "1000px" : "0",
          }}
        >
          <ul className="flex flex-col sm:flex-row sm:space-x-4">
            <li>
              <a
                className={`text-[white] hover:bg-[#6a50a7] ${
                  !isMenuOpen ? "" : ""
                } px-3 py-2 rounded-md font-medium cursor-pointer hover:cursor-pointer block sm:inline`}
                onClick={() => handleNavigate("/scanner")}
              >
                Scanner
              </a>
            </li>
            <li>
              <a
                className="text-white hover:bg-[#6a50a7] px-3 py-2 rounded-md font-medium cursor-pointer hover:cursor-pointer block sm:inline"
                onClick={() => handleNavigate("/mailer")}
              >
                Mailer
              </a>
            </li>
            <li>
              <a
                className="text-white hover:bg-[#6a50a7] px-3 py-2 rounded-md font-medium cursor-pointer hover:cursor-pointer block sm:inline"
                onClick={() => handleNavigate("/login")}
              >
                Login
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
