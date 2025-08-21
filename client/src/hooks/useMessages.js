import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchChannelMessages as fetchChannelMessagesAction, 
  fetchDirectMessages as fetchDirectMessagesAction,
  createMessage as createMessageAction,
  updateMessage as updateMessageAction,
  deleteMessage as deleteMessageAction,
  addReaction as addReactionAction,
  removeReaction as removeReactionAction
} from '../store/slices/messageSlice';

export const useMessages = () => {
  const dispatch = useDispatch();
  const { messages, isLoading, error, hasMore, currentPage } = useSelector(state => state.messages);

  const fetchChannelMessages = useCallback((channelId, page = 1) => {
    return dispatch(fetchChannelMessagesAction({ channelId, page })).unwrap();
  }, [dispatch]);

  const fetchDirectMessages = useCallback((userId, page = 1) => {
    return dispatch(fetchDirectMessagesAction({ userId, page })).unwrap();
  }, [dispatch]);

  const createMessage = useCallback((messageData) => {
    return dispatch(createMessageAction(messageData)).unwrap();
  }, [dispatch]);

  const updateMessage = useCallback((messageId, content) => {
    return dispatch(updateMessageAction({ messageId, content })).unwrap();
  }, [dispatch]);

  const deleteMessage = useCallback((messageId) => {
    return dispatch(deleteMessageAction(messageId)).unwrap();
  }, [dispatch]);

  const addReaction = useCallback((messageId, emoji) => {
    return dispatch(addReactionAction({ messageId, emoji })).unwrap();
  }, [dispatch]);

  const removeReaction = useCallback((messageId, emoji) => {
    return dispatch(removeReactionAction({ messageId, emoji })).unwrap();
  }, [dispatch]);

  const getMessages = useCallback((channelId = null, userId = null) => {
    const key = channelId ? `channel_${channelId}` : `dm_${userId}`;
    return messages[key] || [];
  }, [messages]);

  const getHasMore = useCallback((channelId = null, userId = null) => {
    const key = channelId ? `channel_${channelId}` : `dm_${userId}`;
    return hasMore[key] || false;
  }, [hasMore]);

  const getCurrentPage = useCallback((channelId = null, userId = null) => {
    const key = channelId ? `channel_${channelId}` : `dm_${userId}`;
    return currentPage[key] || 1;
  }, [currentPage]);

  return {
    messages,
    isLoading,
    error,
    fetchChannelMessages,
    fetchDirectMessages,
    createMessage,
    updateMessage,
    deleteMessage,
    addReaction,
    removeReaction,
    getMessages,
    getHasMore,
    getCurrentPage
  };
};