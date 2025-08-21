import { useContext, createContext, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { addNewMessage, updateMessageReaction } from '../store/slices/messageSlice';
import { setTypingUser, clearTypingUsers } from '../store/slices/uiSlice';

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
  const { currentWorkspace, currentChannel } = useSelector(state => state.workspaces);
  const socket = useSelector(state => state.socket);

  useEffect(() => {
    if (token && !socket) {
      const newSocket = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000', {
        auth: {
          token
        }
      });

      newSocket.on('connect', () => {
        console.log('Connected to server');
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      newSocket.on('new_message', (message) => {
        dispatch(addNewMessage({
          message,
          channelId: message.channel,
          userId: message.recipient
        }));
      });

      newSocket.on('message_updated', (message) => {
        // Handle message updates
      });

      newSocket.on('message_deleted', (data) => {
        // Handle message deletion
      });

      newSocket.on('reaction_added', (data) => {
        dispatch(updateMessageReaction({
          messageId: data.messageId,
          reaction: data.reaction,
          channelId: currentChannel?._id,
          userId: user?._id
        }));
      });

      newSocket.on('reaction_removed', (data) => {
        // Handle reaction removal
      });

      newSocket.on('user_typing', (data) => {
        dispatch(setTypingUser({
          userId: data.userId,
          isTyping: data.isTyping,
          channelId: currentChannel?._id,
          isDirect: false
        }));
      });

      newSocket.on('user_online', (data) => {
        // Handle user online status
      });

      newSocket.on('user_offline', (data) => {
        // Handle user offline status
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [token, dispatch, currentChannel, user]);

  const sendMessage = useCallback((messageData) => {
    if (socket) {
      socket.emit('new_message', messageData);
    }
  }, [socket]);

  const startTyping = useCallback((channelId = null, isDirect = false, recipientId = null) => {
    if (socket) {
      socket.emit('typing_start', { channelId, isDirect, recipientId });
    }
  }, [socket]);

  const stopTyping = useCallback((channelId = null, isDirect = false, recipientId = null) => {
    if (socket) {
      socket.emit('typing_stop', { channelId, isDirect, recipientId });
    }
  }, [socket]);

  const addReaction = useCallback((messageId, emoji, channelId = null, isDirect = false, recipientId = null) => {
    if (socket) {
      socket.emit('reaction_added', { messageId, emoji, channelId, isDirect, recipientId });
    }
  }, [socket]);

  const removeReaction = useCallback((messageId, emoji, channelId = null, isDirect = false, recipientId = null) => {
    if (socket) {
      socket.emit('reaction_removed', { messageId, emoji, channelId, isDirect, recipientId });
    }
  }, [socket]);

  const value = {
    socket,
    sendMessage,
    startTyping,
    stopTyping,
    addReaction,
    removeReaction
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};