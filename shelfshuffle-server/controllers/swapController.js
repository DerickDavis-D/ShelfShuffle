import Swap from "../models/Swap.js";

// Send a swap request
export const sendSwapRequest = async (req, res) => {
  const { bookId } = req.body;

  try {
    const swap = await Swap.create({
      sender: req.user._id,
      receiver: req.params.userId,
      book: bookId,
    });
    res.status(201).json(swap);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};