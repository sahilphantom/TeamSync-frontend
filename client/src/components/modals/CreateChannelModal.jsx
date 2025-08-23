import { useState } from "react";
import axios from "axios";

export default function CreateChannelModal({ isOpen, onClose, workspaceId, onChannelCreated }) {
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `${API_URL}/channels`,
        { name, workspaceId, isPrivate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onChannelCreated(data.channel);
      onClose();
    } catch (error) {
      console.error("Failed to create channel", error);
      alert("Error creating channel");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Create Channel</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Channel name"
            className="border rounded w-full px-3 py-2 mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label className="flex items-center gap-2 mb-3">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
            Private channel
          </label>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 rounded bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-3 py-1 rounded bg-indigo-600 text-white">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
