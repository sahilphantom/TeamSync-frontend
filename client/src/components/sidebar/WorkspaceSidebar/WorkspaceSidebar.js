import React from 'react';
import { useSelector } from 'react-redux';
import { useWorkspaces } from '../../../../hooks/useWorkspaces';
import { useChannels } from '../../../../hooks/useChannels';
import WorkspaceHeader from '../WorkspaceHeader/WorkspaceHeader';
import ChannelList from '../ChannelList/ChannelList';
import UserList from '../UserList/UserList';
import DirectMessageList from '../DirectMessageList/DirectMessageList';
import './WorkspaceSidebar.css';

const WorkspaceSidebar = () => {
  const { currentWorkspace } = useSelector(state => state.workspaces);
  const { channels } = useSelector(state => state.channels);
  const { user } = useSelector(state => state.auth);
  const { sidebarOpen } = useSelector(state => state.ui);

  if (!sidebarOpen) {
    return null;
  }

  return (
    <div className="workspace-sidebar">
      <WorkspaceHeader workspace={currentWorkspace} />
      
      <div className="sidebar-content">
        <ChannelList 
          channels={channels} 
          workspace={currentWorkspace} 
        />
        
        <DirectMessageList />
        
        <UserList 
          users={currentWorkspace?.members || []} 
          currentUser={user}
        />
      </div>
    </div>
  );
};

export default WorkspaceSidebar;