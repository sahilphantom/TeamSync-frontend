import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchChannels as fetchChannelsAction, 
  addChannel as addChannelAction,
  fetchChannel as fetchChannelAction,
  updateChannelDetails as updateChannelAction,
  addMemberToChannel as addMemberAction
} from '../store/slices/channelSlice';

export const useChannels = () => {
  const dispatch = useDispatch();
  const { channels, currentChannel, isLoading, error } = useSelector(state => state.channels);

  const fetchChannels = useCallback((workspaceId) => {
    return dispatch(fetchChannelsAction(workspaceId)).unwrap();
  }, [dispatch]);

  const addChannel = useCallback((workspaceId, channelData) => {
    return dispatch(addChannelAction({ workspaceId, channelData })).unwrap();
  }, [dispatch]);

  const fetchChannel = useCallback((channelId) => {
    return dispatch(fetchChannelAction(channelId)).unwrap();
  }, [dispatch]);

  const updateChannel = useCallback((channelId, data) => {
    return dispatch(updateChannelAction({ channelId, data })).unwrap();
  }, [dispatch]);

  const addMember = useCallback((channelId, userId) => {
    return dispatch(addMemberAction({ channelId, userId })).unwrap();
  }, [dispatch]);

  return {
    channels,
    currentChannel,
    isLoading,
    error,
    fetchChannels,
    addChannel,
    fetchChannel,
    updateChannel,
    addMember
  };
};