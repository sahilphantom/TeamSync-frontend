import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMessages } from '../../hooks/useMessages';
import Avatar from '../../components/common/Avatar/Avatar';
import MessageList from '../../components/chat/MessageList/MessageList';
import MessageInput from '../../components/chat/MessageInput/MessageInput';
import Loader from '../../components/common/Loader/Loader';
import './DirectMessage.css';

const DirectMessage = () => {
  const { userId } = useParams();
  const [recipient, setRecipient] = useState(null);
  const { user } = useSelector(state => state.auth);
  const { currentWorkspace } = useSelector(state => state.workspaces);
  const { getMessages, getHasMore, getCurrentPage, fetchDirectMessages, createMessage } = useMessages();

  useEffect(() => {
    if (userId && currentWorkspace) {
      const foundUser = currentWorkspace.members.find(member => member.user._id === userId);
      if (foundUser) {
        setRecipient(foundUser.user);
        fetchDirectMessages(userId, 1);
      }
    }
  }, [userId, currentWorkspace, fetchDirectMessages]);

  const handleLoadMore = () => {
    const nextPage = getCurrentPage(null, userId) + 1;
    fetchDirectMessages(userId, nextPage);
  };

  const handleSendMessage = async (messageData) => {
    await createMessage(messageData);
  };

  if (!recipient) {
    return (
      <div className="dm-loading">
        <Loader size="large" />
      </div>
    );
  }

  const messages = getMessages(null, userId);
  const hasMore = getHasMore(null, userId);

  return (
    <div className="direct-message-page">
      <div className="dm-header">
        <Avatar 
          src={recipient.avatar} 
          username={recipient.username} 
          size="medium" 
          status={recipient.status}
        />
        <div className="dm-info">
          <h2>{recipient.username}</h2>
          <span className="dm-status">{recipient.status}</span>
        </div>
      </div>
      
      <MessageList 
        messages={messages}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
        userId={userId}
      />
      
      <MessageInput 
        onSubmit={handleSendMessage}
        isDirect={true}
        recipientId={userId}
      />
    </div>
  );
};

export default DirectMessage;