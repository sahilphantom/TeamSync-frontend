import api from './api';

export const getWorkspaces = () => {
  return api.get('/workspaces');
};

export const createWorkspace = (workspaceData) => {
  return api.post('/workspaces', workspaceData);
};

export const getWorkspace = (workspaceId) => {
  return api.get(`/workspaces/${workspaceId}`);
};

export const updateWorkspace = (workspaceId, data) => {
  return api.put(`/workspaces/${workspaceId}`, data);
};

export const inviteToWorkspace = (workspaceId, email) => {
  return api.post(`/workspaces/${workspaceId}/invite`, { email });
};

export const joinWorkspace = (inviteCode) => {
  return api.post('/workspaces/join', { inviteCode });
};