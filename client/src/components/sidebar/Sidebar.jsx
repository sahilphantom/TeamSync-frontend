import React from "react";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r flex flex-col">
      <div className="h-16 flex items-center justify-center font-bold text-lg border-b">
        Workspace
      </div>

      {/* Channels */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-gray-500 text-sm font-semibold mb-2">Channels</h3>
        <ul className="space-y-1">
          <li className="cursor-pointer p-2 rounded hover:bg-gray-100"># general</li>
          <li className="cursor-pointer p-2 rounded hover:bg-gray-100"># random</li>
        </ul>
      </div>

      {/* User Info */}
      <div className="h-16 border-t flex items-center px-4">
        <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
        <div>
          <p className="text-sm font-medium">You</p>
          <p className="text-xs text-gray-500">Online</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
