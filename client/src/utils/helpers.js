import { format, formatDistance, formatRelative, subDays } from 'date-fns';

// Format message content for mentions and markdown
export const formatMessageContent = (content, users = []) => {
  let formattedContent = content;
  
  // Replace @mentions with styled spans
  users.forEach(user => {
    const mentionRegex = new RegExp(`@${user.username}`, 'gi');
    formattedContent = formattedContent.replace(
      mentionRegex, 
      `<span class="mention" data-user-id="${user._id}">@${user.username}</span>`
    );
  });
  
  // Simple markdown parsing
  formattedContent = formattedContent
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
    .replace(/`(.*?)`/g, '<code>$1</code>') // Code
    .replace(/\n/g, '<br>'); // Line breaks
  
  return formattedContent;
};

// Generate a random color based on string input
export const generateColorFromString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 60%)`;
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Debounce function for search inputs
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return '?';
  
  return name
    .split(' ')
    .map(part => part.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
};

// Format timestamp for messages
export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  
  // If today, show time only
  if (date.toDateString() === now.toDateString()) {
    return format(date, 'h:mm a');
  }
  
  // If yesterday, show "Yesterday"
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  
  // If within last week, show day name
  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 7);
  if (date > weekAgo) {
    return format(date, 'EEE');
  }
  
  // Otherwise show date
  return format(date, 'MMM d');
};

// Format date for message headers
export const formatMessageDate = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  
  if (date.toDateString() === now.toDateString()) {
    return 'Today';
  }
  
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  }
  
  return format(date, 'MMMM d, yyyy');
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Generate random ID for temporary messages
export const generateTempId = () => {
  return 'temp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Check if message is editable (within 15 minutes)
export const isMessageEditable = (createdAt) => {
  const editTimeLimit = 15 * 60 * 1000; // 15 minutes
  return Date.now() - new Date(createdAt).getTime() < editTimeLimit;
};

// Extract mentions from message content
export const extractMentions = (content) => {
  const mentionRegex = /@(\w+)/g;
  const mentions = [];
  let match;
  
  while ((match = mentionRegex.exec(content)) !== null) {
    mentions.push(match[1]);
  }
  
  return mentions;
};

// Sort users by online status and name
export const sortUsers = (users) => {
  return users.sort((a, b) => {
    // Online users first
    if (a.status === 'online' && b.status !== 'online') return -1;
    if (a.status !== 'online' && b.status === 'online') return 1;
    
    // Then sort by username
    return a.username.localeCompare(b.username);
  });
};

// Capitalize first letter
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Get user status color
export const getStatusColor = (status) => {
  const statusColors = {
    online: '#48bb78', // green
    away: '#ed8936',   // orange
    busy: '#f56565',   // red
    offline: '#a0aec0' // gray
  };
  
  return statusColors[status] || statusColors.offline;
};