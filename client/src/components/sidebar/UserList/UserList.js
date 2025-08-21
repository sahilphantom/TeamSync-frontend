import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentView } from '../../../../store/slices/uiSlice';
import Avatar from '../../common/Avatar/Avatar';
import './UserList.css';

const UserList = ({ users, currentUser }) => {
  const dispatch = useDispatch();

  const handleUserSelect = (user) => {
    // For now, just set view to DM
    dispatch(setCurrentView('dm'));
    // In a real app, you'd also set the current DM conversation
  };

  const sortedUsers = users
    .filter(member => member.user._id !== currentUser?._id)
    .sort((a, b) => {
      // Sort by online status first, then alphabetically
      if (a.user.status === 'online' && b.user.status !== 'online') return -1;
      if (a.user.status !== 'online' && b.user.status === 'online') return 1;
      return a.user.username.localeCompare(b.user.username);
    });

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h3>Members ({users.length})</h3>
      </div>
      
      <div className="user-items">
        {sortedUsers.map(member => (
          <div
            key={member.user._id}
            className="user-item"
            onClick={() => handleUserSelect(member.user)}
          >
            <Avatar 
              src={member.user.avatar} 
              username={member.user.username} 
              size="small" 
              status={member.user.status}
            />
            <span className="user-name">{member.user.username}</span>
            {member.role === 'admin' && (
              <span className="user-role" title="Workspace admin">⭐</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;