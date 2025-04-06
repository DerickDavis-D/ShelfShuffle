import axios from "axios";

const API_URL = "http://localhost:5000/api/swaps";

export const sendSwapRequest = async (bookId, userId) => {
  const response = await axios.post(`${API_URL}/request`, { bookId, userId });
  return response.data;
};

export const checkSwapMatch = async (bookId, userId) => {
  const response = await axios.get(`${API_URL}/match?bookId=${bookId}&userId=${userId}`);
  return response.data;
};

export const fetchSwapRequests = async () => {
  const response = await axios.get(`${API_URL}/requests`);
  return response.data;
};