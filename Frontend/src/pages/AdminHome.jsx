import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import image from "../assets/image.png"; // Adjust the import statement for the image

const AdminHome = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu visibility
  const [isImageOpen, setIsImageOpen] = useState(false); // State for fullscreen image

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle mobile menu visibility
  };

  const openImageModal = () => {
    setIsImageOpen(true); // Open the fullscreen image modal
  };

  const closeImageModal = () => {
    setIsImageOpen(false); // Close the fullscreen image modal
  };

  return (
    <div>
      <nav className="bg-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="text-white text-2xl font-bold">MyApp</div>
            <div className="hidden md:flex space-x-4">
              <Link
                to="/maintenance"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Maintenance
              </Link>
              <Link
                to="/reports"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Reports
              </Link>
              <Link
                to="/transactions"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Transactions
              </Link>
              <Link
                to="/logout"
                className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </Link>
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
              >
                {/* Hamburger menu icon */}
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-2">
              <Link
                to="/maintenance"
                className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                onClick={toggleMenu} // Close menu after clicking a link
              >
                Maintenance
              </Link>
              <Link
                to="/reports"
                className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                onClick={toggleMenu} // Close menu after clicking a link
              >
                Reports
              </Link>
              <Link
                to="/transactions"
                className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                onClick={toggleMenu} // Close menu after clicking a link
              >
                Transactions
              </Link>
              <Link
                to="/logout"
                className="block text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
                onClick={toggleMenu} // Close menu after clicking a link
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Image below the navbar, only for desktop */}
      <div className="hidden md:flex justify-center my-4">
        <img
          src={image}
          alt="A stack of books on a table at a library"
          className="max-w-full h-auto rounded-md shadow-lg cursor-pointer"
          onClick={openImageModal} // Open modal on image click
        />
      </div>

      {/* Fullscreen Image Modal */}
      {isImageOpen && (
        <div className="">
          <img
            src={image}
            alt="A stack of books on a table at a library"
            className=""
            onClick={closeImageModal} // Close modal on image click
          />
        </div>
      )}
    </div>
  );
};

export default AdminHome;
