import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const UserHome = () => {
  return (
    <div>
      <nav className="bg-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="text-white text-2xl font-bold">MyApp</div>
            <div className="hidden md:flex space-x-4">
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
              <button className="text-white focus:outline-none">
                {/* Add a hamburger menu icon here if needed */}
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
        </div>
      </nav>
    </div>
  );
};

export default UserHome;
