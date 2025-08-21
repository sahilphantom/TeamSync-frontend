import React, { useState, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useSocket } from '../../../../hooks/useSocket';
import Button from '../../common/Button/Button';
import FileUpload from '../FileUpload/FileUpload';
import EmojiPicker from '../EmojiPicker/EmojiPicker';
import './MessageInput.css';

const MessageInput = ({ 
  onSubmit, 
  channelId, 
  isDirect = false, 
  recipientId 
}) => {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef(null);
  const { startTyping, stopTyping } = useSocket();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (message.trim() || files.length > 0) {
      onSubmit({
        content: message.trim(),
        files,
        channel: isDirect ? null : channelId,
        recipient: isDirect ? recipientId : null,
        isDirect
      });
      
      setMessage('');
      setFiles([]);
      stopTyping(channelId, isDirect, recipientId);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    
    if (value.trim() && !isTyping) {
      setIsTyping(true);
      startTyping(channelId, isDirect, recipientId);
    } else if (!value.trim() && isTyping) {
      setIsTyping(false);
      stopTyping(channelId, isDirect, recipientId);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleBlur = () => {
    if (isTyping) {
      setIsTyping(false);
      stopTyping(channelId, isDirect, recipientId);
    }
  };

  const handleEmojiSelect = (emoji) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    setMessage(
      message.substring(0, start) +
      emoji.native +
      message.substring(end)
    );
    
    // Set cursor position after emoji
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + emoji.native.length;
      textarea.focus();
    }, 0);
  };

  const handleFileUpload = (uploadedFiles) => {
    setFiles([...files, ...uploadedFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="message-input-container">
      {files.length > 0 && (
        <div className="file-previews">
          {files.map((file, index) => (
            <div key={index} className="file-preview">
              <span className="file-name">{file.name}</span>
              <button 
                className="file-remove" 
                onClick={() => removeFile(index)}
                aria-label="Remove file"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="message-input-form">
        <div className="message-input-actions">
          <FileUpload onFileUpload={handleFileUpload} />
          <EmojiPicker onSelect={handleEmojiSelect} />
        </div>
        
        <TextareaAutosize
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onBlur={handleBlur}
          placeholder={isDirect ? `Message @user` : `Message #channel`}
          className="message-textarea"
          minRows={1}
          maxRows={10}
        />
        
        <Button 
          type="submit" 
          variant="primary" 
          disabled={!message.trim() && files.length === 0}
          className="send-button"
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;