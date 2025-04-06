import { useEffect, useState } from "react";
import { sendMessage, receiveMessages, disconnectSocket } from "../services/chatService";
import AuthContext from "../context/AuthContext";

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    receiveMessages((msg) => setMessages((prev) => [...prev, msg]));
    return () => disconnectSocket();
  }, []);

  const handleSendMessage = () => {
    if (input.trim()) {
      sendMessage(input, user.id);
      setInput("");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <div className="border p-4 h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <p key={index} className="p-1 bg-gray-200 rounded my-1">{msg.message}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 w-full mt-2"
      />
      <button onClick={handleSendMessage} className="bg-blue-500 text-white py-2 px-4 mt-2 rounded">Send</button>
    </div>
  );
};

export default Chat;