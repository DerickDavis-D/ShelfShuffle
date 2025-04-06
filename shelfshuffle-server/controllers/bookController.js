import Book from "../models/Book.js";

// Add a new book
export const addBook = async (req, res) => {
  const { title, author, condition } = req.body;

  try {
    const book = await Book.create({
      title,
      author,
      condition,
      user: req.user._id,
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all books
export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};