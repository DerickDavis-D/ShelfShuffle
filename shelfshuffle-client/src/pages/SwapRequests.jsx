import { useEffect, useState } from "react";
import { fetchSwapRequests, checkSwapMatch } from "../services/swapService";
import BookCard from "../components/BookCard";
import AuthContext from "../context/AuthContext";

const SwapRequests = () => {
  const { user } = useAuth();
  const [swapRequests, setSwapRequests] = useState([]);
  const [matchedSwaps, setMatchedSwaps] = useState([]);

  useEffect(() => {
    fetchSwapRequests().then(setSwapRequests).catch(console.error);
  }, []);

  useEffect(() => {
    swapRequests.forEach(async (request) => {
      const match = await checkSwapMatch(request.bookId, user.id);
      if (match.isMatch) {
        setMatchedSwaps((prev) => [...prev, request]);
      }
    });
  }, [swapRequests]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Swap Requests</h1>
      <div className="grid grid-cols-3 gap-4">
        {matchedSwaps.length > 0 && <h2 className="text-xl font-bold">Matched Swaps</h2>}
        {matchedSwaps.map((request) => (
          <BookCard key={request.id} book={request.book} />
        ))}
      </div>
      <h2 className="text-xl font-bold mt-4">Pending Requests</h2>
      <div className="grid grid-cols-3 gap-4">
        {swapRequests.map((request) => (
          <BookCard key={request.id} book={request.book} />
        ))}
      </div>
    </div>
  );
};

export default SwapRequests;