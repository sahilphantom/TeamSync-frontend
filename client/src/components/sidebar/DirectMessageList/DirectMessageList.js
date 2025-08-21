import React from 'react';
import { useSelector } from 'react-redux';
import Avatar from '../../common/Avatar/Avatar';
import './DirectMessageList.css';

const DirectMessageList = () => {
  const { user } = useSelector(state => state.auth);
  const { currentWorkspace } = useSelector(state => state.workspaces);
  
  // In a real app, you'd have a list of DM conversations
  // For now, we'll show workspace members you can message
  
  const dmUsers = currentWorkspace?.members
    .filter(member => member.user._id !== user?._id)
    .slice(0, 5) || [];

  return (
    <div className="dm-list">
      <div className="dm-list-header">
        <h3>Direct Messages</h3>
      </div>
      
      <div className="dm-items">
        {dmUsers.map(member => (
          <div key={member.user._id} className="dm-item">
            <Avatar 
              src={member.user.avatar} 
              username={member.user.username} 
              size="small" 
              status={member.user.status}
            />
            <span className="dm-name">{member.user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DirectMessageList;