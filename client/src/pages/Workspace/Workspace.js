import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWorkspaces } from '../../hooks/useWorkspaces';
import { useChannels } from '../../hooks/useChannels';
import { setCurrentWorkspace } from '../../store/slices/workspaceSlice';
import { setCurrentChannel } from '../../store/slices/channelSlice';
import WorkspaceSidebar from '../../components/sidebar/WorkspaceSidebar/WorkspaceSidebar';
import ChannelHeader from '../../components/chat/ChannelHeader/ChannelHeader';
import MessageList from '../../components/chat/MessageList/MessageList';
import MessageInput from '../../components/chat/MessageInput/MessageInput';
import CreateWorkspaceModal from '../../components/modals/CreateWorkspaceModal/CreateWorkspaceModal';
import Loader from '../../components/common/Loader/Loader';
import './Workspace.css';

const Workspace = () => {
  const dispatch = useDispatch();
  const { workspaces, currentWorkspace, isLoading } = useSelector(state => state.workspaces);
  const { currentChannel } = useSelector(state => state.channels);
  const { currentView } = useSelector(state => state.ui);
  const { fetchWorkspaces } = useWorkspaces();
  const { fetchChannels } = useChannels();

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  useEffect(() => {
    if (workspaces.length > 0 && !currentWorkspace) {
      dispatch(setCurrentWorkspace(workspaces[0]));
    }
  }, [workspaces, currentWorkspace, dispatch]);

  useEffect(() => {
    if (currentWorkspace) {
      fetchChannels(currentWorkspace._id);
    }
  }, [currentWorkspace, fetchChannels]);

  if (isLoading) {
    return (
      <div className="workspace-loading">
        <Loader size="large" />
      </div>
    );
  }

  if (workspaces.length === 0) {
    return <CreateWorkspaceModal isOpen={true} onClose={() => {}} />;
  }

  if (!currentWorkspace) {
    return null;
  }

  return (
    <div className="workspace-page">
      <WorkspaceSidebar />
      
      <div className="workspace-content">
        {currentChannel ? (
          <>
            <ChannelHeader channel={currentChannel} />
            <MessageList 
              channelId={currentChannel._id}
              onLoadMore={() => {}}
              hasMore={false}
            />
            <MessageInput channelId={currentChannel._id} />
          </>
        ) : (
          <div className="welcome-message">
            <h2>Welcome to {currentWorkspace.name}!</h2>
            <p>Select a channel or start a conversation to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workspace;