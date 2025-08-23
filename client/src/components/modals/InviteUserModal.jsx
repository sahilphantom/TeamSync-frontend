import { useState } from "react";
import axios from "axios";

export default function InviteUserModal({ isOpen, onClose, channelId }) {
  const [email, setEmail] = useState("");
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

  if (!isOpen) return null;

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/channels/${channelId}/invite`,
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("User invited!");
      onClose();
    } catch (error) {
      console.error("Failed to invite user", error);
      alert("Error inviting user");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Invite User</h2>
        <form onSubmit={handleInvite}>
          <input
            type="email"
            placeholder="User email"
            className="border rounded w-full px-3 py-2 mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1 rounded bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-3 py-1 rounded bg-green-600 text-white">
              Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
