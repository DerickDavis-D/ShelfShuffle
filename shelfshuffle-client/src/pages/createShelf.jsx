import { useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateShelf = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [book, setBook] = useState({
    title: "",
    author: "",
    condition: "New",
    status: "Available",
    image: null
  });

  // Handle input changes
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setBook({ ...book, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to add a book!");
      return;
    }

    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("condition", book.condition);
    formData.append("status", book.status);
    formData.append("image", book.image);

    try {
      await axios.post("http://localhost:5000/api/books", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("Book added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div>
      <h2>Create a Shelf - Add a Book</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Book Title" onChange={handleChange} required />
        <input type="text" name="author" placeholder="Author" onChange={handleChange} required />
        
        <label>Condition:</label>
        <select name="condition" onChange={handleChange}>
          <option value="New">New</option>
          <option value="Like New">Like New</option>
          <option value="Used">Used</option>
        </select>

        <label>Status:</label>
        <select name="status" onChange={handleChange}>
          <option value="Available">Available</option>
          <option value="In Talks">In Talks</option>
          <option value="Swapped">Swapped</option>
        </select>

        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default CreateShelf;
