import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AddUpdateBook = () => {
  const { bookId } = useParams(); // Get bookId from the URL parameters, if available
  const navigate = useNavigate();

  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [available, setAvailable] = useState("not issued");
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // If bookId exists, fetch book details for updating
    if (bookId) {
      const fetchBook = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/v1/book/${bookId}`
          );
          const { book } = response.data;
          setBookName(book.bookName);
          setAuthor(book.author);
          setAvailable(book.available);
          setIsUpdating(true);
        } catch (err) {
          setError(
            err.response ? err.response.data.message : "An error occurred"
          );
        }
      };

      fetchBook();
    }
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isUpdating) {
        // Update existing book
        await axios.put(`http://localhost:8000/api/v1/book/update/${bookId}`, {
          bookName,
          author,
          available,
        });
      } else {
        // Add new book
        await axios.post(`http://localhost:8000/api/v1/book/add`, {
          bookName,
          author,
          available,
        });
      }
      // Redirect or show success message
      navigate("/admin-home"); // Adjust this route as needed
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">
        {isUpdating ? "Update Book" : "Add New Book"}
      </h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        <input
          type="text"
          placeholder="Book Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <select
          value={available}
          onChange={(e) => setAvailable(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="not issued">Not Issued</option>
          <option value="issued">Issued</option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          {isUpdating ? "Update Book" : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddUpdateBook;
