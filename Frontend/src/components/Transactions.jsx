import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Transactions = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Transactions</h2>
      
      <div className="flex flex-col space-y-4">
        <Link to="/available" className="bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition duration-200 text-center">
          Check Book Availability
        </Link>
        <Link to="/issue-book" className="bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition duration-200 text-center">
          Issue Book
        </Link>
        <Link to="/return-book" className="bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition duration-200 text-center">
          Return Book
        </Link>
      </div>
    </div>
  );
};

export default Transactions;
