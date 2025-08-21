import React, { useState } from 'react';
import { format } from 'date-fns';
import { useAuth } from '../../../../hooks/useAuth';
import Avatar from '../../common/Avatar/Avatar';
import Dropdown from '../../common/Dropdown/Dropdown';
import ReactionPicker from '../ReactionPicker/ReactionPicker';
import MessageReactions from '../MessageReactions/MessageReactions';
import './MessageItem.css';

const MessageItem = ({ message, showHeader, isOwn }) => {
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const { user } = useAuth();

  const handleReactionSelect = (emoji) => {
    // Handle reaction selection
    setShowReactionPicker(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    // Save edited message
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(message.content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Delete message
  };

  const formatMessageContent = (content) => {
    // Simple formatting for mentions and markdown
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/@(\w+)/g, '<span class="mention">@$1</span>');
  };

  const dropdownMenu = (
    <div className="message-dropdown-menu">
      <button onClick={() => setShowReactionPicker(true)}>Add Reaction</button>
      {isOwn && (
        <>
          <button onClick={handleEdit}>Edit Message</button>
          <button onClick={handleDelete} className="danger">Delete Message</button>
        </>
      )}
      <button>Copy Link</button>
    </div>
  );

  return (
    <div className={`message-item ${isOwn ? 'own-message' : ''}`}>
      {showHeader && (
        <div className="message-header">
          <Avatar 
            src={message.sender.avatar} 
            username={message.sender.username} 
            size="small" 
          />
          <span className="message-sender">{message.sender.username}</span>
          <span className="message-time">
            {format(new Date(message.createdAt), 'h:mm a')}
          </span>
        </div>
      )}
      
      <div className="message-content-container">
        {!showHeader && <div className="message-avatar-spacer"></div>}
        
        <div className="message-content-wrapper">
          <Dropdown trigger={<div className="message-content">{message.content}</div>} position="right">
            {dropdownMenu}
          </Dropdown>
          
          {message.reactions && message.reactions.length > 0 && (
            <MessageReactions 
              reactions={message.reactions} 
              onReactionSelect={handleReactionSelect}
            />
          )}
          
          {message.edited?.isEdited && (
            <span className="message-edited">(edited)</span>
          )}
        </div>
      </div>

      {showReactionPicker && (
        <ReactionPicker 
          onSelect={handleReactionSelect}
          onClose={() => setShowReactionPicker(false)}
        />
      )}
    </div>
  );
};

export default MessageItem;