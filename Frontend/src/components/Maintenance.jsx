import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Maintenance = () => {
  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12">Maintenance</h1>

      {/* Membership Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-8 w-full max-w-md">
        <Link
          to="/add-update-membership"
          className="block text-2xl font-semibold text-blue-600 hover:text-blue-800 transition duration-300 mb-4 text-center"
        >
          Add/Update Membership
        </Link>
        <hr className="mb-4" />
      </div>

      {/* Book Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-8 w-full max-w-md">
        <Link
          to="/add-update-book"
          className="block text-2xl font-semibold text-blue-600 hover:text-blue-800 transition duration-300 mb-4 text-center"
        >
          Add/Update Book
        </Link>
        <hr className="mb-4" />
      </div>

      {/* User Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg mb-8 w-full max-w-md">
        <Link
          to="/add-update-user"
          className="block text-2xl font-semibold text-blue-600 hover:text-blue-800 transition duration-300 mb-4 text-center"
        >
          Add/Update User
        </Link>
        <hr className="mb-4" />
      </div>
    </div>
  );
};

export default Maintenance;
