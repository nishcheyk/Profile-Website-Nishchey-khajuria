import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <nav
      className="bg-[#17153B] bg-opacity-50 p-4 text-white fixed w-full z-10 top-0"
      style={{ cursor: "default" }}
    >
      <div className="mx-auto text-center flex w-5/6 justify-between items-center">
        <div className="hidden sm:flex space-x-4 items-center text-sm">
          <Link to="/" className="mx-4 ">
            Home
          </Link>
          <Link to="/about" className="mx-4 pl-5 pr-5">
            About
          </Link>
          <Link to="/projects" className="mx-4 pr-5">
            Projects
          </Link>
          <Link to="/experience" className="mx-4 pr-5">
          Career
          </Link>
          <Link to="/contact" className="mx-4 pr-5 first-letter:">
            Contact
          </Link>
        </div>

        <div className="text-3xl sm:text-2xl flex-grow text-center ">
          <a href="/">Nishchey Khajuria</a>
        </div>

        <div className="sm:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-xl focus:outline-none"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        <div
          className={`sm:hidden fixed top-0 left-0 w-full h-full bg-gray-800 text-center ${
            isMobileMenuOpen
              ? "flex flex-col items-center justify-center"
              : "hidden"
          }`}
        >
          <button
            onClick={closeMobileMenu}
            className="text-xl absolute top-4 right-4 focus:outline-none"
          >
            ✕
          </button>
          <ul className="font-medium text-2xl space-y-4">
            <li>
              <Link to="/" onClick={closeMobileMenu} className="mx-4">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={closeMobileMenu} className="mx-4">
                About
              </Link>
            </li>
            <li>
              <Link to="/projects" onClick={closeMobileMenu} className="mx-4">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/experience" onClick={closeMobileMenu} className="mx-4">
                Experience
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeMobileMenu} className="mx-4">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
