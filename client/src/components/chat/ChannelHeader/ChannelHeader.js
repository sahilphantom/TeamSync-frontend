import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useChannels } from '../../../../hooks/useChannels';
import Button from '../../common/Button/Button';
import Dropdown from '../../common/Dropdown/Dropdown';
import Avatar from '../../common/Avatar/Avatar';
import ChannelInfoModal from '../../modals/ChannelInfoModal/ChannelInfoModal';
import InviteUserModal from '../../modals/InviteUserModal/InviteUserModal';
import './ChannelHeader.css';

const ChannelHeader = ({ channel, isDirect = false }) => {
  const [showChannelInfo, setShowChannelInfo] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const { user } = useSelector(state => state.auth);
  const { currentWorkspace } = useSelector(state => state.workspaces);

  const isAdmin = currentWorkspace?.members.find(
    m => m.user._id === user?._id
  )?.role === 'admin';

  const isChannelAdmin = channel.createdBy === user?._id || isAdmin;

  const channelDropdownMenu = (
    <div className="channel-dropdown-menu">
      <button onClick={() => setShowChannelInfo(true)}>Channel details</button>
      {!isDirect && isChannelAdmin && (
        <button onClick={() => setShowInviteModal(true)}>Invite people</button>
      )}
      {!isDirect && (
        <button className="danger">Leave channel</button>
      )}
    </div>
  );

  if (isDirect && channel) {
    return (
      <div className="channel-header direct">
        <div className="channel-info">
          <Avatar 
            src={channel.avatar} 
            username={channel.username} 
            size="medium" 
            status={channel.status}
          />
          <div className="channel-details">
            <h2 className="channel-name">{channel.username}</h2>
            <span className="channel-status">{channel.status}</span>
          </div>
        </div>
        
        <div className="channel-actions">
          <Button variant="secondary" size="small">Call</Button>
          <Button variant="secondary" size="small">Video</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="channel-header">
        <div className="channel-info">
          <span className="channel-hashtag">#</span>
          <h2 className="channel-name">{channel?.name}</h2>
          {channel?.topic && (
            <span className="channel-topic">{channel.topic}</span>
          )}
        </div>
        
        <div className="channel-actions">
          <Button variant="secondary" size="small">Threads</Button>
          <Button variant="secondary" size="small">Pinned</Button>
          <Dropdown trigger={<Button variant="secondary" size="small">Members</Button>}>
            <div className="members-dropdown">
              <h3>Channel Members</h3>
              {channel?.members.map(member => (
                <div key={member._id} className="member-item">
                  <Avatar 
                    src={member.avatar} 
                    username={member.username} 
                    size="small" 
                    status={member.status}
                  />
                  <span className="member-name">{member.username}</span>
                </div>
              ))}
            </div>
          </Dropdown>
          <Dropdown trigger={<Button variant="secondary" size="small">⋯</Button>}>
            {channelDropdownMenu}
          </Dropdown>
        </div>
      </div>

      {showChannelInfo && (
        <ChannelInfoModal 
          channel={channel}
          isOpen={showChannelInfo}
          onClose={() => setShowChannelInfo(false)}
        />
      )}

      {showInviteModal && (
        <InviteUserModal 
          channel={channel}
          isOpen={showInviteModal}
          onClose={() => setShowInviteModal(false)}
        />
      )}
    </>
  );
};

export default ChannelHeader;