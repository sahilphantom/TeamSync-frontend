// API endpoints
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
export const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';

// App constants
export const APP_NAME = process.env.REACT_APP_APP_NAME || 'TeamSync';
export const APP_VERSION = process.env.REACT_APP_VERSION || '1.0.0';

// Local storage keys
export const LS_KEYS = {
  AUTH_TOKEN: 'token',
  THEME: 'theme',
  USER_PREFERENCES: 'user_preferences',
  RECENT_WORKSPACES: 'recent_workspaces'
};

// Socket events
export const SOCKET_EVENTS = {
  // Connection
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  AUTHENTICATE: 'authenticate',
  AUTHENTICATED: 'authenticated',
  AUTHENTICATION_ERROR: 'authentication_error',
  
  // Messages
  NEW_MESSAGE: 'new_message',
  MESSAGE_UPDATED: 'message_updated',
  MESSAGE_DELETED: 'message_deleted',
  
  // Reactions
  REACTION_ADDED: 'reaction_added',
  REACTION_REMOVED: 'reaction_removed',
  
  // Typing indicators
  TYPING_START: 'typing_start',
  TYPING_STOP: 'typing_stop',
  USER_TYPING: 'user_typing',
  
  // User status
  USER_ONLINE: 'user_online',
  USER_OFFLINE: 'user_offline',
  USER_STATUS_CHANGED: 'user_status_changed',
  STATUS_CHANGE: 'status_change',
  
  // Channel events
  JOIN_CHANNEL: 'join_channel',
  LEAVE_CHANNEL: 'leave_channel',
  CHANNEL_UPDATED: 'channel_updated',
  CHANNEL_DELETED: 'channel_deleted',
  
  // Workspace events
  WORKSPACE_UPDATED: 'workspace_updated',
  USER_ADDED_TO_WORKSPACE: 'user_added_to_workspace',
  USER_REMOVED_FROM_WORKSPACE: 'user_removed_from_workspace'
};

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MEMBER: 'member',
  GUEST: 'guest'
};

// Message types
export const MESSAGE_TYPES = {
  TEXT: 'text',
  FILE: 'file',
  SYSTEM: 'system'
};

// Channel types
export const CHANNEL_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  DIRECT: 'direct'
};

// Notification types
export const NOTIFICATION_TYPES = {
  MENTION: 'mention',
  DIRECT_MESSAGE: 'direct_message',
  CHANNEL_MESSAGE: 'channel_message',
  REACTION: 'reaction',
  INVITE: 'invite',
  SYSTEM: 'system'
};

// File upload constants
export const FILE_UPLOAD = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_FILE_TYPES: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'application/zip'
  ],
  MAX_FILES: 5
};

// Pagination constants
export const PAGINATION = {
  MESSAGES_PER_PAGE: 50,
  CHANNELS_PER_PAGE: 20,
  USERS_PER_PAGE: 50
};

// Time constants
export const TIME = {
  TYPING_INDICATOR_TIMEOUT: 3000, // 3 seconds
  MESSAGE_EDIT_TIMEOUT: 15 * 60 * 1000, // 15 minutes
  RECONNECTION_DELAY: 3000, // 3 seconds
  TYPING_DEBOUNCE: 500 // 500ms
};

// Route paths
export const ROUTES = {
  HOME: '/',
  AUTH: '/auth',
  WORKSPACE: '/workspace/:workspaceId',
  CHANNEL: '/channel/:channelId',
  DIRECT_MESSAGE: '/dm/:userId',
  SETTINGS: '/settings',
  NOT_FOUND: '*'
};

// UI constants
export const UI = {
  SIDEBAR_WIDTH: 260,
  HEADER_HEIGHT: 60,
  MESSAGE_INPUT_MIN_HEIGHT: 40,
  MESSAGE_INPUT_MAX_HEIGHT: 200
};

// Theme constants
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
};

// Generate route helpers
export const getWorkspaceRoute = (workspaceId) => `/workspace/${workspaceId}`;
export const getChannelRoute = (channelId) => `/channel/${channelId}`;
export const getDirectMessageRoute = (userId) => `/dm/${userId}`;
export const getSettingsRoute = () => '/settings';

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You need to be logged in to perform this action.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  FILE_TOO_LARGE: 'File is too large. Maximum size is 10MB.',
  UNSUPPORTED_FILE_TYPE: 'File type is not supported.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  MESSAGE_SENT: 'Message sent successfully.',
  MESSAGE_UPDATED: 'Message updated successfully.',
  MESSAGE_DELETED: 'Message deleted successfully.',
  CHANNEL_CREATED: 'Channel created successfully.',
  WORKSPACE_CREATED: 'Workspace created successfully.',
  USER_INVITED: 'User invited successfully.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  SETTINGS_SAVED: 'Settings saved successfully.'
};