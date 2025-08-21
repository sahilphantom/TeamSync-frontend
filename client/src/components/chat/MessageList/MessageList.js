import React, { useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import MessageItem from '../MessageItem/MessageItem';
import Loader from '../../common/Loader/Loader';
import './MessageList.css';

const MessageList = ({ 
  messages, 
  onLoadMore, 
  hasMore, 
  isLoading, 
  channelId, 
  userId 
}) => {
  const messagesEndRef = useRef(null);
  const listRef = useRef(null);
  const { user } = useSelector(state => state.auth);
  const { typingUsers } = useSelector(state => state.ui);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleScroll = useCallback(() => {
    if (listRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      
      // Load more messages when scrolled to top
      if (scrollTop === 0 && hasMore && !isLoading) {
        onLoadMore();
      }
    }
  }, [hasMore, isLoading, onLoadMore]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const getTypingUsers = useCallback(() => {
    const key = channelId ? `channel_${channelId}` : `dm_${userId}`;
    return typingUsers[key] ? Array.from(typingUsers[key]) : [];
  }, [channelId, userId, typingUsers]);

  const typingUsersList = getTypingUsers();

  if (isLoading && messages.length === 0) {
    return (
      <div className="message-list loading">
        <Loader size="large" />
      </div>
    );
  }

  return (
    <div className="message-list" ref={listRef} onScroll={handleScroll}>
      {hasMore && (
        <div className="load-more-container">
          <Button 
            variant="secondary" 
            size="small" 
            onClick={onLoadMore}
            loading={isLoading}
          >
            Load more messages
          </Button>
        </div>
      )}
      
      <div className="messages-container">
        {messages.map((message, index) => {
          const showHeader = index === 0 || 
            messages[index - 1].sender._id !== message.sender._id ||
            new Date(message.createdAt) - new Date(messages[index - 1].createdAt) > 300000; // 5 minutes
          
          return (
            <MessageItem
              key={message._id}
              message={message}
              showHeader={showHeader}
              isOwn={message.sender._id === user?._id}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {typingUsersList.length > 0 && (
        <div className="typing-indicator">
          <Loader size="small" />
          <span>
            {typingUsersList.length === 1 
              ? `${typingUsersList[0]} is typing...`
              : `${typingUsersList.length} people are typing...`
            }
          </span>
        </div>
      )}
    </div>
  );
};

export default MessageList;