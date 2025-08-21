import { useContext, createContext, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socketService from '../utils/socket';
import { addNewMessage, updateMessageReaction } from '../store/slices/messageSlice';
import { setTypingUser, clearTypingUsers } from '../store/slices/uiSlice';
import { addOnlineUser, removeOnlineUser, updateUserStatus } from '../store/slices/userSlice';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { token, user } = useSelector(state => state.auth);

  useEffect(() => {
    if (token) {
      // Connect to socket server
      socketService.connect(token);

      // Set up event listeners
      socketService.on('new_message', (message) => {
        dispatch(addNewMessage({
          message,
          channelId: message.channel,
          userId: message.recipient
        }));
      });

      socketService.on('message_updated', (message) => {
        // Handle message updates
        console.log('Message updated:', message);
      });

      socketService.on('message_deleted', (data) => {
        // Handle message deletion
        console.log('Message deleted:', data);
      });

      socketService.on('reaction_added', (data) => {
        dispatch(updateMessageReaction({
          messageId: data.messageId,
          reaction: data.reaction,
          channelId: data.channelId,
          userId: data.userId
        }));
      });

      socketService.on('reaction_removed', (data) => {
        // Handle reaction removal
        console.log('Reaction removed:', data);
      });

      socketService.on('user_typing', (data) => {
        dispatch(setTypingUser({
          userId: data.userId,
          isTyping: data.isTyping,
          channelId: data.channelId,
          isDirect: data.isDirect
        }));
      });

      socketService.on('user_online', (data) => {
        dispatch(addOnlineUser(data.user));
        dispatch(updateUserStatus({ userId: data.userId, status: 'online' }));
      });

      socketService.on('user_offline', (data) => {
        dispatch(removeOnlineUser(data.userId));
        dispatch(updateUserStatus({ userId: data.userId, status: 'offline' }));
      });

      socketService.on('user_status_changed', (data) => {
        dispatch(updateUserStatus(data));
      });

      // Cleanup on unmount
      return () => {
        socketService.disconnect();
      };
    }
  }, [token, dispatch]);

  const sendMessage = useCallback((messageData) => {
    socketService.sendMessage(messageData);
  }, []);

  const startTyping = useCallback((channelId = null, isDirect = false, recipientId = null) => {
    socketService.startTyping(channelId, isDirect, recipientId);
  }, []);

  const stopTyping = useCallback((channelId = null, isDirect = false, recipientId = null) => {
    socketService.stopTyping(channelId, isDirect, recipientId);
  }, []);

  const addReaction = useCallback((messageId, emoji, channelId = null, isDirect = false, recipientId = null) => {
    socketService.addReaction(messageId, emoji, channelId, isDirect, recipientId);
  }, []);

  const removeReaction = useCallback((messageId, emoji, channelId = null, isDirect = false, recipientId = null) => {
    socketService.removeReaction(messageId, emoji, channelId, isDirect, recipientId);
  }, []);

  const updateStatus = useCallback((status) => {
    socketService.updateStatus(status);
  }, []);

  const value = {
    isConnected: socketService.getConnectionStatus(),
    socketId: socketService.getSocketId(),
    sendMessage,
    startTyping,
    stopTyping,
    addReaction,
    removeReaction,
    updateStatus,
    joinChannel: socketService.joinChannel,
    leaveChannel: socketService.leaveChannel
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};