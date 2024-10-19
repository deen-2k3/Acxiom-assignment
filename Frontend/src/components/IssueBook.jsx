import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const IssueBook = () => {
  const [bookId, setBookId] = useState("");
  const [author, setAuthor] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/book/getbooks"
        );
        const availableBooks = response.data.books.filter(
          (book) => book.available !== "issued"
        );
        setBooks(availableBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/issue/issue",
        {
          bookId,
          remarks,
          issueDate,
          returnDate,
        }
      );
      if (response.data.success) {
        setMessage(response.data.message);
        navigate("/admin-home");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error issuing book:", error);
      setMessage("Error issuing book.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Issue Book</h2>

      {message && <p className="text-red-500 text-center">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Select Book</label>
          <select
            value={bookId}
            onChange={(e) => {
              const selectedBook = books.find(
                (book) => book._id === e.target.value
              );
              setBookId(e.target.value);
              setAuthor(selectedBook ? selectedBook.author : ""); // Set author based on selected book
            }}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">--Select a Book--</option>
            {books.map((book) => (
              <option key={book._id} value={book._id}>
                {book.bookName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Author</label>
          <input
            type="text"
            value={author}
            readOnly // Set as read-only
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Issue Date</label>
          <input
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Return Date</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Remarks (optional)
          </label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            rows="3"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 transition duration-200 w-full"
        >
          Issue Book
        </button>
      </form>
    </div>
  );
};

export default IssueBook;
