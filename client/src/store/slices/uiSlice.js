import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: true,
    currentView: 'channel', // 'channel' or 'dm'
    modals: {
      createWorkspace: false,
      createChannel: false,
      inviteUser: false,
      userProfile: false,
      settings: false
    },
    theme: localStorage.getItem('theme') || 'light',
    typingUsers: {}
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setCurrentView: (state, action) => {
      state.currentView = action.payload;
    },
    openModal: (state, action) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action) => {
      state.modals[action.payload] = false;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    setTypingUser: (state, action) => {
      const { userId, isTyping, channelId, isDirect } = action.payload;
      const key = isDirect ? `dm_${userId}` : `channel_${channelId}`;
      
      if (isTyping) {
        state.typingUsers[key] = state.typingUsers[key] || new Set();
        state.typingUsers[key].add(userId);
      } else {
        if (state.typingUsers[key]) {
          state.typingUsers[key].delete(userId);
          if (state.typingUsers[key].size === 0) {
            delete state.typingUsers[key];
          }
        }
      }
    },
    clearTypingUsers: (state, action) => {
      const { channelId, isDirect, userId } = action.payload;
      const key = isDirect ? `dm_${userId}` : `channel_${channelId}`;
      delete state.typingUsers[key];
    }
  }
});

export const { 
  toggleSidebar, 
  setCurrentView, 
  openModal, 
  closeModal, 
  toggleTheme, 
  setTypingUser, 
  clearTypingUsers 
} = uiSlice.actions;
export default uiSlice.reducer;