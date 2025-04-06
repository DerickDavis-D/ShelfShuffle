const BookCard = ({ book }) => {
    const { user } = useAuth();
  
    return (
      <div className="border p-4 rounded-lg shadow-md">
        <img src={book.image} alt={book.title} className="w-full h-40 object-cover mb-2" />
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-sm text-gray-500">{book.author}</p>
        <p className="text-sm">Condition: {book.condition}</p>
        {user ? (
          <button className="mt-2 bg-blue-500 text-white py-1 px-4 rounded">Request Swap</button>
        ) : (
          <p className="text-sm text-gray-400">Login to request swap</p>
        )}
      </div>
    );
  };
  
  export default BookCard;