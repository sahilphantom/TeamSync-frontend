import React from "react";

const MessageItem = ({ sender, text }) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
        {sender.charAt(0)}
      </div>
      <div>
        <p className="font-semibold text-sm">{sender}</p>
        <p className="text-gray-700">{text}</p>
      </div>
    </div>
  );
};

export default MessageItem;
