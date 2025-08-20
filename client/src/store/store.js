import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import workspaceReducer from './slices/workspaceSlice';
import channelReducer from './slices/channelSlice';
import messageReducer from './slices/messageSlice';
import uiReducer from './slices/uiSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workspaces: workspaceReducer,
    channels: channelReducer,
    messages: messageReducer,
    ui: uiReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'persist/PERSIST',
          'socket/setSocket',
          'messages/addNewMessage',
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          'meta.arg',
          'payload.timestamp',
          'payload.socket',
        ],
        // Ignore these paths in the state
        ignoredPaths: [
          'socket.socket',
          'messages.messages',
          'ui.typingUsers',
        ],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;