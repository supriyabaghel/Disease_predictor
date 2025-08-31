import React, { useRef, useEffect, useState } from "react";
import LoginBtn from "./Login-Button";
import LogoHorizontal from "../img/logo.svg";
import { useGlobalContext } from "./context";
import { NavLink } from "react-router-dom";
import cancelIcon from "../img/cross icon.svg";

const Header = () => {
  const { currentUser } = useGlobalContext();
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Debug: Log currentUser state
  console.log('Header - currentUser:', currentUser);

  const toggleDropdownMenu = () => {
    setDropdown(!dropdown);
  };

  const handleClickOutsideDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-40 border-b-2 border-gray-200" >
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        
        {/* Logo */}
<div className="flex items-center">
  <NavLink to="/" className="flex items-center">
    <img
      src={LogoHorizontal}
      alt="Medware Logo"
      className="h-40 w-auto object-contain max-w-[700px]" // 2x bigger height and max width
    />
  </NavLink>
</div>

        {/* Desktop Navbar - Centered */}
        <nav className="flex-1 flex justify-center items-center">
          <div className="flex gap-16 text-lg items-center">
            {currentUser ? (
              <>
                <NavLink to="/" className="hover:text-green-600 transition-colors font-bold py-2 px-4 text-black">Predictor</NavLink>
                <NavLink to="/dashboard" className="hover:text-green-600 transition-colors font-bold py-2 px-4 text-black">Dashboard</NavLink>
                <NavLink to="/contactdoctor" className="hover:text-green-600 transition-colors font-bold py-2 px-4 text-black">Consult</NavLink>
              </>
            ) : (
              <>
                <a href="#services" className="hover:text-green-600 transition-colors font-bold py-2 px-4 text-black">Services</a>
                <a href="#about" className="hover:text-green-600 transition-colors font-bold py-2 px-4 text-black">About Us</a>
              </>
            )}
          </div>
        </nav>

        {/* Login Button - Right aligned */}
        <div className="flex items-center">
          <LoginBtn />
        </div>

        {/* Mobile Menu Button */}
        <button className="hidden" onClick={toggleDropdownMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 hover:rotate-180 transition-all duration-200"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {dropdown && (
        <div
          ref={dropdownRef}
          className="lg:hidden absolute top-16 right-0 w-2/3 bg-white shadow-lg rounded-md p-4 z-50"
        >
          <nav className="flex flex-col gap-4 text-lg">
            {/* Close Button */}
            <button
              className="w-full flex justify-end mb-2"
              onClick={() => setDropdown(false)}
            >
              <img src={cancelIcon} alt="close-menu" className="w-6" />
            </button>

            {currentUser ? (
              <>
                <NavLink to="/" onClick={() => setDropdown(false)}>
                  Predictor
                </NavLink>
                <NavLink to="/dashboard" onClick={() => setDropdown(false)}>
                  Dashboard
                </NavLink>
                <NavLink to="/contactdoctor" onClick={() => setDropdown(false)}>
                  Consult
                </NavLink>
              </>
            ) : (
              <>
                <a
                  href="#services"
                  onClick={() => setDropdown(false)}
                  className="p-2"
                >
                  Services
                </a>
                <a
                  href="#about"
                  onClick={() => setDropdown(false)}
                  className="p-2"
                >
                  About Us
                </a>
              </>
            )}

            <LoginBtn />
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
