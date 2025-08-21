import api from './api';

export const getUserProfile = (userId) => {
  return api.get(`/users/${userId}`);
};

export const updateProfile = (userData) => {
  return api.put('/users/profile', userData);
};

export const updateNotificationPreferences = (preferences) => {
  return api.put('/users/notifications', { preferences });
};

export const searchUsers = (query) => {
  return api.get(`/users/search/users?query=${query}`);
};

export const getOnlineUsers = (workspaceId) => {
  return api.get(`/users/workspace/${workspaceId}/online`);
};