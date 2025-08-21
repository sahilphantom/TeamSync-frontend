import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentChannel } from '../../../../store/slices/channelSlice';
import { setCurrentView } from '../../../../store/slices/uiSlice';
import Button from '../../common/Button/Button';
import CreateChannelModal from '../../modals/CreateChannelModal/CreateChannelModal';
import './ChannelList.css';

const ChannelList = ({ channels, workspace }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const dispatch = useDispatch();

  const handleChannelSelect = (channel) => {
    dispatch(setCurrentChannel(channel));
    dispatch(setCurrentView('channel'));
  };

  const isAdmin = workspace?.members.find(
    m => m.user._id === user?._id
  )?.role === 'admin';

  return (
    <div className="channel-list">
      <div className="channel-list-header">
        <h3>Channels</h3>
        <Button 
          variant="ghost" 
          size="small" 
          onClick={() => setShowCreateModal(true)}
          title="Create channel"
        >
          +
        </Button>
      </div>
      
      <div className="channel-items">
        {channels.map(channel => (
          <div
            key={channel._id}
            className="channel-item"
            onClick={() => handleChannelSelect(channel)}
          >
            <span className="channel-prefix">#</span>
            <span className="channel-name">{channel.name}</span>
            {channel.isPrivate && (
              <span className="channel-private" title="Private channel">🔒</span>
            )}
          </div>
        ))}
      </div>

      {showCreateModal && (
        <CreateChannelModal 
          workspace={workspace}
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  );
};

export default ChannelList;