const ChatBox = ({ messages }) => {
    return (
      <div className="bg-gray-100 p-4 rounded-lg h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <p className="text-sm text-gray-700">{msg.text}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default ChatBox;