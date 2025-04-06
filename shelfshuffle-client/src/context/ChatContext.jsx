import { createContext, useContext, useState, useEffect } from "react";
import { sendMessage, receiveMessages, disconnectSocket } from "../services/chatService";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    receiveMessages((message) => setMessages((prev) => [...prev, message]));
    return () => disconnectSocket();
  }, []);

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
