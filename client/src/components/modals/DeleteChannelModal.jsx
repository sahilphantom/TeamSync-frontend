import axios from "axios";

export default function DeleteChannelModal({ isOpen, onClose, channelId, onChannelDeleted }) {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

  if (!isOpen || !channelId) return null;

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/channels/${channelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onChannelDeleted(channelId);
      onClose();
    } catch (error) {
      console.error("Failed to delete channel", error);
      alert("Error deleting channel");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-red-600">Delete Channel</h2>
        <p className="mb-4">Are you sure you want to delete this channel? This action cannot be undone.</p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 rounded bg-gray-300">
            Cancel
          </button>
          <button onClick={handleDelete} className="px-3 py-1 rounded bg-red-600 text-white">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
