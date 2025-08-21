import React from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import './ReactionPicker.css';

const ReactionPicker = ({ onSelect, onClose }) => {
  const handleEmojiSelect = (emoji) => {
    onSelect(emoji.native);
  };

  return (
    <div className="reaction-picker">
      <div className="reaction-picker-overlay" onClick={onClose}></div>
      <div className="reaction-picker-content">
        <Picker
          data={data}
          onEmojiSelect={handleEmojiSelect}
          theme="light"
          previewPosition="none"
          skinTonePosition="none"
        />
      </div>
    </div>
  );
};

export default ReactionPicker;