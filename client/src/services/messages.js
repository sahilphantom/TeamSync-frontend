import api from './api';

export const getChannelMessages = (channelId, page = 1, limit = 50) => {
  return api.get(`/messages/channel/${channelId}?page=${page}&limit=${limit}`);
};

export const getDirectMessages = (userId, page = 1, limit = 50) => {
  return api.get(`/messages/direct/${userId}?page=${page}&limit=${limit}`);
};

export const sendMessage = (messageData) => {
  return api.post('/messages', messageData);
};

export const updateMessage = (messageId, content) => {
  return api.put(`/messages/${messageId}`, { content });
};

export const deleteMessage = (messageId) => {
  return api.delete(`/messages/${messageId}`);
};

export const addReaction = (messageId, emoji) => {
  return api.post(`/messages/${messageId}/reactions`, { emoji });
};

export const removeReaction = (messageId, emoji) => {
  return api.delete(`/messages/${messageId}/reactions`, { data: { emoji } });
};