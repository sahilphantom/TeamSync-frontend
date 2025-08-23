import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import ChatWindow from "../../components/chat/ChatWindow";

const ChatPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Chat Window */}
      <div className="flex flex-1 flex-col">
        <ChatWindow />
      </div>
    </div>
  );
};

export default ChatPage;
