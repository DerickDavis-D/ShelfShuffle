import { useState, useEffect } from "react";
import { searchBooks } from "../services/bookService";
import Spinner from "../components/Spinner";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      const delayDebounce = setTimeout(async () => {
        const data = await searchBooks(query);
        setResults(data);
        setLoading(false);
      }, 500); // Debounce for 500ms

      return () => clearTimeout(delayDebounce);
    }
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Search Books</h1>
      <form className="mb-4">
        <input
          type="text"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </form>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {results.map((book) => (
            <div key={book.id} className="mb-2">
              <h3 className="text-xl font-semibold">{book.title}</h3>
              <p className="text-gray-600">{book.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;