import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getChannelMessages, 
  getDirectMessages, 
  sendMessage, 
  updateMessage as updateMessageApi,
  deleteMessage as deleteMessageApi,
  addReaction as addReactionApi,
  removeReaction as removeReactionApi
} from '../../services/messages';

// Async thunks
export const fetchChannelMessages = createAsyncThunk(
  'messages/fetchChannelMessages',
  async ({ channelId, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await getChannelMessages(channelId, page);
      return { messages: response.data, channelId, page };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchDirectMessages = createAsyncThunk(
  'messages/fetchDirectMessages',
  async ({ userId, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await getDirectMessages(userId, page);
      return { messages: response.data, userId, page };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createMessage = createAsyncThunk(
  'messages/createMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await sendMessage(messageData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateMessage = createAsyncThunk(
  'messages/updateMessage',
  async ({ messageId, content }, { rejectWithValue }) => {
    try {
      const response = await updateMessageApi(messageId, content);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  'messages/deleteMessage',
  async (messageId, { rejectWithValue }) => {
    try {
      await deleteMessageApi(messageId);
      return messageId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addReaction = createAsyncThunk(
  'messages/addReaction',
  async ({ messageId, emoji }, { rejectWithValue }) => {
    try {
      const response = await addReactionApi(messageId, emoji);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeReaction = createAsyncThunk(
  'messages/removeReaction',
  async ({ messageId, emoji }, { rejectWithValue }) => {
    try {
      const response = await removeReactionApi(messageId, emoji);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: {},
    isLoading: false,
    error: null,
    hasMore: {},
    currentPage: {}
  },
  reducers: {
    addNewMessage: (state, action) => {
      const { message, channelId, userId } = action.payload;
      const key = channelId ? `channel_${channelId}` : `dm_${userId}`;
      
      if (!state.messages[key]) {
        state.messages[key] = [];
      }
      
      state.messages[key].unshift(message);
    },
    updateMessageReaction: (state, action) => {
      const { messageId, reaction, channelId, userId } = action.payload;
      const key = channelId ? `channel_${channelId}` : `dm_${userId}`;
      
      if (state.messages[key]) {
        const messageIndex = state.messages[key].findIndex(m => m._id === messageId);
        if (messageIndex !== -1) {
          const reactionIndex = state.messages[key][messageIndex].reactions.findIndex(
            r => r.emoji === reaction.emoji
          );
          
          if (reactionIndex === -1) {
            state.messages[key][messageIndex].reactions.push(reaction);
          } else {
            state.messages[key][messageIndex].reactions[reactionIndex] = reaction;
          }
        }
      }
    },
    clearMessages: (state) => {
      state.messages = {};
      state.hasMore = {};
      state.currentPage = {};
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch channel messages
      .addCase(fetchChannelMessages.fulfilled, (state, action) => {
        const { messages, channelId, page } = action.payload;
        const key = `channel_${channelId}`;
        
        if (page === 1) {
          state.messages[key] = messages.messages.reverse();
        } else {
          state.messages[key] = [...messages.messages.reverse(), ...state.messages[key]];
        }
        
        state.hasMore[key] = page < messages.totalPages;
        state.currentPage[key] = page;
      })
      // Fetch direct messages
      .addCase(fetchDirectMessages.fulfilled, (state, action) => {
        const { messages, userId, page } = action.payload;
        const key = `dm_${userId}`;
        
        if (page === 1) {
          state.messages[key] = messages.messages.reverse();
        } else {
          state.messages[key] = [...messages.messages.reverse(), ...state.messages[key]];
        }
        
        state.hasMore[key] = page < messages.totalPages;
        state.currentPage[key] = page;
      })
      // Create message
      .addCase(createMessage.fulfilled, (state, action) => {
        const message = action.payload.message;
        const key = message.channel ? `channel_${message.channel}` : `dm_${message.recipient}`;
        
        if (!state.messages[key]) {
          state.messages[key] = [];
        }
        
        state.messages[key].push(message);
      })
      // Update message
      .addCase(updateMessage.fulfilled, (state, action) => {
        const updatedMessage = action.payload.message;
        const channelId = updatedMessage.channel;
        const userId = updatedMessage.recipient;
        const key = channelId ? `channel_${channelId}` : `dm_${userId}`;
        
        if (state.messages[key]) {
          const index = state.messages[key].findIndex(m => m._id === updatedMessage._id);
          if (index !== -1) {
            state.messages[key][index] = updatedMessage;
          }
        }
      })
      // Delete message
      .addCase(deleteMessage.fulfilled, (state, action) => {
        const messageId = action.payload;
        
        // Find and remove the message from all message arrays
        Object.keys(state.messages).forEach(key => {
          state.messages[key] = state.messages[key].filter(m => m._id !== messageId);
        });
      })
      // Add reaction
      .addCase(addReaction.fulfilled, (state, action) => {
        const { message } = action.payload;
        const channelId = message.channel;
        const userId = message.recipient;
        const key = channelId ? `channel_${channelId}` : `dm_${userId}`;
        
        if (state.messages[key]) {
          const index = state.messages[key].findIndex(m => m._id === message._id);
          if (index !== -1) {
            state.messages[key][index] = message;
          }
        }
      })
      // Remove reaction
      .addCase(removeReaction.fulfilled, (state, action) => {
        const { message } = action.payload;
        const channelId = message.channel;
        const userId = message.recipient;
        const key = channelId ? `channel_${channelId}` : `dm_${userId}`;
        
        if (state.messages[key]) {
          const index = state.messages[key].findIndex(m => m._id === message._id);
          if (index !== -1) {
            state.messages[key][index] = message;
          }
        }
      });
  }
});

export const { addNewMessage, updateMessageReaction, clearMessages, clearError } = messageSlice.actions;
export default messageSlice.reducer;