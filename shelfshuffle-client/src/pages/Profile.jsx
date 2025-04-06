import { useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { getProfile } from "../services/userService";
import BookCard from "../components/BookCard";

const Profile = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (user) {
      getProfile(user.id)
        .then((data) => {
          setProfile(data);
          setBooks(data.books || []);
        })
        .catch((err) => console.error("Error fetching profile:", err));
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {profile ? (
        <div className="bg-white p-6 shadow-md rounded-lg">
          <p className="text-lg font-semibold">{profile.username}</p>
          <p className="text-gray-600">{profile.email}</p>

          <h2 className="text-xl font-semibold mt-6">Your Listed Books</h2>
          {books.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-2">No books listed yet.</p>
          )}

          <button
            onClick={logout}
            className="mt-6 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
