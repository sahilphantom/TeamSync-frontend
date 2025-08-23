import React, { useState } from "react";
import MessageItem from "./MessageItem";
import MessageInput from "./MessageInput";

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Alice", text: "Hello!" },
    { id: 2, sender: "Bob", text: "Hi Alice, how are you?" },
  ]);

  const handleSendMessage = (newMessage) => {
    setMessages([...messages, { id: Date.now(), sender: "You", text: newMessage }]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="h-16 bg-white border-b flex items-center px-4 font-bold">
        # general
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg) => (
          <MessageItem key={msg.id} sender={msg.sender} text={msg.text} />
        ))}
      </div>

      {/* Message Input */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
