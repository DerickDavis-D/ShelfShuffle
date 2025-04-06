import Chat from "../models/Chat.js";

// Send a message
export const sendMessage = async (req, res) => {
  const { sender, receiver, message } = req.body;

  try {
    const chat = await Chat.create({ sender, receiver, message });
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};