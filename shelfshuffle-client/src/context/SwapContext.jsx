import { createContext, useContext, useState, useEffect } from "react";
import { sendSwapRequest, fetchSwapRequests } from "../services/swapService";

const SwapContext = createContext();

export const SwapProvider = ({ children }) => {
  const [swapRequests, setSwapRequests] = useState([]);

  useEffect(() => {
    fetchSwapRequests()
      .then(setSwapRequests)
      .catch(console.error);
  }, []);

  const requestSwap = async (bookId) => {
    try {
      const newRequest = await sendSwapRequest(bookId);
      setSwapRequests((prev) => [...prev, newRequest]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SwapContext.Provider value={{ swapRequests, requestSwap }}>
      {children}
    </SwapContext.Provider>
  );
};

export const useSwap = () => useContext(SwapContext);
