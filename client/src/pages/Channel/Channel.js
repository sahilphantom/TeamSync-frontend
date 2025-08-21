import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useChannels } from '../../hooks/useChannels';
import { useMessages } from '../../hooks/useMessages';
import { setCurrentChannel } from '../../store/slices/channelSlice';
import ChannelHeader from '../../components/chat/ChannelHeader/ChannelHeader';
import MessageList from '../../components/chat/MessageList/MessageList';
import MessageInput from '../../components/chat/MessageInput/MessageInput';
import Loader from '../../components/common/Loader/Loader';
import './Channel.css';

const Channel = () => {
  const { channelId } = useParams();
  const dispatch = useDispatch();
  const { currentChannel } = useSelector(state => state.channels);
  const { getMessages, getHasMore, getCurrentPage, fetchChannelMessages, createMessage } = useMessages();
  const { fetchChannel } = useChannels();

  useEffect(() => {
    if (channelId) {
      fetchChannel(channelId).then(channel => {
        dispatch(setCurrentChannel(channel));
      });
      fetchChannelMessages(channelId, 1);
    }
  }, [channelId, fetchChannel, fetchChannelMessages, dispatch]);

  const handleLoadMore = () => {
    const nextPage = getCurrentPage(channelId) + 1;
    fetchChannelMessages(channelId, nextPage);
  };

  const handleSendMessage = async (messageData) => {
    await createMessage(messageData);
  };

  if (!currentChannel || currentChannel._id !== channelId) {
    return (
      <div className="channel-loading">
        <Loader size="large" />
      </div>
    );
  }

  const messages = getMessages(channelId);
  const hasMore = getHasMore(channelId);

  return (
    <div className="channel-page">
      <ChannelHeader channel={currentChannel} />
      <MessageList 
        messages={messages}
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
        channelId={channelId}
      />
      <MessageInput 
        onSubmit={handleSendMessage}
        channelId={channelId}
      />
    </div>
  );
};

export default Channel;