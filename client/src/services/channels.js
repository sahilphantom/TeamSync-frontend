import api from './api';

export const getChannels = (workspaceId) => {
  return api.get(`/channels/${workspaceId}`);
};

export const createChannel = (workspaceId, channelData) => {
  return api.post(`/channels/${workspaceId}`, channelData);
};

export const getChannel = (channelId) => {
  return api.get(`/channels/${channelId}`);
};

export const updateChannel = (channelId, data) => {
  return api.put(`/channels/${channelId}`, data);
};

export const addChannelMember = (channelId, userId) => {
  return api.post(`/channels/${channelId}/members`, { userId });
};