import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AvailableBook = () => {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch all books from the backend
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/books'); // Full API URL
        // Filter books that are not issued
        const availableBooks = response.data.books.filter(book => book.available !== "issued");
        setBooks(availableBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
        setMessage('Error fetching books.');
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Available Books</h2>
      
      {message && <p className="text-red-500 text-center">{message}</p>}

      {books.length === 0 ? (
        <p className="text-center">No available books found.</p>
      ) : (
        <ul className="space-y-4">
          {books.map((book) => (
            <li key={book._id} className="p-4 border border-gray-300 rounded-md">
              <h3 className="text-lg font-semibold">{book.bookName}</h3>
              <p>Author: {book.author}</p>
              <p>Status: {book.available}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AvailableBook;
