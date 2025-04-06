import { useEffect, useState } from "react";
import { fetchBooks } from "../services/bookService";

const useFetchBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      const data = await fetchBooks();
      setBooks(data);
      setLoading(false);
    };
    loadBooks();
  }, []);

  return { books, loading };
};

export default useFetchBooks;