import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookDetails } from "../services/bookService";
import Spinner from "../components/Spinner";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const data = await getBookDetails(id);
        setBook(data);
      } catch (error) {
        console.error("Failed to fetch book details:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBook();
  }, [id]);

  if (loading) return <Spinner />;

  if (!book) return <p className="text-center text-gray-600">Book not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{book.title}</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <img src={book.image} alt={book.title} className="w-full h-64 object-cover rounded" />
        <p className="text-gray-600 mt-4">{book.author}</p>
        <p className="text-sm text-gray-500">{book.condition}</p>
      </div>
    </div>
  );
};

export default BookDetails;