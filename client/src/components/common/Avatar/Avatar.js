import React from 'react';
import './Avatar.css';

const Avatar = ({ 
  src, 
  alt, 
  size = 'medium', 
  username, 
  status, 
  className = '' 
}) => {
  const sizeClasses = {
    small: 'avatar-small',
    medium: 'avatar-medium',
    large: 'avatar-large',
    xlarge: 'avatar-xlarge'
  };

  const statusClasses = {
    online: 'status-online',
    offline: 'status-offline',
    away: 'status-away',
    busy: 'status-busy'
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2);
  };

  const classes = `avatar ${sizeClasses[size]} ${className}`.trim();

  return (
    <div className={classes}>
      {src ? (
        <img src={src} alt={alt || username} className="avatar-image" />
      ) : (
        <div className="avatar-initials">
          {username ? getInitials(username) : '?'}
        </div>
      )}
      {status && (
        <span className={`avatar-status ${statusClasses[status]}`}></span>
      )}
    </div>
  );
};

export default Avatar;